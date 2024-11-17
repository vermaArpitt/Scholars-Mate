import { useState } from "react"
import api from '../api'

export default function SummarizeForm({addNotes, handleLoading}) {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ((link && (pdfFile || audioFile)) || (pdfFile && audioFile)) {
            alert("Please fill out only one field for creating notes.");
            return;
        }

        if (!link && !pdfFile && !audioFile) {
            alert("Enter atleast one field for creating notes.");
            return;
        }

        try{
            setIsLoading(true);
            handleLoading(true);
            
            const formData = new FormData();
            formData.append("title", title);

            if (link) {
                formData.append("link", link);
            } else if (pdfFile) {
                formData.append("pdf_file", pdfFile);
            } else if (audioFile) {
                formData.append("audio_file", audioFile);
            }

            const res = await api.post("/api/summarize/", formData);
            addNotes(res.data);

        } catch (err) {
            alert(err);
        } finally {
            setTitle("");
            setLink("");
            setPdfFile(null);
            setAudioFile(null);
            setIsLoading(false);
            handleLoading(false);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h3>YouTube Transcript Summarizer</h3>
            <input type="text" id="title" value={title} placeholder="Title" required onChange={(e) => setTitle(e.target.value)} />
            <br/>
            <input type="text" id="link" value={link} placeholder="Enter Youtube URL" onChange={(e) => setLink(e.target.value)} />
            <br/>
            <label htmlFor="pdfFile">Upload PDF File</label>
            <input type="file" id="pdfFile" accept=".pdf" onChange={(e) => setPdfFile(e.target.files[0])} />
            <br/>
            <label htmlFor="audioFile">Upload Audio File</label>
            <input type="file" id="audioFile" accept=".wav, .mp3" onChange={(e) => setAudioFile(e.target.files[0])} />
            <br/>
            <button type="submit" disabled={isLoading}>
                {isLoading? "Creating Notes..." : "Create Notes"}
            </button>
        </form>
    )
}