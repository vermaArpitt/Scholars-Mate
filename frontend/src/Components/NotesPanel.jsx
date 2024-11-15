import Notes from './Notes'

export default function NotesPanel({notesList}) {
    return(
        <div className="notes-panel">
            <h3> Notes </h3>
            {notesList.map((notes) => <Notes notes={notes} key={notes.id} />)}
        </div>
    )
}