from langchain.vectorstores.chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama
from .embedding_function import get_embedding_function
import requests
import os

# Retrieve the Hugging Face API token from the environment variable
access_token = os.getenv("HUGGINGFACE_ACCESS_TOKEN")

# Hugging Face Inference API URL for the Mistral model
api_url = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-v0.1"

# Define headers with the authorization token
headers = {
    "Authorization": f"Bearer {access_token}"
}

def generate_response(prompt):
    # Define the payload for the API request
    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 150,  # Limit the number of tokens in the response
            "temperature": 0.7      # Adjust creativity of the response
        }
    }

    # Send a POST request to the API
    response = requests.post(api_url, headers=headers, json=payload)

    if response.status_code == 200:
        # Parse the response JSON
        output = response.json()
        print(output)
        
        # Extract the generated text
        full_text = output[0]["generated_text"]
        
        # Try to extract the answer after '--- Answer:'
        try:
            answer_text = full_text.split('---\n\nAnswer:')[1].strip()
            # You may want to clean the answer further or extract specific sections
            answer_text = answer_text.split('\n')[0]  # Extract only the first line (if necessary)
        except IndexError:
            answer_text = "Answer not found"
        
        return answer_text
    else:
        # Print error message if the request fails
        print(f"Error: {response.status_code}, {response.text}")
        return None

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
{context}

---

Answer the question based on the above context: {question}

---

Answer:
"""

def query_rag(query_text: str):
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

    results = db.similarity_search_with_score(query_text, k=2)

    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)
    # print(prompt)

    response_text = generate_response(prompt)

    sources = [doc.metadata.get("id", None) for doc, _score in results]
    formatted_response = f"Response: {response_text}\n\nSources: {sources}"
    # print(formatted_response)
    return response_text