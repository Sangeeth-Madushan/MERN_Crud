import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);

  // Fetch names from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/names")
      .then(response => setNames(response.data))
      .catch(error => console.error("Error fetching names:", error));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) return; // Prevent empty submissions

    axios.post("http://localhost:5000/api/names", { name })
      .then(response => {
        setNames([...names, response.data]); // Update state with new name
        setName(""); // Clear input field
      })
      .catch(error => console.error("Error adding name:", error));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">Name List</h2>

        {/* Add Name Form */}
        <form onSubmit={handleSubmit} className="flex gap-1 mt-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-4 py-2 text-white transition bg-green-500 rounded-md hover:bg-green-600">
            Add
          </button>
        </form>

        {/* Name List Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
              </tr>
            </thead>
            <tbody>
              {names.map((item, index) => (
                <tr key={index} className="border">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default App;
