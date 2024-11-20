import { useState, useEffect } from "react";
import SummarizeForm from "./SummarizeForm";
import CreatingNotesMessage from "./CreatingNotesMessage";

export default function SummarizerPanel({addNotes}) {
    const [creatingNotes, setCreatingNotes] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    
    const handleLoading = (status) => {
        setCreatingNotes(status);
    }

    useEffect(() => {
        let recorder;
        let localAudioChunks = [];

        if (isRecording) {
            // Requesting microphone access
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    recorder = new MediaRecorder(stream);
                    recorder.ondataavailable = (e) => {
                        localAudioChunks.push(e.data); 
                    };

                    recorder.onstop = () => {
                        const audioBlob = new Blob(localAudioChunks, { type: "audio/wav" });
                        const audioURL = URL.createObjectURL(audioBlob);
                        const link = document.createElement("a");
                        link.href = audioURL;
                        link.download = "recording.wav";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        // Stop all audio tracks to free resources
                        stream.getTracks().forEach((track) => track.stop());
                        localAudioChunks = []; // Clear chunks after recording
                    };

                    recorder.start(); // Start recording
                    setMediaRecorder(recorder);
                })
                .catch((err) => {
                    console.error("Error accessing microphone:", err);
                    alert("Microphone access is required to record audio.");
                    setIsRecording(false); // Reset recording state if an error occurs
                });
        }

        // Cleanup function to stop recording if the component unmounts or state changes
        return () => {
            if (recorder && recorder.state !== "inactive") {
                recorder.stop();
            }
        };
    }, [isRecording]);

    const handleRecording = () => {
        if (isRecording) {
            // Stop Recording
            if (mediaRecorder) {
                mediaRecorder.stop();
            }
            setIsRecording(false);
        } else {
            // Start recording
            setIsRecording(true);
        }
    };

    return(
        <div className="summarizer-panel">
            <SummarizeForm handleLoading={handleLoading} addNotes={addNotes} />
            <div>
                <button onClick={handleRecording}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
            </div>
            {creatingNotes && <CreatingNotesMessage />}
        </div>
    )
}