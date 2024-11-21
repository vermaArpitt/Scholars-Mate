import Notes from './Notes'
import '../Styles/NotesPanel.css'

export default function NotesPanel({notesList, handleDelete}) {
    return(
        <div className="notes-panel">
            <h2> Notes </h2>
            {notesList.map((notes) => <Notes notes={notes} handleDelete={handleDelete} key={notes.id} />)}
        </div>
    )
}