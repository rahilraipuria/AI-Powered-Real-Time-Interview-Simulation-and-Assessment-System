import { useEffect, useState } from "react";

let recognition = null;

if ('webkitSpeechRecognition' in window) {
    recognition = new window.webkitSpeechRecognition(); // Use 'window.' to access the constructor
    recognition.continuous = true;
    recognition.lang = "en-US";
}

const useSpeechRecognition = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            setText(transcript);
            setIsListening(false); // Stop listening after processing the result
        };

        return ()=>{
            recognition.onresult=null;

        };
    },[recognition]);
    //     recognition.onerror = (event) => {
    //         console.error("Speech recognition error:", event.error);
    //         setIsListening(false); // Ensure it stops listening on error
    //     };

    //     recognition.onend = () => {
    //         setIsListening(false); // Use state setter to update
    //     };

    // }, []);
    useEffect(()=>{
        console.log(text)
    },[text])
    const startListening = () => {
        if (!isListening && recognition) { // Only start if it's not already listening
            setText('');
            setIsListening(true);
            recognition.start();
        }
    };

    const stopListening = () => {
        if (recognition && isListening) {
            recognition.stop();
        }
    };

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition,
    };
};

export default useSpeechRecognition;
