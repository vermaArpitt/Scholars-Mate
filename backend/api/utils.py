from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
import pdfplumber
import os

def Summarizer(text):
    summarizer = pipeline('summarization',model='t5-base',tokenizer='t5-base',framework='pt')
    summary_list = []
    for i in range(0, (len(text) // 1000) + 1):
        summary_text = summarizer(text[i * 1000 : (i+1) * 1000], max_length=62, min_length=10)[0]['summary_text']
        summary_list.append(summary_text)

    return "".join(summary_list)

def YoutubeSummarizer(link):
    video_id = link.split("=")[1]

    languages = ['en', 'en-US', 'es', 'fr']

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
    pass