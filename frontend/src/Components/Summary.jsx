import '../Styles/Summary.css'

export default function Summary({ summarized_text }) {
    return(
        <div className="summary-container">
            <h2>Notes:</h2>
            {summarized_text}
        </div>
    )
}