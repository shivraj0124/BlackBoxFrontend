import { useEffect, useState } from "react";
import FileExplorer from "../components/FileExplorer";
import { Modal } from "../components/FileExplorer";
import { fileStructure } from "../data/fileStructure";
import axios from "axios";
const FileExplorerPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilePath, setSelectedFilePath] = useState(null);

  const [filesData, setFilesData] = useState([]);
  useEffect(() => {
    const getUnlockedFiles = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/unlocked-files`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setFilesData(response.data.files);
      } catch (error) {
        console.error(error);
      }
    };

    getUnlockedFiles();
  }, [selectedFile]);
  return (
    <>

      <FileExplorer
        data={fileStructure}
        filesData={filesData}
        onFileClick={(fileName) => setSelectedFile(fileName)}
        onFileClick2={(filepath) => setSelectedFilePath(filepath)}
      />

      {selectedFile && selectedFilePath && (
        <Modal
          fileName={selectedFile}
          filepath={selectedFilePath}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </>
  );
};

export default FileExplorerPage;