// src/FileUpload.tsx
import React, { useState, ChangeEvent } from 'react';

interface FileUploadProps {
  onFileUpload: (data: ProjectLifecycle[]) => void;
}

interface ProjectLifecycle {
  name: string;
  phases: Phase[];
}

interface Phase {
  name: string;
  stages: Stage[];
}

interface Stage {
  name: string;
  prerequisites: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const readFile = async (file: File): Promise<ProjectLifecycle> => {
    try {
      const content = file.text();
      const parsedData: ProjectLifecycle = JSON.parse(await content);
      return parsedData;
    } catch (error) {
      console.error('Error reading file:', error);
      throw new Error('Error reading file. Please try again.');
    }
  };

  const uploadFiles = async () => {
    if (!files || files.length === 0) {
      alert('Please select at least one file');
      return;
    }

    try {
      const jsonData: ProjectLifecycle[] = [];

      for (let i = 0; i < files.length; i++) {
        const parsedData = readFile(files[i]);
        jsonData.push(await parsedData);
      }

      onFileUpload(jsonData);
    } catch (error) {
      console.error('Error reading files:', error);
      alert('Error reading files. Please try again.');
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} accept=".json" multiple />
      <button onClick={uploadFiles}>Upload</button>
    </div>
  );
};

export default FileUpload;
