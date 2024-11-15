import { LinkButton } from "../../../components/link";
import { IoMdAddCircle } from "react-icons/io";
import { Search } from "../../../components/search";
import { Selector } from "../../../components/select";

const DocumentsListing = () => {
  const fileTypeOptions = [
    { label: "Documents", value: "documents" },
    { label: "Image", value: "image" },
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
          <LinkButton to={"create"} primary={true} leftIcon={<IoMdAddCircle />}>
            New Document
          </LinkButton>
          <Search placeholder={"Search Files"} />
        </div>
      </div>

      {/* Filter */}
      <div>
        <Selector
          label={"Files"}
          placeholder={"File type"}
          options={fileTypeOptions}
        />
      </div>
      {/* Folders and files */}
      <div className="grid grid-cols-1 ">
        {Array.from({ length: 5 }, () => (
          <Folder />
        ))}
      </div>
    </div>
  );
};

export default DocumentsListing;

const Folder = () => {
  return (
    <div className="bg-[#F2F2F2] rounded">
      <img src="/icons/documents/folder.svg" alt="folder-icon" />
      <div></div>
    </div>
  );
};
