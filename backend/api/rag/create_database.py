from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema.document import Document
from .embedding_function import get_embedding_function
from langchain.vectorstores.chroma import Chroma
import os
import shutil

CHROMA_PATH = "chroma"

def load_text_document(context: str, source: str="context_text"):
    """
    Load a single large text input into a Document object.
    """
    document = Document(page_content=context, metadata={"source": source})
    return [document]  # Returning as a list for consistency with downstream functions


def split_documents(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=80,
        length_function=len,
        is_separator_regex=False,
    )
    return text_splitter.split_documents(documents)


def add_to_chroma(chunks: list[Document]):
    db = Chroma(
        persist_directory=CHROMA_PATH, embedding_function=get_embedding_function()
    )

    # Calculate Page IDs.
    chunks_with_ids = calculate_chunk_ids(chunks)

    # Add or Update the documents.
    existing_items = db.get(include=[])
    existing_ids = set(existing_items["ids"])
    print(f"Number of existing documents in DB: {len(existing_ids)}")

    # Only adding documents that don't exist in the DB.
    new_chunks = []
    for chunk in chunks_with_ids:
        if chunk.metadata["id"] not in existing_ids:
            new_chunks.append(chunk)

    if len(new_chunks):
        print(f"👉 Adding new documents: {len(new_chunks)}")
        new_chunk_ids = [chunk.metadata["id"] for chunk in new_chunks]
        db.add_documents(new_chunks, ids=new_chunk_ids)
        db.persist()
    else:
        print("✅ No new documents to add")


def calculate_chunk_ids(chunks):
    """
    Assign unique IDs to each chunk based on the source and chunk index.
    """
    last_page_id = None
    current_chunk_index = 0

    for chunk in chunks:
        source = chunk.metadata.get("source", "unknown")
        current_page_id = source

        if current_page_id == last_page_id:
            current_chunk_index += 1
        else:
            current_chunk_index = 0

        chunk_id = f"{current_page_id}:{current_chunk_index}"
        last_page_id = current_page_id

        chunk.metadata["id"] = chunk_id

    return chunks


def clear_database():
    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)
        print("Database Cleared")


def create_database(title, text):

    # Load the single large text document
    documents = load_text_document(text, title)

    # Split into chunks
    chunks = split_documents(documents)

    # Add chunks to Chroma
    add_to_chroma(chunks)

    # clear_database()