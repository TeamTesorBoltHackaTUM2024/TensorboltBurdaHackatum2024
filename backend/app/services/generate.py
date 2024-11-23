from typing import List, Optional, Dict
from pydantic import BaseModel
from llama_index.core import (
    VectorStoreIndex,
    SimpleDirectoryReader,
    ServiceContext,
    StorageContext,
    load_index_from_storage,
    Settings,
)
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.embeddings.ollama import OllamaEmbedding
from llama_index.llms.openai import OpenAI
from llama_index.core.agent import ReActAgent
from llama_index.core.tools import FunctionTool
from llama_index.embeddings.azure_openai import AzureOpenAIEmbedding
from llama_index.llms.azure_openai import AzureOpenAI


import json
from llama_index.core.llms import ChatMessage, MessageRole, ChatResponse
from llama_index.core.llms.structured_llm import StructuredLLM
from app.models.generate import News, NewsData, UserPreferences, GenArticle, Tone, Style, TargetAudience, ArticleLength


# Import settings
from app.settings import settings

# Configure LLM settings based on the environment
if settings.USE_OLLAMA:
    Settings.llm = Ollama(
        base_url=settings.OLLAMA_ENDPOINT,
        model=settings.OLLAMA_MODEL
    )
    Settings.embed_model = OllamaEmbedding(
        base_url=settings.OLLAMA_ENDPOINT,
        model_name=settings.OLLAMA_MODEL
    )
else:
    Settings.llm = AzureOpenAI(
        model=settings.AZURE_OPENAI_MODEL,
        engine=settings.AZURE_OPENAI_ENGINE,
        azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
        api_version=settings.AZURE_OPENAI_API_VERSION,
        api_key=settings.AZURE_OPENAI_API_KEY
    )
    Settings.embed_model = AzureOpenAIEmbedding(
        model=settings.AZURE_OPENAI_EMBEDDING_MODEL,
        azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
        api_version=settings.AZURE_OPENAI_API_VERSION,
        api_key=settings.AZURE_OPENAI_API_KEY
    )

class SystemPromptBuilder:
    tone: Optional[Tone] = None
    style: Optional[Style] = None
    target_audiance: Optional[TargetAudience] = None
    article_length: Optional[ArticleLength] = None
    keywords: List[str] = []
    facts: List[str] = []

    _system_prompt = (
        "You are an expert writer specializing in creating engaging and informative articles. "
        "Your task is to generate a well-structured and high-quality article. "
        "Keep the content accurate, creative, and concise. "
        "If specific preferences such as tone, style, target audience, or length are provided, tailor the article accordingly. "
        "If no preferences are given, use a neutral tone, a balanced style, and write for a general audience with a moderate length."
    )

    def with_tone(self, tone: Tone | None):
        self.tone = tone
        return self

    def with_style(self, style: Style | None):
        self.style = style
        return self

    def with_target_audiance(self, target_audiance: TargetAudience | None):
        self.target_audiance = target_audiance
        return self

    def with_article_length(self, article_length: ArticleLength | None):
        self.article_length = article_length
        return self

    def with_keywords(self, keywords: List[str]):
        self.keywords = keywords
        return self

    def with_facts(self, facts: List[str]):
        self.facts = facts
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
            case TargetAudience.beginners:
                prompt += " Write for readers who are new to the topic, explaining concepts in simple terms and avoiding jargon."
            case TargetAudience.experts:
                prompt += " Write for readers with expertise in the topic, using technical language and in-depth analysis."
            case TargetAudience.hobbyist:
                prompt += " Write for hobbyist who enjoy reading electrical cars."

        match self.article_length:
            case ArticleLength.short:
                prompt += " Keep the article concise, aiming for approximately 500 words."
            case ArticleLength.medium:
                prompt += " Aim for a balanced length, approximately 1000 words, providing enough detail without overwhelming the reader."
            case ArticleLength.long:
                prompt += " Write a comprehensive article with approximately 2000 words, covering the topic in-depth with detailed explanations."

        if len(self.keywords) > 0:
            prompt += f" Keywords for the article: {self.keywords}."

        if len(self.facts) > 0:
            prompt += f" The article should focus on the following: {self.facts}."

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


def generate_article(llm: AzureOpenAI, prefs: UserPreferences, news_list: List[News]) -> GenArticle:
    system_prompt = SystemPromptBuilder() \
        .with_tone(prefs.tone) \
        .with_style(prefs.style) \
        .with_target_audiance(prefs.target_audiance) \
        .with_article_length(prefs.article_length) \
        .with_keywords(prefs.keywords) \
        .with_facts(prefs.facts) \
        .build()

    model_input = prepare_input(news_list)
    user_prompt = f"Write an article based on the following news:\n\n{model_input}"

    sllm: StructuredLLM = llm.as_structured_llm(output_cls=GenArticle)
    response: ChatResponse = sllm.chat(
        [
            ChatMessage(role=MessageRole.SYSTEM, content=system_prompt),
            ChatMessage(role=MessageRole.USER, content=user_prompt)
        ]
    )

    content = response.message.content
    if content is None:
        raise ValueError('Model output is invalid: does not contain content')

    return GenArticle.model_validate_json(content)

