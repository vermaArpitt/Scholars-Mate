import { useState } from "react"

export default function Qna() {
    const [question, setQuestion] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    return(
        <div className="qna-container">
            <form onSubmit={handleSubmit}>
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
            </form>
        </div>
    )
}