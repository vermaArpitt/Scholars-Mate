import { useEffect, useState } from "react"
import Navbar from "../Components/Navbar"
import '../Styles/Home.css'
import NotesPanel from "../Components/NotesPanel"
import SummarizerForms from "../Components/SummarizerForms"
import api from "../api"

export default function Home() {
    const [notesList, setNotesList] = useState([])

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

    return(
        <div className="home">
            <Navbar />
            <div className="home-container">
                <NotesPanel notesList={notesList} />
                <SummarizerForms addNotes={addNotes} />
            </div>
        </div>
    )
}