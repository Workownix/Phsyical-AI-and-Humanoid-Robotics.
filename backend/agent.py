import os
from dotenv import load_dotenv
import asyncio

# Load environment variables
load_dotenv()

# Import after installing dependencies
try:
    from openai import AsyncOpenAI
    from agents import Agent, Runner, OpenAIChatCompletionsModel, set_tracing_disabled, function_tool, enable_verbose_stdout_logging

    enable_verbose_stdout_logging()
    set_tracing_disabled(disabled=True)

    gemini_api_key = os.getenv("GEMINI_API_KEY")
    provider = AsyncOpenAI(
        api_key=gemini_api_key,
        base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
    )

    model = OpenAIChatCompletionsModel(
        model="gemini-2.0-flash",
        openai_client=provider
    )
except ImportError as e:
    print(f"Import error: {e}")
    print("Please install the required dependencies using: pip install -r requirements.txt")
    exit(1)

try:
    import cohere
    from qdrant_client import QdrantClient

    # Initialize Cohere client with environment variable
    cohere_api_key = os.getenv("COHERE_API_KEY")
    cohere_client = cohere.Client(cohere_api_key)

    # Connect to Qdrant with environment variables
    qdrant_url = os.getenv("QDRANT_URL")
    qdrant_api_key = os.getenv("QDRANT_API_KEY")
    qdrant = QdrantClient(
        url=qdrant_url,
        api_key=qdrant_api_key
    )
except ImportError as e:
    print(f"Import error: {e}")
    print("Please install the required dependencies using: pip install -r requirements.txt")
    exit(1)



def get_embedding(text):
    """Get embedding vector from Cohere Embed v3"""
    try:
        response = cohere_client.embed(
            model="embed-english-v3.0",
            input_type="search_query",  # Use search_query for queries
            texts=[text],
        )
        return response.embeddings[0]  # Return the first embedding
    except Exception as e:
        print(f"Error getting embedding: {e}")
        return []


@function_tool
def retrieve(query):
    try:
        embedding = get_embedding(query)
        if not embedding:
            return ["Failed to retrieve embeddings"]

        result = qdrant.query_points(
            collection_name="humanoid_ai_book",
            query=embedding,
            limit=5
        )
        return [point.payload["text"] for point in result.points]
    except Exception as e:
        print(f"Error retrieving from Qdrant: {e}")
        return ["Error retrieving information"]

agent = Agent(
    name="Assistant",
    instructions="""
You are an AI tutor for the Physical AI & Humanoid Robotics textbook.
To answer the user question, first call the tool `retrieve` with the user query.
Use ONLY the returned content from `retrieve` to answer.
If the answer is not in the retrieved content, say "I don't know".
""",
    model=model,
    tools=[retrieve]
)


def main():
    try:
        result = Runner.run_sync(
            agent,
            input="what is physical ai?",
        )
        print(result.final_output)
    except Exception as e:
        print(f"Error running agent: {e}")
        print("Make sure all environment variables are set correctly and required services are running.")


if __name__ == "__main__":
    main()