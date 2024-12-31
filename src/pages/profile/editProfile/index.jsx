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
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import { getUser } from "../../../redux/actions/dashboard-action";

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
  const { loading, isUpdatingImage } = useSelector((state) => state.profile);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState(user?.profile_picture_url || "/images/profile/profile.svg");
  const [imageFile, setImageFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSelected, setImageSelected] = useState(false);
  const [isSaving, setIsSaving] = useState(false);  // Managing the saving state

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
    setCroppedAreaPixels(croppedAreaPixels); 
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("profilePicture", imageFile);
    }
    console.log(data.fullName,"fullName");
    formData.append("firstName", data.fullName);
   
    formData.append("businessEmail", data.businessEmail);
    console.log(data,"full1");
    console.log(formData,"full2");

    setIsSaving(true);
    await dispatch(submitEditProfile({ formData, navigate }));
    dispatch(getUser())
    console.log(data,"full3");
    setIsSaving(false);
  };

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validImageTypes.includes(file.type)) {
        toast.error("Only image files (JPG, JPEG, PNG) are allowed.");
        return;
      }

      if (file.size > 3 * 1024 * 1024) {
        toast.error("File size should not exceed 3MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImageFile(file);
        setImageSelected(true);
        setCroppedImage(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const blobToFile = (url, filename) => {
    let mimeType = (url.match(/^data:([^;]+);/) || "")[1];
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  };

  const handleSave = async () => {
    if (croppedAreaPixels) {
      const croppedImgBlob = await getCroppedImg(image, crop, croppedAreaPixels);
      const fileName = imageFile?.name;
      const croppedImgFile = await blobToFile(croppedImgBlob, fileName);
      
      setCroppedImage(croppedImgBlob);

      const imageFormData = new FormData();
      imageFormData.append("files", croppedImgFile);

      const imageUrl = await dispatch(updateProfilePicture({ formData: imageFormData }));
      if (imageUrl?.payload?.data?.url) {
        const profileFormData = new FormData();
        profileFormData.append("profilePicture", imageUrl?.payload?.data?.url);
        profileFormData.append("firstName", user.name);

        setIsSaving(false);
        await dispatch(submitEditProfile({ formData: profileFormData, navigate }));
        dispatch(getUser())
        //setIsSaving(false);
      }
      setImageSelected(false);
    }
  };

  useEffect(() => {
    setValue("fullName", user?.name);
    setValue("email", user?.email);
    setValue("businessEmail", user?.busniessEmail || "");
  }, [user]);

  useEffect(() => {
    if (!user?.email) {
      dispatch(getUser());
    }
  }, [dispatch, user?.email]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Heading title={"Edit Profile"} backButton={true}>
          Edit Profile
        </Heading>
        <div className="flex sm:flex-row flex-col shadow-md bg-[#F4F9FF] border items-center rounded-2xl justify-center py-10 gap-4 px-2 border-[#DFEAF2]">
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
              {/* Only render Cropper if image is selected */}
              {croppedImage ? (
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : imageSelected ? (
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
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
              ) : (
                <img
                  src={user?.profile_picture_url || "/images/profile/profile.svg"}
                  className="rounded-full w-[180px] h-[180px] sm:w-[170px] sm:h-[170px] object-cover"
                  alt=""
                />
              )}
              <label
                htmlFor="image-upload"
                className="absolute bottom-0 right-0 sm:bottom-2 sm:right-2 bg-black px-2 py-2 rounded-full"
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
                imageSelected && (
                  <Button
                    type="button"
                    onClick={handleSave}
                    className="save-button cursor-pointer text-sm font-semibold text-[#004BBC] underline"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Update"}
                  </Button>
                )
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          {/* Form Fields */}
          <div className="flex sm:w-[60%] flex-col gap-4">
            <p className="text-[#171717] font-medium text-lg">Basic Details</p>
            <div className="sm:w-[100%] pt-4 flex gap-4 flex-col">
              <div className="flex flex-row gap-4">
                <div className="w-full">
                  <Controller
                    name="fullName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Input
                        {...field}
                        label={"Full Name"}
                        type={"text"}
                        placeholder={"Full Name"}
                        className={"border-[#D9D9D9] border"}
                        errorContent={errors?.fullName?.message}
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
            disabled={!isValid }
            className={"px-10 py-1"}
            primary={true}
            isLoading={(isSaving && loading)}
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default Edit;
