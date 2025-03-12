import { useState } from "react";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import "./styles.css";

function App() {
  const [activeTab, setActiveTab] = useState("send");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleMessageSent = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="website-container">
      <div className="folder-tabs">
        <button 
          className={`folder-tab ${activeTab === "send" ? "active" : ""}`} 
          onClick={() => setActiveTab("send")}
        >
          Message
        </button>
        <button 
          className={`folder-tab ${activeTab === "list" ? "active" : ""}`} 
          onClick={() => setActiveTab("list")}
        >
          QnA
        </button>
      </div>

      <div className="folder-content">
        <section className="content-section">
          {activeTab === "send" ? (
            <div className="send-section">
              <img src="/assets/logo.png" alt="Logo" />
              <h2>Ask me anything!</h2>
              <p className="intro-text">Have a question for me? Send me one anonymously!</p>
              <MessageForm onMessageSent={handleMessageSent} />
            </div>
          ) : (
            <div className="list-section">
              <img src="/assets/answers.png" alt="Answer" />
              <h2>Q&A
    
              </h2>
              <MessageList refresh={refreshTrigger} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;