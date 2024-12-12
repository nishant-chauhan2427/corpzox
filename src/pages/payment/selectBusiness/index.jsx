// import React, { useState } from "react";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { Link } from "react-router-dom";
// import { Controller, useForm } from "react-hook-form";
// import { Input } from "../../../components/inputs";
// import { Selector } from "../../../components/select";
// import { Button } from "../../../components/buttons";
// import BusinessDetails from "./components/business";
// import Documents from ".//components/documents";
// import { Heading } from "../../../components/heading";
// const SelectBusiness = () => {
//   const {
//     handleSubmit,
//     control,
//     formState: { errors, isValid },
//     setValue,
//     watch,
//   } = useForm({
//     // resolver: yupResolver(),
//     mode: "onChange",
//     defaultValues: {},
//   });

//   const selectBusiness = [
//     { label: "Reyan Ventures", value: "Reyan" },
//     { label: "Education Sector", value: "Education" },
//     { label: "Real Estate", value: "Estate" },
//     { label: "Finance", value: "Finance" },
//     { label: "Technology", value: "Technology" },
//     { label: "Health Sector", value: "Health" },
//     { label: "Education Sector", value: "Education" },
//   ];

//   const documentPoints = [
//     {
//       point: "The Aadhaar card image should include both front and back sides.",
//     },
//     {
//       point: "PAN card should include your signature.",
//     },
//     {
//       point: "Do not upload photocopies.",
//     },
//     {
//       point:
//         "Address proof can be your Aadhaar card, driving license, or electricity bill.",
//     },
//     {
//       point:
//         "All documents must be uploaded as PDF files, with a maximum file size of 20KB each.",
//     },
//   ];
//   const previewPdf = [
//     {
//       view: "View",
//     },
//     {
//       view: "View",
//     },
//     {
//       view: "View",
//     },
//   ];

//   return (
//     <>
//       <div className="flex flex-col  gap-4 py-4">

//         <div>
//           <div className="grid sm:grid-cols-2 grid-cols-1 pb-2 ">
//             <Controller
//               name={`selectBusiness`}
//               control={control}
//               render={({ field }) => (
//                 <Selector
//                   {...field}
//                   label={"Select Business"}
//                   placeholder={"Select Business"}
//                   errorContent={errors.industryType?.message}
//                   options={selectBusiness}
//                   // required={true}
//                 />
//               )}
//             />
//           </div>
//           <Documents control={control} errors={errors} />
//           <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 sm:w-[60%] pt-5">
//             {previewPdf.map((data, index) => (
//               <div
//                 key={index}
//                 className="flex bg-[#7676801F] pt-12 rounded gap-2  pb-4 py-4 flex-col justify-center items-center"
//               >
//                 <img
//                   src="/images/payment/pdf-preview.svg"
//                   width={100}
//                   alt=""
//                 />
//                 <Link className="text-[#007AFF] font-normal text-base underline">
//                   {data.view}
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div>
//           <ul className="list-disc pl-5">
//             {documentPoints.map((data, index) => (
//               <li
//                 className="font-normal text-[13px]  text-[#0A1C40CC]"
//                 key={index}
//               >
//                 {data.point}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <BusinessDetails control={control} errors={errors} />
//       </div>
//     </>
//   );
// };
// export default SelectBusiness;




import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import client from '../../../redux/axios-baseurl';
import InputField from '../../../components/dynamicFormFields/InputField';
import RadioField from '../../../components/dynamicFormFields/RadioField';
import DropdownField from '../../../components/dynamicFormFields/DropdownField';
import CheckBoxField from '../../../components/dynamicFormFields/CheckBoxField';
import ParagraphField from '../../../components/dynamicFormFields/ParagraphField';
import FileField from '../../../components/dynamicFormFields/FileField';
import { FormShimmer } from '../../../components/loader/FormShimmer';
import { Button } from '../../../components/buttons/button';
import toast from 'react-hot-toast';
import { body } from 'framer-motion/client';
import axios from 'axios';

function SelectBusiness() {

  const { applicationId } = useParams();
  // console.log("applicationId", applicationId);

  const [dynamicForm, setDynamicForm] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  const [allBusiness, setAllBusiness] = useState(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState( null);

  const handleBusinessChange = (event) => {
    setSelectedBusinessId(event.target.value);
  };
// console.log("selectedBusinessId",dynamicForm?dynamicForm[0]?.userapplications[0]?.businessId :"no id");
// console.log("selectedBusinessId",selectedBusinessId);


  // console.log("loading", loading);
  // console.log("dynamicForm", dynamicForm);




  useEffect(() => {
    const fetchDynamicForm = async () => {
      try {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;

        if (!token) {
          return rejectWithValue("No token found");
        }

        const response = await client.get("/application/application-purchased-form", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          params: {
            applicationId: applicationId
          }
        });
        setDynamicForm(response.data?.data);
        setSelectedBusinessId(response.data?.data  ?  response.data?.data[0]?.userapplications[0]?.businessId : null)

      } catch (err) {
        console.log(err, "get offer list error");
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDynamicForm();
  }, []);


  const handleInputValueChange = (index, newValue) => {
    // console.log("handleInputValueChange: ", index, newValue);

    //Fomatting from newValue =[{name:"name1",value:"val1"}] to newValue = ["val1"]

    const field = dynamicForm[index];
    field.value[0] = newValue;

    if (field?.isRequired && (field?.value.length <= 0)) {
      field.isRequiredMsg = "Required field";
    } else {
      field.isRequiredMsg = false;
    }

    setDynamicForm([...dynamicForm]);
  }

  const handleInputValueChangeV2 = (index, newValue, err) => {
    // console.log("handleInputValueChangeV2: ", index, newValue,err);
    const field = dynamicForm[index];
    field.value[0] = newValue;
    field.error = err;

    if (field?.isRequired && (field?.value.length <= 0 || field?.value[0]?.trim() === "")) {
      field.isRequiredMsg = "Required field";
    } else {
      field.isRequiredMsg = false;
    }


    setDynamicForm([...dynamicForm]);
  }

  const handleCheckBoxValueChange = (index, newValue) => {
    // console.log("handleCheckBoxValueChange: ", index, newValue);


    const field = dynamicForm[index];
    field.value = newValue;

    if (field?.isRequired && (field?.value.length <= 0)) {
      field.isRequiredMsg = "Required field";
    } else {
      field.isRequiredMsg = false;
    }

    setDynamicForm([...dynamicForm]);
  }

  const handleSubmit = async () => {

    if(!selectedBusinessId){
      toast.error("Please select business");
      return;
    }
    // console.log("values:--------------");
    const formData = dynamicForm?.map((field) => {
      const { value } = field;
      return {
        attributeId: field._id,
        value: value,
        fileName: (value instanceof File) ? value.name : field.lebel,
        type: (value instanceof File) ? value.type : field.inputType
      }
    })

    // console.log("formData", formData);


    try {
      // Simulate API calls for each child
      setIsSaving(true);

      //Auth
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;
      if (!token) {
          return rejectWithValue("No token found");
        }


      //Save FormData API calls
      const savePromises = Object.entries(formData).map(([key, payload]) => {
        // console.log("saved:payload",payload);

        return axios.put(`https://corpzo.onrender.com/api/application/form-value`, payload, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          }
        });

        
      });

      await Promise.all(savePromises); // Wait for all API calls to complete


      //Save selected Business API
      axios.put(`https://corpzo.onrender.com/api/application/application-business`, {
        applicationId:applicationId,
        businessId:selectedBusinessId
      }, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        }
      });
      


      toast.success("Form Saved")
    } catch (error) {
      toast.error("Error while saving form")
      console.error("Error while saving form:", error);
    } finally {
      setIsSaving(false);
    }

  }

  useEffect(() => {
    const getAllBusiness = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;

        if (!token) {
          return rejectWithValue("No token found");
        }

        const response = await client.get("/business/user-business-card", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });
        setAllBusiness(response.data?.data);
      } catch (err) {
        console.log(err, "get business list error");
        setError(err);
      } finally {
      }
    }

    getAllBusiness();
  }, []);

  if (loading) return <FormShimmer className={"m-3"} count={6} />

  const fieldStyle = "my-2 hover:shadow-md hover:border-l-4 hover:rounded-lg hover:border-green-500 hover:border transition-all";

  return (
    <div className='flex flex-col'>

      <div className='w-full my-2'>
        <select
          name="businessDropdown"
          id="businessDropdown"
          className='w-full p-3 border hover:shadow-md'
          value={selectedBusinessId}
          onChange={handleBusinessChange}
        >
          <option value="" disabled selected>Select Business</option>
          {allBusiness?.map((business) => (
            <option key={business._id} value={business._id}>
              {business.businessName}
            </option>
          ))}
        </select>
      </div>

      <hr />
      {dynamicForm?.map((field, idx) => {
        switch (field?.inputType) {
          case "short_answer":
            return <InputField key={idx} onChange={handleInputValueChangeV2} index={idx} field={field} className={fieldStyle} />;
          case "paragraph":
            return <ParagraphField key={idx} onChange={handleInputValueChangeV2} index={idx} field={field} className={fieldStyle} />;
          case "multiple_choice":
            return <RadioField key={idx} onChange={handleInputValueChange} index={idx} field={field} className={fieldStyle} />;
          case "dropdown":
            return <DropdownField key={idx} onChange={handleInputValueChange} index={idx} field={field} className={fieldStyle} />;
          case "checkboxes":
            return <CheckBoxField key={idx} onChange={handleCheckBoxValueChange} index={idx} field={field} className={fieldStyle} />;
          case "file":
            return <FileField key={idx} onChange={handleInputValueChange} index={idx} field={field} className={fieldStyle} />;
          default:
            return null;
        }
      })}

      <Button
        type="button"
        outline={true}
        primary={true}
        // disabled={(dynamicForm?.some((field,idx) => {return field.error === true})) }
        disabled={!dynamicForm || dynamicForm.length<=0 || isSaving || (dynamicForm?.some((field, idx) => field?.isRequiredMsg || field?.error === true))}
        className={" py-2 "}
        onClick={handleSubmit}
      >
        {isSaving ? "Saving..." : "Submit"}
      </Button>
    </div>
  )
}

export default SelectBusiness

