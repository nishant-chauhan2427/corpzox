import React, { useState } from 'react';

function FileField({ index, field, className, onChange }) {
  const { lebel } = field;
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onChange(index, file); // Pass the selected file to the parent
  };

  return (
    <div className={`border rounded-md p-2 ${className}`}>
      {lebel && <p className="mb-1">{lebel}</p>}
      <input
        type="file"
        onChange={handleChange}
        className="w-full p-2"
      />
      {selectedFile && (
        <p className="mt-2 text-sm text-gray-600">
          Selected file: {selectedFile.name}
        </p>
      )}
    </div>
  );
}

export default FileField;
