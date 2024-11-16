import { useState } from "react"
import api from '../api'

export default function YoutubeForm({addNotes, handleLoading}) {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            setIsLoading(true);
            handleLoading(true);
            const res = await api.post("/api/summarize/youtube/",{title, link});
            addNotes(res.data);
        } catch (err) {
            alert(err);
        } finally {
            setIsLoading(false);
            handleLoading(false);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h3>YouTube Transcript Summarizer</h3>
            <input type="text" value={title} placeholder="Title" required onChange={(e) => setTitle(e.target.value)} />
            <input type="text" value={link} placeholder="Enter url" required onChange={(e) => setLink(e.target.value)} />
            <button type="submit" disabled={isLoading}>
                {isLoading? "Creating Notes" : "Create Notes"}
            </button>
        </form>
    )
}