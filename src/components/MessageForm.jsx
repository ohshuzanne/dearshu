import { useState } from "react";
import axios from "axios";

const GOOGLE_SHEET_API =
  "https://script.google.com/macros/s/AKfycbziVxtzBU0tp2dv44SKevj7TprELA-NpvNTQIljisnbaSU2ZNpt0zJ94mPfnW4cqcUd/exec";

const MessageForm = ({ onMessageSent }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return alert("Please enter a message!");

    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append("message", message); 

      const response = await axios.post(GOOGLE_SHEET_API, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (response.data.includes("Success")) {
        setMessage("");
        onMessageSent();
        alert("Your message has been sent successfully!");
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error occurred when sending message. Try again later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Leave me a note!"
        rows="4"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Submit"}
      </button>
    </form>
  );
};

export default MessageForm;
