import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import Navbar from "./Navbar";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { login, user } = useAuth();

  // Add custom scrollbar styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-thin::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      .scrollbar-thin::-webkit-scrollbar-track {
        background: rgba(31, 41, 55, 0.5);
        border-radius: 4px;
      }
      .scrollbar-thin::-webkit-scrollbar-thumb {
        background: rgba(34, 197, 94, 0.3);
        border-radius: 4px;
      }
      .scrollbar-thin::-webkit-scrollbar-thumb:hover {
        background: rgba(34, 197, 94, 0.5);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/leaderboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data.leaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Rank users based on total
  const rankedData = useMemo(() => {
  if (!Array.isArray(data)) return [];

  return [...data]
    .sort((a, b) => (b?.total || 0) - (a?.total || 0))
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
}, [data]);


  // Find current user's rank
  const currentUserRank = useMemo(() => {
    const currentUser = rankedData.find((item) => item.userid === user?.id);
    return currentUser ? currentUser.rank : null;
  }, [rankedData, user]);

  // Explicitly define test columns t1 to t10
  const testColumns = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => `t${i + 1}`);
  }, []);

  // Get rank badge color and icon
  const getRankBadge = (rank) => {
    if (rank === 1) {
      return {
        bg: "bg-gradient-to-r from-yellow-400 to-yellow-600",
        text: "text-yellow-900",
        icon: "👑",
        glow: "shadow-lg shadow-yellow-500/50",
      };
    } else if (rank === 2) {
      return {
        bg: "bg-gradient-to-r from-gray-300 to-gray-500",
        text: "text-gray-900",
        icon: "🥈",
        glow: "shadow-lg shadow-gray-400/50",
      };
    } else if (rank === 3) {
      return {
        bg: "bg-gradient-to-r from-orange-400 to-orange-600",
        text: "text-orange-900",
        icon: "🥉",
        glow: "shadow-lg shadow-orange-500/50",
      };
    }
    return {
      bg: "bg-gray-700",
      text: "text-gray-300",
      icon: "",
      glow: "",
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mb-4"></div>
          <p className="text-white text-xl">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white ">
      {/* Header */}<Navbar />
      <div className="max-w-7xl mx-auto mb-8 mt-5">
        <div className="text-center mb-6 pt-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-400 text-lg">Compete, Solve, Dominate</p>
        </div>

        {/* Current User Rank Card */}
        {currentUserRank && (
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4 md:p-6 backdrop-blur-sm max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-500/20 rounded-full p-3">
                  <svg
                    className="w-8 h-8 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Your Rank</p>
                  <p className="text-2xl font-bold text-white">#{currentUserRank}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Total Score</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {rankedData.find((item) => item.userid === user?.id)?.total || 0}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900/50 border border-green-500/20 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl">
          <div className="overflow-x-auto scrollbar-thin max-h-[calc(100vh-280px)] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 z-30 bg-slate-900">
                <tr className="bg-green-500/10 border-b border-green-500/20">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-green-400 uppercase tracking-wider sticky left-0 bg-green-500/10 z-10 backdrop-blur-sm">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-green-400 uppercase tracking-wider sticky left-20 bg-green-500/10 z-10 backdrop-blur-sm">
                    Username
                  </th>
                  {testColumns.map((col) => (
                    <th
                      key={col}
                      className="px-4 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider"
                    >
                      {col.toUpperCase()}
                    </th>
                  ))}
                  <th className="px-4 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
                    Last Sub
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
                    Penalties
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-green-500/10 z-10">
                {rankedData.map((row) => {
                  const rankBadge = getRankBadge(row.rank);
                  const isCurrentUser = row.userid === user?.id;

                  return (
                    <tr
                      key={row.userid}
                      className={`
                        transition-all duration-200 
                        ${isCurrentUser
                          ? "bg-gradient-to-r from-green-600/10 to-emerald-600/10 border-l-4 border-green-500"
                          : "hover:bg-green-500/5"
                        }
                      `}
                    >
                      {/* Rank Column */}
                      <td className="px-4 py-4 sticky left-0 bg-inherit z-10">
                        <div className="flex items-center gap-2">
                          <span
                            className={`
                              inline-flex items-center justify-center 
                              px-3 py-1 rounded-full text-sm font-bold
                              ${rankBadge.bg} ${rankBadge.text} ${rankBadge.glow}
                              min-w-[60px]
                            `}
                          >
                            {rankBadge.icon && <span className="mr-1">{rankBadge.icon}</span>}
                            {row.rank}
                          </span>
                        </div>
                      </td>

                      {/* Username Column */}
                      <td className="px-6 py-4 sticky left-16 bg-inherit z-10">
                        <div className="flex items-center gap-2">
                          <span
                            className={`
                              font-semibold
                              ${isCurrentUser ? "text-green-400" : "text-white"}
                            `}
                          >
                            {row.username}
                          </span>
                          {isCurrentUser && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                              You
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Test Columns */}
                      {testColumns.map((col) => (
                        <td key={col} className="px-4 py-4 text-center">
                          {row[col] === true ? (
                            <div className="inline-flex items-center justify-center w-10 h-10 bg-green-500/20 rounded-lg border border-green-500/30">
                              <svg
                                className="w-5 h-5 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center w-10 h-10 bg-gray-800/50 rounded-lg border border-gray-700/30">
                              <span className="text-gray-600 text-sm">—</span>
                            </div>
                          )}
                        </td>
                      ))}

                      {/* Last Submission */}
                      <td className="px-4 py-4 text-center text-gray-400 text-sm">
                        {row.last_sub || "—"}
                      </td>

                      {/* Penalties */}
                      <td className="px-4 py-4 text-center">
                        {row.penalties > 0 ? (
                          <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium border border-red-500/30">
                            -{row.penalties}
                          </span>
                        ) : (
                          <span className="text-gray-600">0</span>
                        )}
                      </td>

                      {/* Total Score */}
                      <td className="px-6 py-4 text-center">
                        <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          {row.total}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {rankedData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No data available yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;