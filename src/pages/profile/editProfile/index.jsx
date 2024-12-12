import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/buttons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../../components/inputs";
import { Heading } from "../../../components/heading";
import { useDispatch, useSelector } from "react-redux";
import { submitEditProfile, updateProfilePicture } from "../../../redux/actions/profile-actions";
import { profileValidationSchema } from "./editProfileValidationSchema";
import Cropper from "react-easy-crop";

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
    canvas.toBlob(
      (blob) => {
        resolve(URL.createObjectURL(blob));
      },
      "image/jpeg"
    );
  });
};

const Edit = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.profile);
  const { upload } = useSelector((state) => state.profile);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [image, setImage] = useState(user?.profile_picture_url || "/images/profile/profile.svg");
  const [imageFile, setImageFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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
  console.log(upload, "upload23");
  const onSubmit = (data) => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("profilePicture", upload);
    }
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("businessEmail", data.businessEmail);
    dispatch(submitEditProfile({ formData, navigate }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };
  const blobToFile = (url, filename) => {
    // return new File([blob], fileName, { type: blob.type });
    let mimeType = (url.match(/^data:([^;]+);/) || '')[1];
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  };
  
  const handleSave = async () => {
    if (croppedAreaPixels) {
      const croppedImgBlob = await getCroppedImg(image, crop, croppedAreaPixels);
      console.log("image", imageFile);
      const fileName = imageFile?.name;

      const croppedImgFile = await blobToFile(croppedImgBlob, fileName);
      console.log("croppedImgFile", croppedImgFile);

      // Set the file URL for preview (optional)
      setCroppedImage(croppedImgBlob);

      // Create FormData and append the file correctly
      const formData = new FormData();
      formData.append("files", croppedImgFile);  // 'files' key used for the backend

      console.log("FormData before dispatch:", formData);

      // Dispatch the action with formData
      const imageUrl = await dispatch(updateProfilePicture({ formData }));
      console.log("imageUrl", imageUrl);
    }
  };


  useEffect(() => {
    const str = user.name || "";
    let data = [];
    const spaceIndex = str.indexOf(" ");

    if (spaceIndex !== -1) {
      const firstName = str.substring(0, spaceIndex);
      const lastName = str.substring(spaceIndex + 1);
      data = [firstName, lastName];
    } else {
      data = [str, ""];
    }
    console.log(user, "user1234");
    setValue("firstName", data[0]);
    setValue("lastName", data[1]);
    setValue("email", user?.email);
    setValue("businessEmail", user?.busniessEmail || "");
  }, [user]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Heading title={"Profile Picture"} backButton={true}>
          Edit Profile
        </Heading>
        <div className="flex shadow-md bg-[#F4F9FF] border px-4 rounded-2xl py-10 border-[#DFEAF2]">
          <div className="flex flex-col w-full items-center gap-4">
            <div className="relative" style={{ width: "250px", height: "170px" }}>
              {/* Conditionally render cropped image or cropper */}
              {croppedImage ? (
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 3}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              )}
            </div>

            <div className="text-center mt-2">
              <label
                htmlFor="image-upload"
                className="text-[#171717] text-sm font-medium cursor-pointer"
              >
                Update
              </label>


              <label
                onClick={handleSave}
                className="save-button ml-4 cursor-pointer"
              >
                Saved
              </label>

              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>



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
