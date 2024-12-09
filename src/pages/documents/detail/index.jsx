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
    const url = listData?.[0]?.value?.[0];

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

                    {listData.length > 0 && url ? (
                        listData.map((item, index) => {
                            if (item?.value && Array.isArray(item.value)) {
                                return item.value.map((docValue, docIndex) => (
                                    <DocumentViewer
                                        key={`${index}-${docIndex}`} // Adding a unique key for each item
                                        docUrl={docValue} // Use the individual value from item.value
                                        docName={item?.lebel || `Document ${docIndex + 1}`} // Fallback for label if not available
                                    />
                                ));
                            } else {
                                return <NoData key={index} />;
                            }
                        })
                    ) : (
                        <NoData /> 
                    )}
                </>
            )}
        </div>
        </>
   
    );
};

export default DocumentDetail;