import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    const payload = {
      language: "java",
      code
    };

    try {
      const { data } = await axios.post("http://localhost:5000/run", payload);
      const outputFilePath = data.outputFilePath; // Assuming the backend returns the path to the output file
      const response = await axios.get(outputFilePath);
      setOutput(response.data);
    } catch (error) {
      console.error("Error:", error);
      setOutput("An error occurred while fetching the output.");
    }
  };

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <textarea rows="20" cols="75" value={code} onChange={(e) => { setCode(e.target.value) }}></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
    </div>
  );
}

export default App;
