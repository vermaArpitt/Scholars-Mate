import { useEffect, useState } from "react"
import Navbar from "../Components/Navbar"
import '../Styles/Home.css'
import NotesPanel from "../Components/NotesPanel"
import SummarizerPanel from "../Components/SummarizerPanel"
import api from "../api"

export default function Home() {
    const [notesList, setNotesList] = useState([]);

    useEffect (() => {
        getNotes();
    }, [])

    const getNotes = async () => {
        try {
            const res = await api.get('/api/notes/');
            setNotesList(res.data);
            console.log(res.data);
        } catch (err) {
            alert(err);
        }
    }

    const addNotes = () => {
        getNotes()
    }

    const deleteNotes = async (id) => {
        try {
            const res = await api.delete(`/api/notes/delete/${id}/`);
            if (res.status !== 204) {
                alert("Failed to Delete Notes :( ");
            } else {
                getNotes();
            }
        } catch (err) {
            alert(err);
        }
    }

    return(
        <div className="home">
            <Navbar />
            <div className="home-container">
                <NotesPanel notesList={notesList} handleDelete={deleteNotes}/>
                <SummarizerPanel addNotes={addNotes} />
            </div>
        </div>
    )
}