// import React, { useMemo, useState } from "react";
// import { useAuth } from "../../context/authContext";
// import { Trophy, Medal, Award, ChevronLeft, ChevronRight } from "lucide-react";
// import Navbar from "./Navbar";

// const dummyData = [
//     { id: 1, username: "Alpha01", col1: 10, col2: 20, col3: 15, col4: 30, col5: 12 },
//     { id: 2, username: "Beta02", col1: 25, col2: 10, col3: 18, col4: 22, col5: 17 },
//     { id: 3, username: "Gamma03", col1: 5, col2: 40, col3: 12, col4: 10, col5: 25 },
//     { id: 4, username: "Delta04", col1: 20, col2: 15, col3: 22, col4: 18, col5: 14 },
//     { id: 5, username: "Tanish001", col1: 30, col2: 35, col3: 20, col4: 25, col5: 28 },
//     { id: 6, username: "Zeta06", col1: 12, col2: 18, col3: 28, col4: 16, col5: 19 },
//     { id: 7, username: "Omega07", col1: 14, col2: 11, col3: 9, col4: 21, col5: 33 },
//     { id: 8, username: "Alpha01", col1: 10, col2: 20, col3: 15, col4: 30, col5: 12 },
//     { id: 9, username: "Beta02", col1: 25, col2: 10, col3: 18, col4: 22, col5: 17 },
//     { id: 10, username: "Gamma03", col1: 5, col2: 40, col3: 12, col4: 10, col5: 25 },
//     { id: 11, username: "Delta04", col1: 20, col2: 15, col3: 22, col4: 18, col5: 14 },
//     { id: 12, username: "Tanish01", col1: 30, col2: 35, col3: 20, col4: 28, col5: 30 },
//     { id: 13, username: "Zeta06", col1: 12, col2: 18, col3: 28, col4: 16, col5: 19 },
//     { id: 14, username: "Omega07", col1: 14, col2: 11, col3: 9, col4: 21, col5: 33 },
// ];

// export default function Leaderboard() {
//     const { user } = useAuth();
//     const [currentPage, setCurrentPage] = useState(1);
//     const rowsPerPage = 10;

//     // Calculate totals
//     const rankedData = useMemo(() => {
//         return dummyData
//             .map((item) => ({
//                 ...item,
//                 total: item.col1 + item.col2 + item.col3 + item.col4 + item.col5,
//             }))
//             .sort((a, b) => b.total - a.total)
//             .map((item, index) => ({
//                 ...item,
//                 rank: index + 1,
//             }));
//     }, []);

//     const indexOfLast = currentPage * rowsPerPage;
//     const indexOfFirst = indexOfLast - rowsPerPage;
//     const currentRows = rankedData.slice(indexOfFirst, indexOfLast);

//     const totalPages = Math.ceil(rankedData.length / rowsPerPage);

//     const currentUserRank = rankedData.find(
//         // (item) => item.username === user?.username
//         (item) => 1 === 1
//     );

//     const isUserOnCurrentPage = currentRows.some(
//         (row) => row.id === user?.id
//     );

//     // Get rank icon
//     const getRankIcon = (rank) => {
//         if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
//         if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
//         if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
//         return null;
//     };

//     // Get rank background color
//     const getRankBgColor = (rank) => {
//         if (rank === 1) return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border-yellow-500/30";
//         if (rank === 2) return "bg-gradient-to-r from-gray-400/20 to-gray-500/10 border-gray-400/30";
//         if (rank === 3) return "bg-gradient-to-r from-amber-600/20 to-amber-700/10 border-amber-600/30";
//         return "";
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
//            <Navbar/>
//             <div className="max-w-7xl mt-5 mx-auto">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <div className="flex items-center space-x-3 mb-2">
//                         <Trophy className="w-8 h-8 text-green-400" />
//                         <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
//                             Leaderboard
//                         </h2>
//                     </div>
//                     <p className="text-gray-400 ml-11">Top performers ranked by total score</p>
//                 </div>

//                 {/* User Stats Card (if logged in) */}
//                 {currentUserRank && (
//                     <div className="mb-6 bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm">
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-4">
//                                 <div className="bg-green-500/20 rounded-full p-3">
//                                     <Award className="w-6 h-6 text-green-400" />
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-gray-400">Your Rank</p>
//                                     <p className="text-2xl font-bold text-green-400">#{currentUserRank.rank}</p>
//                                 </div>
//                             </div>
//                             <div className="text-right">
//                                 <p className="text-sm text-gray-400">Total Score</p>
//                                 <p className="text-2xl font-bold text-white">{currentUserRank.total}</p>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Leaderboard Table */}
//                 <div className="bg-gray-900/50 border border-green-500/20 rounded-xl overflow-hidden backdrop-blur-sm shadow-2xl">
//                     <div className="overflow-x-auto scrollbar-hide relative">
//                         <table className="w-full">
//                             <thead>
//                                 <tr className="bg-green-500/10 border-b border-green-500/20">
//                                     <th className="px-6 py-4 text-left text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Rank
//                                     </th>
//                                     <th className="px-6 py-4 text-left text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Player
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 1
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 2
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 3
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 4
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 5
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 6
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 7
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 8
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 9
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 10
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 11
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 12
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 13
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 14
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 15
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 16
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 17
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 18
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 19
//                                     </th>
//                                     <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">
//                                         Score 20
//                                     </th>
//                                    <th className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider sticky right-0 bg-[#0f172a] z-20">
//     Total
// </th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-green-500/10">
//                                 {currentRows.map((row, index) => {
//                                     const isCurrentUser = row.username === user?.username;
//                                     const isTopThree = row.rank <= 3;
                                    
//                                     return (
//                                         <tr
//                                             key={row.id}
//                                             className={`
//                                                 transition-all duration-200 hover:bg-green-500/5
//                                                 ${isCurrentUser ? "bg-green-500/10 border-l-4 border-green-500" : ""}
//                                                 ${isTopThree && !isCurrentUser ? `${getRankBgColor(row.rank)} border-l-4` : ""}
//                                             `}
//                                         >
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <div className="flex items-center space-x-3">
//                                                     {getRankIcon(row.rank)}
//                                                     <span className={`text-lg font-bold ${
//                                                         row.rank === 1 ? "text-yellow-400" :
//                                                         row.rank === 2 ? "text-gray-300" :
//                                                         row.rank === 3 ? "text-amber-600" :
//                                                         "text-gray-400"
//                                                     }`}>
//                                                         #{row.rank}
//                                                     </span>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <div className="flex items-center space-x-3">
//                                                     <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
//                                                         <span className="text-green-400 font-semibold text-sm">
//                                                             {row.username.charAt(0).toUpperCase()}
//                                                         </span>
//                                                     </div>
//                                                     <span className={`font-medium ${
//                                                         isCurrentUser ? "text-green-400" : "text-white"
//                                                     }`}>
//                                                         {row.username}
//                                                         {isCurrentUser && (
//                                                             <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
//                                                                 You
//                                                             </span>
//                                                         )}
//                                                     </span>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col1}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col2}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col3}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col4}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{row.col5}</td>
//                                             <td className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider sticky right-0 bg-[#0f172a] z-20">
//                                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-500/20 text-green-400 border border-green-500/30">
//                                                     {row.total}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}

//                                 {/* If user not on this page, show their row at bottom */}
//                                 {!isUserOnCurrentPage && currentUserRank && (
//                                     <>
                                        

//                                         <tr className="bg-green-500/10 border-l-4 border-green-500 border-t-2 border-t-green-500/30">
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <div className="flex items-center space-x-3">
//                                                     <span className="text-lg font-bold text-gray-400">
//                                                         #{currentUserRank.rank}
//                                                     </span>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <div className="flex items-center space-x-3">
//                                                     <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
//                                                         <span className="text-green-400 font-semibold text-sm">
//                                                             {currentUserRank.username.charAt(0).toUpperCase()}
//                                                         </span>
//                                                     </div>
//                                                     <span className="font-medium text-green-400">
//                                                         {currentUserRank.username}
//                                                         <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
//                                                             You
//                                                         </span>
//                                                     </span>
//                                                 </div>
//                                             </td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col1}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col2}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col3}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col4}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
//                                             <td className="px-6 py-4 text-center text-gray-300">{currentUserRank.col5}</td>
                                           
                                           
//                                             <td className="px-6 py-4 text-center text-xs font-semibold text-green-400 uppercase tracking-wider sticky right-0 bg-[#0f172a] z-20"F>
//                                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-500/20 text-green-400 border border-green-500/30">
//                                                     {currentUserRank.total}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     </>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>

//                 {/* Pagination */}
//                 <div className="flex justify-center items-center mt-6 space-x-4 pb-5">
//                     <button
//                         disabled={currentPage === 1}
//                         onClick={() => setCurrentPage((prev) => prev - 1)}
//                         className="flex cursor-pointer items-center space-x-2 px-5 py-2.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
//                     >
//                         <ChevronLeft className="w-4 h-4" />
//                         <span className="font-medium">Previous</span>
//                     </button>

//                     <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-green-500/20 rounded-lg">
//                         <span className="text-gray-400">Page</span>
//                         <span className="text-green-400 font-bold">{currentPage}</span>
//                         <span className="text-gray-400">of</span>
//                         <span className="text-white font-bold">{totalPages}</span>
//                     </div>

//                     <button
//                         disabled={currentPage === totalPages}
//                         onClick={() => setCurrentPage((prev) => prev + 1)}
//                         className="flex cursor-pointer items-center space-x-2 px-5 py-2.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg hover:bg-green-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
//                     >
//                         <span className="font-medium">Next</span>
//                         <ChevronRight className="w-4 h-4" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }