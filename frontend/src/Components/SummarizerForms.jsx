import { useState } from "react";
import YoutubeForm from "./YoutubeForm"
import CreatingNotesMessage from "./CreatingNotesMessage";

export default function SummarizerForms({addNotes}) {
    const [creatingNotes, setCreatingNotes] = useState(false);
    
    const handleLoading = (status) => {
        setCreatingNotes(status);
    }

    return(
        <div className="summarizer-forms">
            <YoutubeForm addNotes={addNotes} handleLoading={handleLoading} />
            {creatingNotes && <CreatingNotesMessage />}
        </div>
    )
}