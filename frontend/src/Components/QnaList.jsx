import { useEffect, useState } from "react";
import '../Styles/Qna.css';
import api from '../api';
import Qna from "./QnA";

export default function QnaList({notes_id}) {
    const [qnaList, setQnaList] = useState([]);
    const [question, setQuestion] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question.trim()) {
            alert("Question cannot be empty.");
            return;
        }

        try{
            await api.post('qna/', {note: notes_id, question: question})
        } catch (err) {
            alert(err);
        } finally {
            getQnaList();
        }
    };

    const getQnaList = async () => {
        try{
            const res = await api.get(`qna/?note=${notes_id}`);
            setQnaList(res.data);
        } catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        getQnaList();
    }, [notes_id]);

    return(
        <div className="qna-container">
            {qnaList.map((qna) => <Qna qna={qna} key={qna.id} />)}
            <form onSubmit={handleSubmit}>
                <input type="text" value={question} placeholder="Ask your doubts" onChange={(e) => setQuestion(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}