import {useLocation} from "react-router-dom";
import Navbar from '../Components/Navbar';
import Summary from "../Components/Summary";
import Qna from "../Components/QnA";
import '../Styles/NotesPage.css';

export default function NotesPage() {
    const location = useLocation();
    const {notes} = location.state;

    return(
        <>
        <Navbar />
        <div className="notes-page-container">
            <Summary summarized_text={notes.summarized_text} />
            <Qna />
        </div>
        </>
    )
}