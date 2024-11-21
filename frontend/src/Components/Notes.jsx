import { useNavigate } from "react-router-dom"

export default function Notes({ notes, handleDelete }) {
    const navigate = useNavigate();
    const date = new Date(notes.created_at).toISOString().split('T')[0];

    const handleNotesClick = () => {
        navigate(`/notes/${notes.id}/`, { state: { notes } });
    }

    return(
        <div className="notes-container">
            <p className="notes-title" onClick={handleNotesClick}>{notes.title}</p>
            <p className="created-at">created on - {date}</p>
            <button className="delete-notes" onClick={() => handleDelete(notes.id)}>Delete Notes</button>
        </div>
    )
}