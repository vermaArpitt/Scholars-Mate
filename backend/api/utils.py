from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline

def YoutubeSummarizer(link):
    video_id = link.split("=")[1]

    languages = ['en', 'en-US', 'es', 'fr']

    transcript_list = YouTubeTranscriptApi.get_transcript(video_id, languages=languages)
    transcript = "".join([t['text'] for t in transcript_list])

    summarizer = pipeline('summarization',model='t5-base',tokenizer='t5-base',framework='pt')
    summary_list = []
    for i in range(0, (len(transcript) // 1000) + 1):
        summary_text = summarizer(transcript[i * 1000 : (i+1) * 1000], max_length=62, min_length=10)[0]['summary_text']
        summary_list.append(summary_text)

    summarized_text = "".join(summary_list)

    return transcript, summarized_text

def PDFSummarizer(pdf_file):
    pass