import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/buttons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinValidationSchema } from "../../../validation/authValidatiorSchema";
import { Input } from "../../../components/inputs";
import { Heading } from "../../../components/heading";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/actions/dashboard-action";
import { submitEditProfile, updateProfilePicture } from "../../../redux/actions/profile-actions";
import { profileValidationSchema } from "./editProfileValidationSchema";
import Cropper from "react-easy-crop";


const getCroppedImg = async (imageSrc, crop, pixelCrop) => {
  const image = new Image()
  image.crossOrigin = 'anonymous' // Enable CORS
  image.src = imageSrc

  await new Promise((resolve) => {
    image.onload = resolve
  })

  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob))
    }, 'image/jpeg')
  })
}

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.profile);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState(user?.profile_picture_url || "/images/profile/profile.svg");
  const [imageFile, setImageFile] = useState(null); 
  const [croppedImage, setCroppedImage] = useState(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(profileValidationSchema),
    mode: "onChange", 
  });

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };
console.log(user,"PICTURE");

  const onSubmit = (data) => {

    const formData = new FormData();
    if (imageFile) {
     // console.log(imageFile.name,"imageFile PICTURE");
      
      formData.append("profile_picture_url", imageFile.name); 
    }
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("businessEmail", data.businessEmail);
    dispatch(submitEditProfile({ formData, navigate }));
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("file",file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); 
        setImageFile(file); 
      };
      reader.readAsDataURL(file);
      
    }
  };

const url = user?.profile_picture_url

  const handleSave = async () => {
    //console.log("1234567");
    dispatch(updateProfilePicture(file, navigate));
    if (croppedAreaPixels) {
     
      const croppedImg = await getCroppedImg(
        url,
        crop,
        croppedAreaPixels
      )
      setCroppedImage(croppedImg)
    }
  }



  useEffect(() => {
    const str = user.name || '';
    let data = [];
    const spaceIndex = str.indexOf(' ');

    if (spaceIndex !== -1) {
      const firstName = str.substring(0, spaceIndex);
      const lastName = str.substring(spaceIndex + 1);
      data = [firstName, lastName];
    } else {
      data = [str, ''];
    }

    setValue("firstName", data[0]);
    setValue("lastName", data[1]);
    setValue("email", user?.email);
    setValue("businessEmail", user?.busniessEmail || "");
  }, [user]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Heading title={"Payment"} backButton={true}>
          Edit Profile
        </Heading>
        <div className="flex shadow-md bg-[#F4F9FF] border px-4 rounded-2xl py-10 border-[#DFEAF2]">
          <div className="flex sm:flex-row flex-col w-full items-center gap-4">
            <div className="relative w-1/6" style={{ width: '300px', height: '200px' }}>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                
              />
            </div>

            <div className="text-center mt-2">
              <label
                htmlFor="image-upload"
                className="text-[#171717] text-sm font-medium cursor-pointer"
              >
                Update
              </label>
              
              
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                
              />
            </div>

            <button onClick={handleSave} className="save-button">
          Saved
        </button>



          </div>

        
          <div className="flex flex-col gap-4 w-full">
            <p className="text-[#171717] font-medium text-lg">Basic Details</p>
            <div className="sm:w-[70%] flex gap-4 flex-col">
              <div className="flex flex-row gap-4">
                <div className="w-full">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={"First Name"}
                        type={"text"}
                        placeholder={"First Name"}
                        className={"border-[#D9D9D9] border"}
                        errorContent={errors?.firstName?.message}
                        maxLength={30}
                      />
                    )}
                  />
                </div>
                <div className="w-full">
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={"Last Name"}
                        type={"text"}
                        placeholder={"Last Name"}
                        className={"border-[#D9D9D9] border"}
                        errorContent={errors?.lastName?.message}
                        maxLength={30}
                      />
                    )}
                  />
                </div>
              </div>
              <div>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={"Email id"}
                      type={"email"}
                      placeholder={"Email id"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.email?.message}
                      disabled={true}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="businessEmail"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      label={"Business Email id"}
                      type={"email"}
                      placeholder={"Business Email id"}
                      className={"border-[#D9D9D9] border"}
                      errorContent={errors?.businessEmail?.message}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <Button disabled={!isValid} primary={true} isLoading={loading}>
         Save
        </Button>
      </form>
    </>
  );
};

export default Edit;
