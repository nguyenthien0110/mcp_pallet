"use client";

import { useState } from "react";

export default function MainDashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dataList, setDataList] = useState<string[]>([
    "Data 1",
    "Data 2",
    "Data 3",
    "Data 4",
    "Data 5",
    "Data 6",
  ]);
  console.log(selectedFile);
  const [selectedData, setSelectedData] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    dataName: "",
    minL: "",
    maxL: "",
    minH: "",
    maxH: "",
    boxes: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Simulate upload delay
      setTimeout(() => alert("File uploaded!"), 1000);
    }
  };

  const handleCreate = () => {
    if (formData.dataName) {
      setDataList((prev) => [...prev, formData.dataName]);
      alert("New data created!");
    }
  };

  const handleStartPlan = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("Palletizing Plan Started!");
    }, 2000);
  };

  return (
    <div className="w-full h-full p-8 bg-gray-50 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">MCP - Main Dashboard</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Side - Upload or Create */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Step 1: Upload or Create New Data
          </h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Upload File</label>
            <input
              type="file"
              onChange={handleUpload}
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium">Set Params</label>
            <input
              type="text"
              placeholder="Data name"
              className="input"
              onChange={(e) =>
                setFormData({ ...formData, dataName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="L, W (Min value)"
              className="input"
              onChange={(e) =>
                setFormData({ ...formData, minL: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="L, W (Max value)"
              className="input"
              onChange={(e) =>
                setFormData({ ...formData, maxL: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="H (Min value)"
              className="input"
              onChange={(e) =>
                setFormData({ ...formData, minH: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="H (Max value)"
              className="input"
              onChange={(e) =>
                setFormData({ ...formData, maxH: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Num of boxes"
              className="input"
              onChange={(e) =>
                setFormData({ ...formData, boxes: e.target.value })
              }
            />
            <button
              onClick={handleCreate}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </div>

        {/* Right Side - Select + Start */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Step 2: Choose Data</h2>

          <select
            className="w-full p-2 border border-gray-300 rounded mb-6"
            onChange={(e) => setSelectedData(e.target.value)}
            value={selectedData || ""}
          >
            <option value="">Select Data</option>
            {dataList.map((data, idx) => (
              <option key={idx} value={data}>
                {data}
              </option>
            ))}
          </select>

          <button
            disabled={!selectedData || isProcessing}
            onClick={handleStartPlan}
            className={`px-6 py-2 rounded text-white ${
              isProcessing ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isProcessing ? "Processing..." : "Start Palletizing Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}
