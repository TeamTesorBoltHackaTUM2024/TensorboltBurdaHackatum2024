from llama_index.core.llms import ChatMessage, MessageRole, ChatResponse
from llama_index.core.llms.structured_llm import StructuredLLM
from pydantic import BaseModel
from data_processor import llm

class TextGenerator:
    class InputModel(BaseModel):
        system_prompt: str
        user_prompt: str

    class OutputModel(BaseModel):
        content: str

    def __init__(self, llm):
        self.sllm = llm.as_structured_llm(self.OutputModel)

    def generate_text(self, input_data: InputModel) -> OutputModel:
        # Construct chat messages
        chat_messages = [
            ChatMessage(role=MessageRole.SYSTEM, content=input_data.system_prompt),
            ChatMessage(role=MessageRole.USER, content=input_data.user_prompt)
        ]

        response: ChatResponse = self.sllm.chat(chat_messages)
        content = response.message.content

        if content is None:
            raise ValueError("Model output is invalid: does not contain content")

        # Return validated output
        return self.OutputModel(content=content)

if __name__ == "__main__":
    text_generator = TextGenerator(llm)

    input_data = TextGenerator.InputModel(
        system_prompt="You are a helpful assistant.",
        user_prompt="Write a summary of the recent advancements in AI."
    )

    generated_text = text_generator.generate_text(input_data)
    print(generated_text.content)
