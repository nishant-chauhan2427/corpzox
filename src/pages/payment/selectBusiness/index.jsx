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


    const field = dynamicForm[index];
    field.value[0] = newValue;
    setDynamicForm([...dynamicForm]);
  }
  const handleCheckBoxValueChange = (index, newValue) => {
    // console.log("handleCheckBoxValueChange: ", index, newValue);


    const field = dynamicForm[index];
    field.value = newValue;
    setDynamicForm([...dynamicForm]);
  }

  const handleSubmit = async () => {
    // console.log("values:--------------");
    const formData = dynamicForm?.map((field) => {
      const { value } = field;
      // console.log({
      //   attributeId:field._id,
      //   value: value,
      //   fileName: (value instanceof File)? value.name : field.lebel,
      //   type: (value instanceof File)? value.type : field.inputType
      // });

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
      const savePromises = Object.entries(formData).map(([key, payload]) => {

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;

        if (!token) {
          return rejectWithValue("No token found");
        }

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
      toast.success("Form Saved")
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsSaving(false);
    }

  }

  if (loading) return <FormShimmer className={"m-3"} count={6} />

  const fieldStyle = "my-2 hover:shadow-md hover:border-l-4 hover:rounded-lg hover:border-green-500 hover:border transition-all";

  return (
    <div className='flex flex-col'>
      {dynamicForm?.map((field, idx) => {
        switch (field.inputType) {
          case "text":
            return <InputField key={idx} onChange={handleInputValueChange} index={idx} field={field} className={fieldStyle} />;
          case "paragraph":
            return <ParagraphField key={idx} onChange={handleInputValueChange} index={idx} field={field} className={fieldStyle} />;
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
        disabled={dynamicForm?.some((field) => field.error === true) || isSaving}
        className={" py-2 "}
        onClick={handleSubmit}
      >
        {isSaving?"Saving...":"Submit"}
      </Button>
    </div>
  )
}

export default SelectBusiness

