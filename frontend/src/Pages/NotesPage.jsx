import {useLocation} from "react-router-dom";
import Navbar from '../Components/Navbar';
import Summary from "../Components/Summary";
import QnaList from "../Components/QnaList";
import '../Styles/NotesPage.css';

export default function NotesPage() {
    const location = useLocation();
    const {notes} = location.state;

    return(
        <>
        <Navbar />
        <div className="notes-page-container">
            <Summary summarized_text={notes.summarized_text} />
            <QnaList notes_id={notes.id} />
        </div>
        </>
    )
}