import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import client from '../../redux/axios-baseurl';

function FileField({ index, field, className, onChange }) {
  const { lebel,isRequired } = field;
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(field?.value[0]||'');
//   console.log("uploadedUrl",uploadedUrl);
  

  const handleChange = async (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    setUploading(true); // Set uploading state

    try {
      const formData = new FormData();
      formData.append('files', file);

      // console.log("formDataaaaaaaaaaaaaaaaa",formData.get("files"));
      

      // Axios POST request to upload the file
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;
      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await client.put('/user/auth/upload-file', formData,{
        headers: {
            // Accept: "application/json",
            // "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          }
      });

      // console.log("response:",response.data);
      

      const fileUrl = response.data?.data?.url; // Adjust based on your API's response structure
      setUploadedUrl(fileUrl);
      onChange(index, {fileUrl:fileUrl,filename:formData.get("files")?.name}); // Pass the uploaded file URL to the parent
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  return (
    <div className={`border rounded-md p-2 ${className}`}>
      {lebel && <p className="mb-1">{lebel} {isRequired? <span className='text-red-600'>*</span>:""} </p>}
      <input
        type="file"
        onChange={handleChange}
        className="w-full p-2"
      />
      {uploading && (
        <p className="mt-2 text-sm text-blue-600">
          Uploading...
        </p>
      )}
      {uploadedUrl && (
        <p className="mt-2 text-sm text-green-600">
          File uploaded: <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">{uploadedUrl}</a>
        </p>
      )}
    </div>
  );
}

export default FileField;
