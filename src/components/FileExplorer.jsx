import { use, useEffect, useState } from "react";
import { ChevronRight, ChevronDown, Folder, File, AlertTriangle, FolderOpen, Copy, Check, Lock } from "lucide-react";
import Navbar from "./Navbar";
import axios from "axios";
import toast from "react-hot-toast";
const FileExplorer = ({ data, filesData, onFileClick, onFileClick2 }) => {
  return (
    <>
      <Navbar />
    <div className="mt-10 pt-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">

      <div className=" max-w-5xl mx-auto bg-gray-900/50 border border-green-500/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">

        {/* Header */}
        <div className=" bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-b border-green-500/20 px-6 py-5">
          <h2 className="text-2xl font-bold text-green-400 flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Folder className="w-6 h-6 text-green-400" />
            </div>
            File Explorer
          </h2>
          <p className="text-gray-400 text-sm mt-1 ml-14">Browse and select files</p>
        </div>

        {/* File Tree */}
        <div className="p-6">
          {data?.length > 0 ? (
            data.map((item, index) => (
              <FileItem
                key={index}
                item={item}
                filesData={filesData}
                onFileClick={onFileClick}
                onFileClick2={onFileClick2}
                level={0}
                parentPath=""
              />
            ))
          ) : (
            <div className="text-center py-12">
              <Folder className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">No files to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

const FileItem = ({ item, filesData, onFileClick, onFileClick2, level, parentPath }) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [newPath, setNewPath] = useState(parentPath
    ? `${parentPath}/${item.name}`
    : item.name)

  const currentPath = parentPath
    ? `${parentPath}/${item.name}`
    : item.name;


  const handleCopy = async (e) => {
    e.stopPropagation(); // prevent file click
    await navigator.clipboard.writeText(currentPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClick = (url) => {
    if (!url) {
      onFileClick(item.name);
      onFileClick2(currentPath);
    }
  }

  const matchedFile = filesData.find(
    (file) => file.path === currentPath
  );



  const isUnlocked = filesData.some(
    (file) => file.path === currentPath
  );

  // ================= FOLDER =================
  if (item.type === "folder") {
    return (
      <div className="my-0.5">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
          transition-all duration-200 border border-transparent
          ${isHovered
              ? 'bg-green-500/10 border-green-500/30 shadow-lg shadow-green-500/5'
              : 'hover:bg-gray-800/50'
            }`}
          style={{ marginLeft: `${level * 24}px` }}
          onClick={() => setOpen(!open)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {open ? (
            <ChevronDown className="w-4 h-4 text-green-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}

          {open ? (
            <FolderOpen className="w-5 h-5 text-green-400" />
          ) : (
            <Folder className="w-5 h-5 text-gray-400" />
          )}

          <span className={`font-medium ${open ? 'text-green-400' : 'text-gray-300'}`}>
            {item.name}
          </span>
        </div>

        {item.children && open && (
          <div className="border-l-2 border-green-500/20 ml-6 mt-1">
            {item.children.map((child, index) => (
              <FileItem
                key={index}
                item={child}
                filesData={filesData}
                onFileClick={onFileClick}
                onFileClick2={onFileClick2}
                level={level + 1}
                parentPath={currentPath}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ================= FILE =================
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer
  transition-all duration-200 border border-transparent
  ${isHovered
          ? "bg-green-500/5 border-green-500/20 translate-x-1 shadow-md shadow-green-500/5"
          : "hover:bg-gray-800/30"
        }`}
      style={{ marginLeft: `${level * 24 + 30}px` }}
      onClick={() => handleClick(matchedFile?.url)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <File className={`w-4 h-4 ${isHovered ? "text-green-400" : "text-gray-500"}`} />

      <span
        className={`text-sm flex-1 ${isHovered ? "text-green-400" : "text-gray-400"
          }`}
      >
        {item.name}
      </span>

      {/* OPEN BUTTON */}
      {matchedFile?.url && (
        <a
          href={matchedFile.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs px-3 py-1 rounded-md bg-blue-500/10 
                 text-blue-400 hover:bg-blue-500/20 
                 transition font-medium"
        >
          Open
        </a>
      )}

      {/* COPY BUTTON */}
      <button
        onClick={handleCopy}
        className="p-1 cursor-pointer rounded hover:bg-green-500/20 transition"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400 hover:text-green-400" />
        )}
      </button>
    </div>


  );
};


const Modal = ({ fileName, filepath, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  // console.log("Modal Props:", fileName, filepath);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };


  const openFile = async (filepath) => {
    try {

      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/open-file`,
        { filepath },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      // console.log("File opened successfully:", response.data);

      if (response.data) {
        try {
          const penaltyResponse = await axios.post(
            `${import.meta.env.VITE_API_URL}/penalty`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              },
            }
          );

          if (penaltyResponse.status === 200) {
            toast.success(`Penalty applied! New Total: ${penaltyResponse.data.total}`);
            // console.log("Penalty applied:", penaltyResponse.data);
          }
        } catch (penaltyError) {
          // console.error("Error applying penalty:", penaltyError);
          toast.error("Failed to apply penalty");
        }
      }
      if (response.data) {

      }

      // toast.success("File opened successfully:");
      handleClose(false)

    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || "Request failed");
      }
      throw error;
    }
  };

  return (
    <div
      className={`
        fixed inset-0 bg-black/80 backdrop-blur-md
        flex justify-center items-center z-50
        transition-opacity duration-200
        ${isClosing ? 'opacity-0' : 'opacity-100'}
      `}
      onClick={handleClose}
    >
      <div
        className={`
          bg-gray-900 border border-green-500/30 rounded-2xl shadow-2xl 
          w-full max-w-md mx-4
          transform transition-all duration-300
          ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Warning Icon */}
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-amber-500/20 rounded-full border-2 border-amber-500/30">
            <AlertTriangle className="w-10 h-10 text-amber-400" />
          </div>

          {/* Title */}
          <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-3">
            Warning
          </h3>

          {/* Description */}
          <p className="text-center text-gray-400 mb-4">
            A penalty will be applied when opening:
          </p>

          {/* File Name Display */}
          <div className="bg-gray-800/50 border border-green-500/20 rounded-xl px-5 py-4 mb-6 backdrop-blur-sm">
            <p className="text-center font-semibold text-green-400 break-all">
              {fileName}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="
                flex-1 py-3 px-6 cursor-pointer rounded-xl font-semibold
                bg-gray-800 border border-gray-700
                text-gray-300
                hover:bg-gray-750 hover:border-gray-600
                active:scale-95
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900
              "
            >
              Cancel
            </button>

            <button
              onClick={() => openFile(filepath)}
              className="
                flex-1 py-3 px-6  cursor-pointer rounded-xl font-semibold
                bg-gradient-to-r from-green-500 to-emerald-600
                text-black shadow-lg shadow-green-500/20
                hover:from-green-400 hover:to-emerald-500
                active:scale-95
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900
              "
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FileExplorer, Modal };
export default FileExplorer;