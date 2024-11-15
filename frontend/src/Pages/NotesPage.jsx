import {useLocation} from "react-router-dom"

export default function NotesPage() {
    const location = useLocation();
    const {notes} = location.state;

    return(
        <div className="notes-page-container">
            <p> {notes.summarized_text} </p>
        </div>
    )
}