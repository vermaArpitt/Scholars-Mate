export default function Qna({ qna }) {
    return(
        <div className="qna-item">
            <p>{qna.question_text}</p>
            <p>{qna.answer_text}</p>
        </div>
    )
}