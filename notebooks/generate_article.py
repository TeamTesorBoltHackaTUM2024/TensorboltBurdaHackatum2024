from settings import settings # Import settings
from llama_index.llms.azure_openai import AzureOpenAI
from llama_index.core.llms import ChatMessage, MessageRole, ChatResponse
from llama_index.core.llms.structured_llm import StructuredLLM
from pydantic import BaseModel
from typing import List, Optional, Dict
import json
from enum import Enum


################# ARTICLE RELATED MODELS

class GenArticle(BaseModel):
    title: str
    paragraphs: List[str]
    headers: List[str]

class NewsData(BaseModel):
    summary: str
    keywords: List[str]
    facts: List[str]
    important_dates: Dict[str,str] # date,event

class News(BaseModel):
    title: str
    content: str
    authors: List[str]
    published: str
    extracted_data: NewsData

#################### PROMPT RELATED MODELS


class Tone(Enum):
    opinionated = 'opinionated'
    neutral = 'neural'

class Style(Enum):
    casual = 'casual'
    formal = 'formal'

class TargetAudiance(Enum):
    beginners = 'beginners'
    experts = 'experts'
    hobbyist = 'hobbyist'

class ArticleLength(Enum):
    # number of words in the article
    short = 500
    medium = 1000
    long = 2000

class UserPreferences(BaseModel):
    tone: Optional[Tone]
    style: Optional[Style]
    target_audiance: Optional[TargetAudiance]
    article_length: Optional[ArticleLength]

class SystemPromptBuilder():
    tone: Optional[Tone] = None
    style: Optional[Style] = None
    target_audiance: Optional[TargetAudiance] = None
    article_length: Optional[ArticleLength] = None

    # should be built using .build
    _system_prompt = (
        "You are an expert writer specializing in creating engaging and informative articles. "
        "Your task is to generate a well-structured and high-quality article. "
        "Keep the content accurate, creative, and concise. "
        "If specific preferences such as tone, style, target audience, or length are provided, tailor the article accordingly. "
        "If no preferences are given, use a neutral tone, a balanced style, and write for a general audience with a moderate length."
    )

    def __init__(self):
        pass

    def with_tone(self, tone: Tone | None):
        self.tone = tone
        return self

    def with_style(self, style: Style | None):
        self.style = style
        return self

    def with_target_audiance(self, target_audiance: TargetAudiance | None):
        self.target_audiance = target_audiance
        return self

    def with_article_length(self, article_length: ArticleLength | None):
        self.article_length = article_length
        return self

    def build(self) -> str:
        prompt = self._system_prompt

        match self.tone:
            case Tone.opinionated:
                prompt += " Provide a strong perspective on the topic, including your opinions and supporting arguments."
            case Tone.neutral:
                prompt += " Maintain an objective and balanced tone, presenting facts without personal bias."

        match self.style:
            case Style.casual:
                prompt += " Use a friendly and conversational style, making the content approachable and easy to read."
            case Style.formal:
                prompt += " Use a professional and formal style, maintaining a polished and sophisticated tone."

        match self.target_audiance:
            case TargetAudiance.beginners:
                prompt += " Write for readers who are new to the topic, explaining concepts in simple terms and avoiding jargon."
            case TargetAudiance.experts:
                prompt += " Write for readers with expertise in the topic, using technical language and in-depth analysis."
            case TargetAudiance.hobbyist:
                prompt += " Write for hobbyist who enjoy reading electrical cars."

        match self.article_length:
            case ArticleLength.short:
                prompt += " Keep the article concise, aiming for approximately 500 words."
            case ArticleLength.medium:
                prompt += " Aim for a balanced length, approximately 1000 words, providing enough detail without overwhelming the reader."
            case ArticleLength.long:
                prompt += " Write a comprehensive article with approximately 2000 words, covering the topic in-depth with detailed explanations."

        return prompt

def read_news_json_file(file_path: str) -> List[News]:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    news_list: List[News] = []
    for item in data:
        title = item['title']
        content = item['title']
        authors = [ author['name'] for author in item['authors']]
        published = item['published']

        ext_data = item['extracted_data']
        summary: str = ext_data['summary']
        keywords: List[str] = ext_data['keywords']
        facts: List[str] = ext_data['facts']
        important_dates: Dict[str,str] = ext_data['important_dates']

        news_data = NewsData(summary=summary, keywords=keywords, facts=facts, important_dates=important_dates)

        news_item = News(title=title, content=content, authors=authors, published=published, extracted_data=news_data)
        news_list.append(news_item)

    return news_list

def prepare_input(news_list: List[News]) -> str:
    """
    prepare newline separated input to the model
    """
    # this is too bulk, we use the extracted data instead
    # input = [ news.title + '\n' + news.content for news in news_list ]

    input = [ "\n".join([news.title, news.extracted_data.summary, str(news.extracted_data.keywords), str(news.extracted_data.facts), "\n".join([ date + ': ' + event for date, event in news.extracted_data.important_dates.items() ]) ]) for news in news_list ]
    return "\n\n".join(input)

def generate_article(llm: AzureOpenAI, prefs: UserPreferences) -> GenArticle:
    news_list: List[News] = read_news_json_file("./rss_feed_entries_2.json")

    # build the system prompt with user preferences
    system_prompt = SystemPromptBuilder().with_tone(prefs.tone).with_style(prefs.style).with_target_audiance(prefs.target_audiance).with_article_length(prefs.article_length).build()

    # TODO: this prompt might be improved. Currently we concat. header and content
    model_input: str = prepare_input(news_list)
    user_prompt = f"Write an article based on the following news:\n\n{model_input}"

    sllm: StructuredLLM = llm.as_structured_llm(output_cls=GenArticle)

    response: ChatResponse = sllm.chat(
        [
            ChatMessage(role=MessageRole.SYSTEM, content=system_prompt),
            ChatMessage(role=MessageRole.USER, content=user_prompt)
        ],
    )

    content = response.message.content
    if content is None:
        raise ValueError('Model output is invalid: does not contain content')

    return GenArticle.model_validate_json(content)

def organize_model_output(output: GenArticle) -> str:
    assert len(output.headers) == len(output.paragraphs)

    article = output.title + '\n\n'
    for idx in range(len(output.headers)):
        article += output.headers[idx] + '\n' + output.paragraphs[idx] + '\n\n'

    return article

