export default function Notes({notes}) {
    return(
        <div className="notes-container">
            <p>{notes.title}</p>
            <p>{notes.created_at}</p>
        </div>
    )
}