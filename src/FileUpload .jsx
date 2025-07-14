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

      const values = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
      const id = values[0];
      const subject = values[4];
      const duedate = values[6]?.replace(/"/g, "") || "N/A";;
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
    <div style={{ maxWidth: "600px",maxHeight:"600px", margin: "20px auto", padding: "20px" }}>
      <h2>CSV file Extractor</h2>

      <input type="file" accept=".csv,.txt" onChange={handleFileChange} />

      <textarea
        style={{ width: "600px", height: "500px", marginTop: "10px", }}
        value={taskList.join("\n")}
        readOnly
      />      {taskList.length > 0 && (
        <button
          onClick={copyToClipboard}
          className="btn btn-primary"
        >
          Copy Task List
        </button>
      )}
    </div>
  );
};

export default FileUpload;
