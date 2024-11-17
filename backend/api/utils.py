from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
import pdfplumber
import whisper
import os

model = whisper.load_model("base")

def Summarizer(text):
    summarizer = pipeline('summarization',model='t5-base',tokenizer='t5-base',framework='pt')
    summary_list = []
    for i in range(0, (len(text) // 1000) + 1):
        summary_text = summarizer(text[i * 1000 : (i+1) * 1000], max_length=62, min_length=10)[0]['summary_text']
        summary_list.append(summary_text)

    return "".join(summary_list)

def YoutubeSummarizer(link):
    video_id = link.split("=")[1]

    languages = ['en', 'en-US']

    transcript_list = YouTubeTranscriptApi.get_transcript(video_id, languages=languages)
    transcript = "".join([t['text'] for t in transcript_list])

    summarized_text = Summarizer(transcript)    

    return transcript, summarized_text

def PDFSummarizer(pdf_file):
    extracted_text = ""

    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                extracted_text += page_text + " "

    summarized_text = Summarizer(extracted_text)

    return extracted_text, summarized_text

def AudioSummarizer(audio_file):
    try:
        if not os.path.exists("temp_uploads"):
            os.makedirs("temp_uploads")

        file_path = os.path.join("temp_uploads", audio_file.name)
        with open(file_path, "wb") as f:
            for chunk in audio_file.chunks():
                f.write(chunk)
        
        result = model.transcribe(file_path)
        original_text = result["text"]
        print(f"Original text: {original_text}")

        summarized_text = Summarizer(original_text)
        print(f"Summary: {summarized_text}")
        return original_text, summarized_text
    
    except Exception as e:
        raise ValueError(f"Error processing audio file: {e}")
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)