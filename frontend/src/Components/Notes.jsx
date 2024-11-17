import { useNavigate } from "react-router-dom"
import '../Styles/Notes.css'

export default function Notes({ notes, handleDelete }) {
    const navigate = useNavigate();

    const handleNotesClick = () => {
        navigate(`/notes/${notes.id}/`, { state: { notes } });
    }

    return(
        <div className="notes-container">
            <p onClick={handleNotesClick}>{notes.title}</p>
            <p>{notes.created_at}</p>
            <button className="delete-notes" onClick={() => handleDelete(notes.id)}>Delete Notes</button>
        </div>
    )
}