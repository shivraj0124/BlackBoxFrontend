import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "./Navbar";
import { useAuth } from "../../context/authContext";
const FIVE_MINUTES = 5 * 60 * 1000;
import { useNavigate,Link } from "react-router-dom";

export default function HomePage() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [path, setPath] = useState("");
  const [uploadType, setUploadType] = useState("frontend");
  const [remainingTime, setRemainingTime] = useState(0);
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !path) {
      toast.error("Please select file and enter path");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // 🔥 STEP 1: Check upload permission
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/upload-check`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data.success) {
        toast.error("Upload not allowed!");
        setLoading(false);
        return;
      }



      // ✅ Upload allowed
      toast.success("Upload allowed!");

      const endTime = Date.now() + FIVE_MINUTES;
      sessionStorage.setItem("uploadEndTime", endTime);
      setRemainingTime(FIVE_MINUTES);

      // 🔥 STEP 2: Send file + path to upload API
      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", path);

      // Determine endpoint based on uploadType
      const endpoint = uploadType === "frontend" ? "/build" : "/build_server";

      const uploadRes = await axios.post(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (uploadRes.status === 200) {
        toast.success("Build successful! Check Leaderboard After few minutes!");
      } else {
        // toast.error("Upload/Build failed!");
      }

    } catch (error) {
      // console.error("Upload error:", error);
      toast.error("Rate Limited! Please wait before uploading again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 lg:pt-20 pt-30 ">
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center max-md:mt-5">
          <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Side - Info Section */}
            <div className="space-y-6 py-5">
  <div className="space-y-4">
    <div className="inline-block">
      <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-semibold border border-green-500/30">
        Debug-A-Thon 2026
      </span>
    </div>

    <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
      BlackBOX
    </h1>

    <p className="text-gray-400 text-lg leading-relaxed">
      Step into the unknown. Debug, optimize, and conquer challenges hidden within the black box.
      Upload your solutions and let the system evaluate your problem-solving prowess.
    </p>
  </div>

  {/* Features */}
 

 

 {/* How to Run Section */}
<div className="pt-8 border-t border-green-500/20 space-y-5">
  <h2 className="text-2xl font-bold text-green-400">
    How to Run the Project
  </h2>

  <p className="text-red-400 font-semibold">
    ⚠ Always run the Backend before starting the Frontend.
  </p>

  {/* Node Installation */}
  <div className="space-y-2">
    <h3 className="text-white font-semibold">1. Install Node.js</h3>

    <p className="text-gray-500 text-sm">
      Make sure Node.js is installed on your system.
      Download it from the official website:
    </p>

    <div className="bg-black/60 rounded-lg p-3 text-green-400 text-sm font-mono">
      https://nodejs.org
    </div>

    <p className="text-gray-500 text-sm">
      After installation, verify using:
    </p>

    <div className="bg-black/60 rounded-lg p-3 text-green-400 text-sm font-mono">
      node -v <br />
      npm -v
    </div>
  </div>

  {/* Backend */}
  <div className="space-y-2 overflow-hidden">
    <h3 className="text-white font-semibold">2. Run Backend</h3>

    <p className="text-gray-500 text-sm">
      Start the backend server using Node.js:
    </p>

    <div className="bg-black/60 rounded-lg p-3 text-green-400 text-sm font-mono">
      node index.js
    </div>
  </div>

  {/* Frontend */}
  <div className="space-y-2">
    <h3 className="text-white font-semibold">3. Build & Run Frontend</h3>

    <p className="text-gray-500 text-sm">
      First, install Serve and build the frontend:
    </p>

    <div className="bg-black/60 rounded-lg p-3 text-green-400 text-sm font-mono space-y-1">
      <div>npm install -g serve</div>
      <div>npm run build</div>
    </div>

    <p className="text-gray-500 text-sm mt-2">
      Then run the production build:
    </p>

    <div className="bg-black/60 rounded-lg p-3 text-green-400 text-sm font-mono">
      serve -s dist
    </div>
  </div>
</div>
          </div>


            {/* Right Side - Upload Form */}
            <div className="w-full">
              <div className="bg-gray-900/50 border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Submit Solution
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Upload your debugged files and compete
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Choose File
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full text-white bg-gray-800/50 border border-green-500/20 p-3 rounded-lg 
                                 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 
                                 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                                 file:bg-green-500/20 file:text-green-400 file:font-semibold file:cursor-pointer
                                 hover:file:bg-green-500/30"
                      />
                    </div>
                    {file && (
                      <p className="mt-2 text-sm text-gray-400 flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {file.name}
                      </p>
                    )}
                  </div>

                  {/* Upload Type */}
                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Submission Type
                    </label>
                    <select
                      value={uploadType}
                      onChange={(e) => setUploadType(e.target.value)}
                      className="w-full text-white bg-gray-800/50 border border-green-500/20 p-3 rounded-lg 
                               focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 
                               transition-all cursor-pointer"
                    >
                      <option value="frontend" className="bg-gray-800">Frontend Challenge</option>
                      <option value="backend" className="bg-gray-800">Backend Challenge</option>
                    </select>
                  </div>

                  {/* File Path */}
                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      File Path
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. frontend/src/index.html"
                      value={path}
                      onChange={(e) => setPath(e.target.value)}
                      className="w-full text-white bg-gray-800/50 border border-green-500/20 p-3 rounded-lg 
                               focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 
                               transition-all placeholder:text-gray-600"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer w-full p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold 
                             rounded-lg hover:from-green-400 hover:to-emerald-400 transition-all duration-200 
                             disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20
                             transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Uploading...
                      </span>
                    ) : (
                      "Submit Solution"
                    )}
                  </button>

                  {/* Quick Access Buttons */}
                  <div className="pt-4 border-t border-green-500/20">
                    <p className="text-sm text-gray-400 mb-3">Quick Access</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to="https://drive.google.com/drive/folders/1Nh55sRIQ_gzTcByXlPp2PtcqFWh-o8gS?usp=sharing"
                           className="p-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white 
                                 hover:bg-green-500/10 hover:border-green-500/40 transition-all group"
                      >
                        <div className="flex items-center justify-center gap-2 cursor-pointer">
                          <svg className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          <span className="font-semibold">Frontend</span>
                        </div>
                      </Link>

                      <Link
                        to="https://drive.google.com/drive/folders/19HtF-pSL8JjN2eAS67lWF3JH-zkgFNnp?usp=sharing"
                           className="p-3 bg-gray-800/50 border border-green-500/20 rounded-lg text-white 
                                 hover:bg-green-500/10 hover:border-green-500/40 transition-all group"
                      >
                        <div className="flex items-center justify-center gap-2 cursor-pointer">
                          <svg className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                          </svg>
                          <span className="font-semibold">Backend</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


