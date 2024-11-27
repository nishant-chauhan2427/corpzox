import React from "react";
import { Heading } from "../../../components/heading";
import { useSelector } from "react-redux";
import { DocumentListShimmer } from "../../../components/loader/DocumentListShimmer";

const DocumentDetail = () => {
  const { isdocumentLoading, listData = [] } = useSelector(
    (state) => state.document
  );
  console.log(listData ,"listData 12");
  return (
    <div>
      {isdocumentLoading ? (
        <DocumentListShimmer></DocumentListShimmer>
      ) : (
        <>
          <Heading backButton={true}>Document Detail</Heading>
       
          {listData.length > 0 ? (
            listData.map((file, index) => (
              <div key={index} className="file-item">
                {file.type === "image" && (
                  <div className="image-file">
                    <img src={file?.value?.[0]} alt={file.label} />
                    <p>{file.lebel}</p>
                  </div>
                )}
                {file.type === "pdf" && (
                  <div className="pdf-file">
                    <iframe
                      src={file.url}
                      width="10%"
                      height="10%"
                      title={file.label}
                    ></iframe>
                    <p>{file.label}</p>
                  </div>
                )}
                {file.type === "video" && (
                  <div className="video-file">
                    <video width="100%" height="auto" controls>
                      <source src={file.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <p>{file.label}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No documents available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default DocumentDetail;
