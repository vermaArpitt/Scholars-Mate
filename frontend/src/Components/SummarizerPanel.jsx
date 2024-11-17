import { useState } from "react";
import SummarizeForm from "./SummarizeForm";
import CreatingNotesMessage from "./CreatingNotesMessage";

export default function SummarizerPanel({addNotes}) {
    const [creatingNotes, setCreatingNotes] = useState(false);
    
    const handleLoading = (status) => {
        setCreatingNotes(status);
    }

    return(
        <div className="summarizer-panel">
            <SummarizeForm handleLoading={handleLoading} addNotes={addNotes} />
            {creatingNotes && <CreatingNotesMessage />}
        </div>
    )
}