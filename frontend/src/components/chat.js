import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");

    const handleChat = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/chat", { query });
            setResponse(res.data.response);
        } catch (error) {
            console.error("Error:", error);
            setResponse("An error occurred while processing your query.");
        }
    };

    return (
        <div>
            <h2>Chat with Dataset</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask something..."
            />
            <button onClick={handleChat}>Ask</button>
            <p><strong>Response:</strong> {response}</p>
        </div>
    );
};

export default Chat;
