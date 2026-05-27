import os
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])


def answer(question: str, chunks: list[dict]) -> str:
    context = "\n\n".join(c["content"] for c in chunks)
    message = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": f"Use the following notes to answer the question.\n\nNotes:\n{context}\n\nQuestion: {question}",
            }
        ],
    )
    return message.content[0].text
