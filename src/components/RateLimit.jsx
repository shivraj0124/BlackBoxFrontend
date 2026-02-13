import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const FIVE_MINUTES = 1 * 60 * 1000; // 5 minutes in milliseconds

function RateLimit() {
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  // 🔥 Load countdown from sessionStorage
  useEffect(() => {
    const storedEndTime = sessionStorage.getItem("uploadEndTime");

    if (storedEndTime) {
      const timeLeft = parseInt(storedEndTime) - Date.now();

      if (timeLeft > 0) {
        setRemainingTime(timeLeft);
      } else {
        sessionStorage.removeItem("uploadEndTime");
      }
    }
  }, []);

  // 🔥 Countdown logic
  useEffect(() => {
    if (remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          sessionStorage.removeItem("uploadEndTime");
          toast.success("You can upload now!");
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const handleClick = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/upload-check`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Upload allowed!");

        const endTime = Date.now() + FIVE_MINUTES;

        sessionStorage.setItem("uploadEndTime", endTime);
        setRemainingTime(FIVE_MINUTES);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Toaster position="top-center" />

      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl border border-white/20 w-[400px] text-center">

        <h2 className="text-2xl font-semibold text-white mb-6">
          Rate Limited Upload
        </h2>

        <button
          onClick={handleClick}
          disabled={loading || remainingTime > 0}
          className={`
            w-full py-3.5 rounded-xl font-semibold text-base
            flex items-center justify-center gap-2.5
            transition-all duration-300 ease-out
            shadow-lg relative overflow-hidden group
            ${
              loading || remainingTime > 0
                ? "bg-slate-700/80 text-slate-400 cursor-not-allowed border border-slate-600/50"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] border border-indigo-500/50"
            }
          `}
        >
          {loading || remainingTime > 0 ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{loading ? "Processing..." : "Please wait..."}</span>
            </>
          ) : (
            <span>Upload File</span>
          )}
        </button>

        {remainingTime > 0 && (
          <p className="mt-5 text-indigo-400 text-sm">
            Next upload available in {formatTime(remainingTime)}
          </p>
        )}
      </div>
    </div>
  );
}

export default RateLimit;