import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/buttons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../../components/inputs";
import { Heading } from "../../../components/heading";
import { useDispatch, useSelector } from "react-redux";
import {
  submitEditProfile,
  updateProfilePicture,
} from "../../../redux/actions/profile-actions";
import { profileValidationSchema } from "./editProfileValidationSchema";
import Cropper from "react-easy-crop";
import { ImSpinner11, ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import { LinkButton } from "../../../components/link";

// Function to get the cropped image
const getCroppedImg = async (imageSrc, crop, pixelCrop) => {
  const image = new Image();
  image.crossOrigin = "anonymous"; // Enable CORS
  image.src = imageSrc;

  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

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
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    }, "image/jpeg");
  });
};

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading, isloading ,isUpdatingImage} = useSelector((state) => state.profile);
  const { upload } = useSelector((state) => state.profile);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState(
    user?.profile_picture_url || "/images/profile/profile.svg"
  );
  const [imageFile, setImageFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);


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
    setCroppedAreaPixels(croppedAreaPixels); // Save the cropped area
  };
  //console.log(upload, "upload23");
  const onSubmit = (data) => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("profilePicture", upload);
    }
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("businessEmail", data.businessEmail);
    dispatch(submitEditProfile({ formData, navigate }));
    setIsImageChanged(false);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    console.log(file, "new file")
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should not exceed 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImageFile(file);
        setImageSelected(true); 
       
  
        // Reset crop and zoom values when a new image is selected
        setCrop({ x: 0, y: 0 });
        setZoom(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const blobToFile = (url, filename) => {
    // return new File([blob], fileName, { type: blob.type });
    let mimeType = (url.match(/^data:([^;]+);/) || "")[1];
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };
  const handleSave = async () => {
    if (croppedAreaPixels) {
      const croppedImgBlob = await getCroppedImg(
        image,
        crop,
        croppedAreaPixels
      );
      console.log("image", imageFile);
      const fileName = imageFile?.name;
      
      const croppedImgFile = await blobToFile(croppedImgBlob, fileName);
      console.log("croppedImgFile", croppedImgFile);

      // Set the file URL for preview (optional)
      setCroppedImage(croppedImgBlob);

      // Create FormData and append the file correctly
      const formData = new FormData();
      formData.append("files", croppedImgFile); // 'files' key used for the backend

      console.log("FormData before dispatch:", formData);

      // Dispatch the action with formData
      const imageUrl = await dispatch(updateProfilePicture({ formData }));
      console.log("imageUrl", imageUrl);
      
      setIsImageChanged(true);
     
    }
  };
  
  useEffect(() => {
    const str = user?.name || "";
    let data = [];
    const spaceIndex = str.indexOf(" ");

    if (spaceIndex !== -1) {
      const firstName = str.substring(0, spaceIndex);
      const lastName = str.substring(spaceIndex + 1);
      data = [firstName, lastName];
    } else {
      data = [str, ""];
    }
    //console.log(user, "user1234");
    setValue("firstName", data[0]);
    setValue("lastName", data[1]);
    setValue("email", user?.email);
    setValue("businessEmail", user?.busniessEmail || "");
  }, [user]);

  console.log(isImageChanged, "isImageChanged");
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Heading title={"Edit Profile"} backButton={true}>
          Edit Profile
        </Heading>
        <div className="flex sm:flex-row flex-col shadow-md bg-[#F4F9FF] border items-center  rounded-2xl justify-center py-10 gap-4 px-2 border-[#DFEAF2]">
          <div className="relative flex w-[30%] flex-col items-center gap-4">
            <div
              className="relative"
              style={{
                width: "180px",
                borderRadius: "50%",
                border: "1px solid white",
                height: "180px",
              }}
            >
              {croppedImage ? (
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div
                  style={{
                    width: "180px",
                    height: "180px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "relative",

                  }}
                >
                  <Cropper
                    cropShape="round"
                    image={image}
                    // objectFit="cover"
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
              )}
              <label
                htmlFor="image-upload"
                className=" absolute bottom-0  right-0 sm:bottom-2 sm:right-2 bg-black px-2 py-2 rounded-full"
              >
                <img
                  src="/icons/profile/profile-camera.svg"
                  className="h-5"
                  alt=""
                />
              </label>
            </div>

            <div className="text-center mt-2">
              {isUpdatingImage ? (
                <ImSpinner2 size={20} className="animate-spin" />
              ) : (
                // <LinkButton
                // disabled={!(setIsImageSaved)}
                //   onClick={handleSave}
                //   className="save-button  cursor-pointer text-sm font-semibold text-[#004BBC] underline"
                // >
                //   Save Photo
                // </LinkButton>

                <Button
                  //disabled={t}
                  type="button"
                  disabled={!imageSelected}
                  onClick={handleSave}
                  className="save-button cursor-pointer text-sm font-semibold text-[#004BBC] underline"
                >
                  Save Photo
                </Button>
              )}


              {/* <label
                onClick={handleSave}
                className="save-button ml-4 cursor-pointer"
              >
                Preview
              </label> */}

              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex sm:w-[60%]   flex-col gap-4 ">
            <p className="text-[#171717] font-medium text-lg">Basic Details</p>
            <div className="sm:w-[100%] pt-4 flex gap-4 flex-col">
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
                      maxLength={50}
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
                      maxLength={50}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="inline-block">
          <Button
            disabled={!(isValid || isImageChanged)}
            className={"px-10 py-1"}
            primary={true}
            isLoading={loading}
          >
            Save
          </Button>

        </div>
      </form>
    </>
  );
};

export default Edit;
