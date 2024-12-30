import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import client from '../../redux/axios-baseurl';
import toast from 'react-hot-toast';

function FileField({ index, field, className, onChange }) {
  const { lebel, isRequired } = field;
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(field?.value[0] || '');
  //   console.log("uploadedUrl",uploadedUrl);


  const handleChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setUploading(true); // Set uploading state

    try {
      const formData = new FormData();
      formData.append('files', file);

      // console.log("formDataaaaaaaaaaaaaaaaa",formData.get("files"));
      // const fileType = file?.type.split("/")[1];
      // console.log("File Type:", fileType);

      let fileType = '';
      let type = file?.type.split("/")[1];
      if (type == 'avif' || type == 'jpeg' || type == 'jpg' || type == 'png' || type == 'svg' || type == 'svg+xml' || type == 'webp') {
        fileType = 'image'
      } else if (type == 'wav' || type == 'webm' || type == 'mpeg' || type == 'ogg' || type == '3gpp') {
        fileType = 'audio'
      } else if (type == 'x-msvideo' || type == 'mp4' || type == 'mp2t' || type == 'webm') {
        fileType = 'video'
      } else if (type == 'zip' || type == 'vnd.ms-excel' || type == 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' || type == 'vnd.openxmlformats-officedocument.presentationml.presentation' || type == 'nd.ms-powerpoint' || type == 'pdf' || type == 'vnd.oasis.opendocument.presentation' || type == 'x-freearc' || type == 'vnd.openxmlformats-officedocument.wordprocessingml.document' || type == 'msword' || type == 'csv' || type == 'json') {
        fileType = 'document'
      }

      // console.log("fileType",fileType);
      


      // Axios POST request to upload the file
      const userInfo = (localStorage.getItem('userInfo'));
      const token = userInfo?.token;
      console.log("token",token);
      
      if (!token) {
        // return rejectWithValue("No token found");
        toast.error("Token not found");
        return ;
      }

      const response = await client.put('/user/auth/upload-file', formData, {
        headers: {
          // Accept: "application/json",
          // "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        }
      });

      // console.log("response:",response.data);


      const fileUrl = response.data?.data?.url; // Adjust based on your API's response structure
      setUploadedUrl(fileUrl);
      onChange(index, { fileUrl: fileUrl, filename: formData.get("files")?.name,fileType:fileType }); // Pass the uploaded file URL to the parent
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  return (
    <div className={`border rounded-md p-2 ${className}`}>
      {lebel && <p className="mb-1">{lebel} {isRequired ? <span className='text-red-600'>*</span> : ""} </p>}
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
