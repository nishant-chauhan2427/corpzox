import React, { useEffect } from "react";
import { Heading } from "../../../components/heading";
import { Search } from "../../../components/search";
import { useDispatch, useSelector } from "react-redux";
import { DocumentListShimmer } from "../../../components/loader/DocumentListShimmer";
import { NoData } from "../../../components/errors/noData";
import DocumentViewer from "./Components";
import { useParams } from "react-router-dom";
import { getfolderData } from "../../../redux/actions/document-action";
import { FolderListShimmer } from "../../../components/loader/FolderDataShimmer";



const DocumentDetail = () => {
    const { isdocumentLoading, listData = [] } = useSelector(
        (state) => state.document
    );
    //console.log(listData, "list data")
    const dispatch = useDispatch();
    const { id } = useParams(); 
    const url = listData[0]?.value[0];
    const name = listData[0]?.lebel
    //const count
    //console.log(listData.value[0],"123");`
    useEffect(() => {
        if (id) {
          dispatch(getfolderData(id));   
        }
      }, [dispatch, id]);
    //console.log(url, "url")
    return (
        <div>
            {isdocumentLoading ? (
                <FolderListShimmer/>
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <Heading backButton={true}>Document Detail</Heading>
                        <div className="flex items-center gap-2">
                            <Search placeholder={"Search Files"} />
                        </div>
                    </div>


                    {listData.length > 0 && url  ? (
                        // 
                        <DocumentViewer docUrl={url} docName={name}/>
                    ) : (
                        <NoData></NoData>
                    )}
                </>
            )}
        </div>
    );
};

export default DocumentDetail;
