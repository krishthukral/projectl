import "./diagnosis.css";
import React, { useState } from "react";
import axios from "axios";

function Diagnosis() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const conversation = [
        {
          role: "system",
          content:
            "Based on the symptoms you're told, recommend which area to stretch. Your options are elbow, hand, wrist, hip, knee, shoulder, neck, and ankles",
        },
        { role: "user", content: text },
      ];

      const apiResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: conversation,
        },
        {
          headers: {
            Authorization:
              "Bearer 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",
            "Content-Type": "application/json",
          },
        }
      );

      if (apiResponse.data) {
        setResponse(apiResponse.data.choices[0].message.content);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="Diagnosis">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe your symptoms..."
          value={text}
          onChange={handleTextChange}
        />
        <button type="submit" className="submit">
          Submit
        </button>
      </form>

      {response && (
        <div className="response">
          <p>Recommended Action:</p>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Diagnosis;
