import React, { useEffect } from "react";
import { Heading } from "../../../components/heading";
import { Search } from "../../../components/search";
import { useDispatch, useSelector } from "react-redux";
import { FolderListShimmer } from "../../../components/loader/FolderDataShimmer";
import { NoData } from "../../../components/errors/noData";
import DocumentViewer from "./Components";
import { useParams } from "react-router-dom";
import { getfolderData } from "../../../redux/actions/document-action";
import { list } from "postcss";

const DocumentDetail = () => {
    const { isDocumentLoading, listData = [] } = useSelector((state) => state.document);
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

    return (
        <>
        
        <div>
            {isDocumentLoading ? (
                <FolderListShimmer />

            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <Heading backButton={true}>Document Detail</Heading>
                        <div className="flex items-center gap-2">
                            {url  ? (<Search placeholder={"Search Files"} />):<></>}
                            {/* <Search placeholder={"Search Files"} /> */}
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
        </>
   
    );
};

export default DocumentDetail;