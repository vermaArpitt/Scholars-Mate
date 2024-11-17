import Notes from './Notes'

export default function NotesPanel({notesList, handleDelete}) {
    return(
        <div className="notes-panel">
            <h3> Notes </h3>
            {notesList.map((notes) => <Notes notes={notes} handleDelete={handleDelete} key={notes.id} />)}
        </div>
    )
}