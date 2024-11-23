from settings import settings # Import settings
from llama_index.llms.azure_openai import AzureOpenAI
from llama_index.core.llms import ChatMessage, MessageRole, ChatResponse
from llama_index.core.llms.structured_llm import StructuredLLM
from pydantic import BaseModel
from typing import List
import json


class GenArticle(BaseModel):
    title: str
    paragraphs: List[str]
    headers: List[str]

class NewsData(BaseModel):
    summary: str
    keywords: List[str]
    facts: List[str]
    important_dates: List[str]

class News(BaseModel):
    title: str
    content: str
    authors: List[str]
    content: str
    published: str
    extracted_data: NewsData

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
        important_dates: List[str] = ext_data['important_dates']

        news_data = NewsData(summary=summary, keywords=keywords, facts=facts, important_dates=important_dates)

        news_item = News(title=title, content=content, authors=authors, published=published, extracted_data=news_data)
        news_list.append(news_item)

    return news_list

def prepare_input(news_list: List[News]) -> str:
    """
    prepare newline separated input to the model
    """
    input = [ news.title + '\n' + news.content for news in news_list ]
    return "\n\n".join(input)



class promptbuilde(): pass


def generate_article(llm: AzureOpenAI) -> GenArticle:
    news_list: List[News] = read_news_json_file("./rss_feed_entries_1.json")
    model_input: str = prepare_input(news_list)

    # universal prompt
    system_prompt = "You are a professional article author. You generate articles based on the given recent news."
    # TODO build the prompt based on user prefs


    # maybe build this prompt?
    user_prompt = f"Write an article based on the following news:\n{model_input}"

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

