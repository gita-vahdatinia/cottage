// src/App.tsx
import React, { useState } from 'react';
import FileUpload from './FileUpload';

function App() {
  const [output, setOutput] = useState<any | null>(null);

  const handleFileUpload = (data: any) => {
    setOutput(data);
  };

  return (
    <div>
      <h1>Cottage Project UI</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {output && (
        <div>
          <h2>Output:</h2>
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

