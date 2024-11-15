import { useState } from "react";
import { LinkButton } from "../../../components/link";
import { IoMdAddCircle } from "react-icons/io";
import { Search } from "../../../components/search";
import { Selector } from "../../../components/select";

const DocumentsListing = () => {
  const servicesOptions = [
    { label: "Fractional CFO Services", value: "fcs" },
    { label: "Sole Proprietorship", value: "sc" },
  ];

  const folders = [
    {
      name: "Folder",
      files: [
        { name: "Sample Image", url: "/icons/documents/image-sample.svg", type: "image" },
        { name: "Sample Video", url: "/icons/documents/video-sample.mp4", type: "video" },
        { name: "Sample PDF", url: "/pdf/documents/sample-pdf.pdf", type: "pdf" },
      ],
    },
  ];

  return (
    <div>
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <p className="flex items-center gap-4 font-semibold text-xl text-[#0A1C40]">
          Documents
          <span>
            <img src="/icons/dashboard/take-a-tour.svg" alt="" />
          </span>
        </p>
        <div className="flex items-center gap-2">
          
          <Search placeholder={"Search Files"} />
        </div>
      </div>

      {/* Filter */}
      <div>
        <Selector
          className={"w-fit"}
          label={"Folders"}
          placeholder={"Select Services"}
          options={servicesOptions}
        />
      </div>
      {/* Folders and files */}
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {folders.map((data, index) => (
          <Folder key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default DocumentsListing;

const Folder = ({ data }) => {
  const [folder, setFolder] = useState(false);

  return (
    <>
      {!folder ? (
        <div
          onClick={() => setFolder(true)}
          className="relative bg-[#F2F2F2] px-4 py-2 flex justify-between items-center gap-4 border rounded"
        >
          <div className="flex items-center gap-4 ">
            <img src="/icons/documents/folder.svg" alt="folder-icon" />
            <p className="font-semibold text-xs">{data.name}</p>
          </div>
          <button>
            <img src="/icons/documents/three-dots.svg" alt="folder-icon" />
          </button>
        </div>
      ) : (
        <>
          {data?.files.map((file, index) => (
            <div key={index} className="file-item">
              {file.type === "image" && (
                <div className="image-file">
                  <img src={file.url} alt={file.name} className="w-full h-auto" />
                  <p>{file.name}</p>
                </div>
              )}
              {file.type === "pdf" && (
                <div className="pdf-file">
                  <iframe src={file.url} width="100%" height="200px" title={file.name}></iframe>
                  <p>{file.name}</p>
                </div>
              )}
              {file.type === "video" && (
                <div className="video-file">
                  <video width="100%" height="auto" controls>
                    <source src={file.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <p>{file.name}</p>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
};
