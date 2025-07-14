import React, { useState } from "react";

const FileUpload = () => {
  const [taskList, setTaskList] = useState([]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split("\n");
    const tasks = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values=line.split(",")
      console.log(values);
      const id = values[0];
      const subject = values[4];
      const duedate = values[6]?.replace('') || "N/A";;
      const Ai = values[7] ||"0";
      const done = values[8]||"0";
      const status = values[9];

      const formatted = `#${id} -> ${subject} -> ${duedate} -> ${Ai}% ai used -> ${done}%done -> ${status}`;
      tasks.push(formatted);
    }

    setTaskList(tasks);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(taskList.join("\n"));
    alert("Task list copied!");
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

        {taskList.length > 0 && (
          <button
            onClick={copyToClipboard}
            className="btn btn-primary float-end"
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
          >
            📋 Copy
          </button>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
