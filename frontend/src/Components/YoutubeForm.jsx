import { useState } from "react"
import api from '../api'

export default function YoutubeForm({addNotes}) {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await api.post("/api/summarize/youtube/",{title, link});
            addNotes(res.data);
        } catch (err) {
            alert(err);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h3>YouTube Transcript Summarizer</h3>
            <input type="text" value={title} placeholder="Title" required onChange={(e) => setTitle(e.target.value)} />
            <input type="text" value={link} placeholder="Enter url" required onChange={(e) => setLink(e.target.value)} />
            <button type="submit">Create Notes</button>
        </form>
    )
}