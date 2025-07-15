import React, { useState } from "react";
import axios from "axios";
const FileUpload = () => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);

   const webhookUrl = "https://superbotics.webhook.office.com/webhookb2/796c92f5-1ef7-45d9-9df4-a9d7612937c0@770a3e1d-02bf-4dd3-ae8b-77bbcb69b020/IncomingWebhook/cbdb41456b1c462abf3b3799c48e0697/486adccd-4b59-499f-ac34-f07ba8b8ad6e/V20ehng_jwX0cd7s63biEr0LCm5yPCH3mMUIY3iVJ2Z0M1";
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (!file) return;

    const text = await file.text();
    const lines = text.split("\n");
    const tasks = [];

      for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values=line.split(",")
      const id = values[0];
      const subject = values[4];
      const duedate = values[6]?.replace(/"/g,"") || "N/A";
      const Ai = values[7] ||"0";
      const done = values[8]||"0";
      const status = values[9];

      const formatted = `#${id} -> ${subject} -> ${duedate} -> ${Ai}% ai used -> ${done}%done -> ${status}`;
      tasks.push(formatted);
    }

    setTaskList(tasks);
  };
  const postToTeams = async () => {
    if (taskList.length === 0) {
      alert("No tasks to post!");
      return;
    }
    setLoading(true);
    try {
      const message = `Task List Extracted from CSV:\n\n${taskList.join("\n")}`;

      await axios.post(webhookUrl, {
        text: message
      });

      alert(" Task list posted to Teams!");
    } catch (error) {
      console.error(" Error posting to Teams:", error);
      alert(" Failed to post to Teams.");
    } finally {
      setLoading(false);
    }

  };

   return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      minWidth:"100vw",
      backgroundColor: "#f8f9fa",
      padding: "20px",
    }}>
      <div style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        maxWidth: "600px",
        width: "100%"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "5px", color: "#333" }}>
          📄 CSV file Extractor
        </h2>

        <input
          type="file"
          accept=".csv,.txt"
          onChange={handleFileChange}
          style={{
            display: "block",
            margin: "0 auto 10px auto",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        />

        <textarea
          value={taskList.join("\n")}
          readOnly
          style={{
            width: "100%",
            minHeight: "70vh",
            padding: "10px",
            marginRight:"20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "#f1f3f5",
            color:"black",
            marginBottom:"1px",
          }}
        />

      <button
        className="btn btn-primary w-100 mt-3"
        onClick={postToTeams}
        disabled={loading || taskList.length === 0}
      >
        {loading ? "Posting to Teams..." : "Post Task List to Teams"}
      </button>
      </div>
    </div>
  );
};

export default FileUpload;
