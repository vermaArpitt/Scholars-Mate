import YoutubeForm from "./YoutubeForm"

export default function SummarizerForms({addNotes}) {
    return(
        <div className="summarizer-forms">
            <YoutubeForm addNotes={addNotes} />
        </div>
    )
}