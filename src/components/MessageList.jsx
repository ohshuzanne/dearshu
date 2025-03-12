import { useEffect, useState } from "react";
import axios from "axios";

const GOOGLE_SHEET_API =
  "https://script.google.com/macros/s/AKfycbziVxtzBU0tp2dv44SKevj7TprELA-NpvNTQIljisnbaSU2ZNpt0zJ94mPfnW4cqcUd/exec";

const MessageList = ({ refresh }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(GOOGLE_SHEET_API);
        // Filter out messages without a response and reverse to show newest first
        const filteredMessages = response.data
          .filter((msg) => msg.response && msg.response.trim() !== "")
          .reverse();
        setMessages(filteredMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        alert("Failed to load messages. Please try again!");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [refresh]);

  // Pagination logic
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  return (
    <div>
      <button 
        className="refresh-button" 
        onClick={() => window.location.reload()} 
        disabled={loading}
      >
        {loading ? "Refreshing..." : "Refresh Messages"}
      </button>

      {currentMessages.length === 0 ? (
        <p className="intro-text">No responses available yet.</p>
      ) : (
        currentMessages.map((msg, index) => (
          <div key={index} className="message">
            <p>
              <strong>Q:</strong> {msg.message}
            </p>
            <p>
              <strong>A:</strong> {msg.response}
            </p>
          </div>
        ))
      )}

      {/* Pagination Buttons */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ◀ Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastMessage >= messages.length}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default MessageList;