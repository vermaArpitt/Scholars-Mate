import { useNavigate } from "react-router-dom"
import '../Styles/Notes.css'

export default function Notes({ notes }) {
    const navigate = useNavigate();

    const handleNotesClick = () => {
        navigate(`/notes/${notes.id}/`, { state: { notes } });
    }

    return(
        <div className="notes-container" onClick={handleNotesClick}>
            <p>{notes.title}</p>
            <p>{notes.created_at}</p>
        </div>
    )
}