import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { ReactModal } from "../../../../../components/modal";
import { FaPlus } from "react-icons/fa";
import { Input } from "../../../../../components/inputs";
import { Button } from "../../../../../components/buttons/button";
import { Link } from "react-router-dom";
import { label, tr } from "framer-motion/client";
import { ModalWrapper } from "../../../../../components/wrappers/modal";
import { Selector } from "../../../../../components/select";

export const DebitCard = ({ control, errors }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showAddIcon, setShowAddIcon] = useState(true);

  const [activeSavedCard, setactiveSavedCard] = useState(1);

  const handleCardClick = (cardIndex) => {
    setactiveSavedCard(cardIndex);
  };

  const yearOptions = [];
  useEffect(() => {
    for (let i = 1900; i <= 2099; i++) {
      yearOptions.push({ label: i, value: i });
    }
  }, []);

  const monthOptions = [
    {
      label: "January",
      value: "January",
    },
    {
      label: "February",
      value: "February",
    },
    {
      label: "March",
      value: "March",
    },
    {
      label: "April",
      value: "April",
    },
    {
      label: "May",
      value: "May",
    },
    {
      label: "June",
      value: "June",
    },
    {
      label: "July",
      value: "July",
    },
    {
      label: "August",
      value: "August",
    },
    {
      label: "September",
      value: "September",
    },
    {
      label: "October",
      value: "October",
    },
    {
      label: "November",
      value: "November",
    },
    {
      label: "December",
      value: "December",
    },
  ];

  return (
    <>
      <p className="font-semibold text-[14px] pb-2 text-[#0A1C40]">
        Debit & Credit card
      </p>
      <div className="flex flex-col gap-4">
        <div className=" flex flex-row justify-between items-center gap-2 ">
          <Controller
            name="Debitcard"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                type={"number"}
                label={"Debit Card & Credit Card "}
                placeholder={"Debit Card & Credit Card {}"}
                containerClassName={"w-full"}
                className={"border-[#D9D9D9] border"}
                errorContent={errors?.email?.message}
              />
            )}
          />
          <button onClick={() => setModalOpen(!modalOpen)}>
            <FaPlus
              size={25}
              color="#abaaaa"
              className="bg-[#D9D9D9] px-1 py-1 rounded-full"
            />
          </button>
          {modalOpen && (
            <ModalWrapper
              onClick={() => setModalOpen(false)}
              title={" Enter Card Details"}
              childrenClassName={"overflow-hidden"}
              crossButton={true}
              isOpen={modalOpen}
              onRequestClose={() => setModalOpen(false)}
              button={
                showAddIcon && (
                  <FaPlus
                    size={25}
                    color="#abaaaa"
                    className="bg-[#D9D9D9] px-1 py-1 rounded-full"
                  />
                )
              }
            >
              <form className="flex flex-col justify-center items-center gap-20 px-4 py-4">
                <div className="flex justify-start flex-col w-[80%] gap-4 items-start">
                  <div className="items-start flex flex-col">
                    {" "}
                    <p className="font-bold text-black ">
                      Enter a Debit card details
                    </p>
                    <p className="text-[13px] font-medium text-[#717171] ">
                      Provide the Correct card number Details
                    </p>
                  </div>

                  <div className="flex gap-4 w-full items-center">
                    <p className="font-semibold w-[25%] text-start text-sm text-black">
                      Card number
                    </p>
                    <Controller
                      name="CardNumber"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          {...field}
                          type={"number"}
                          label={"Enter card number "}
                          placeholder={"Enter card number "}
                          containerClassName={"w-full"}
                          className={"border-[#D9D9D9] border"}
                          errorContent={errors?.number?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="flex gap-4 w-full items-center">
                    <p className="font-semibold w-[25%] text-start text-sm text-black">
                      Holder name{" "}
                    </p>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          {...field}
                          type={"name"}
                          label={"Card holder name  "}
                          placeholder={"Card holder name  "}
                          containerClassName={"w-full"}
                          className={"border-[#D9D9D9] border"}
                          errorContent={errors?.name?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="flex gap-4 w-full items-center">
                    <p className=" font-semibold w-[20%] text-start text-sm text-black">
                      Expiry date
                    </p>
                    <div className="flex w-[80%] gap-2">
                      <Controller
                        name="month"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Selector
                            {...field}
                            type={"month"}
                            options={monthOptions}
                            label={"MM "}
                            placeholder={"MM  "}
                            containerClassName={"w-full"}
                            className={"border-[#D9D9D9] border"}
                            errorContent={errors?.name?.message}
                          />
                        )}
                      />
                      <Controller
                        name="year"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Selector
                            {...field}
                            options={yearOptions}
                            type={"year"}
                            label={"YYYY "}
                            placeholder={"YYYY "}
                            containerClassName={"w-full"}
                            className={"border-[#D9D9D9] border"}
                            errorContent={errors?.name?.message}
                          />
                        )}
                      />
                      <Controller
                        name="number"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            {...field}
                            type={"number"}
                            label={"CVV "}
                            placeholder={"CVV "}
                            containerClassName={"w-full"}
                            className={"border-[#D9D9D9] border"}
                            errorContent={errors?.name?.message}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full">
                  <Link>
                    <p className="font-semibold text-black">{"<<"} Back </p>
                  </Link>
                  <Button primary={true}>Save & Next</Button>
                </div>
              </form>
            </ModalWrapper>
          )}
        </div>
        <div className="flex flex-col  gap-4">
          <div
            onClick={() => handleCardClick(1)}
            className={`flex rounded justify-between gap-3 border items-start px-2 py-4 cursor-pointer ${
              activeSavedCard === 1
                ? "border-[#007AFF] bg-[#f0f8ff]"
                : "border-[#8080808C]"
            }`}
          >
            <div className="flex items-start gap-2">
              <input
                type="radio"
                name="card"
                id="card1"
                checked={activeSavedCard === 1}
                readOnly
              />
              <div>
                <p
                  className={`font-semibold text-[11px] ${
                    activeSavedCard === 1
                      ? "text-[#0A1C40]"
                      : "text-[#8080808C]"
                  }`}
                >
                  Visa Card
                </p>
                <p
                  className={`font-semibold text-[13px] ${
                    activeSavedCard === 1
                      ? "text-[#0A1C40]"
                      : "text-[#8080808C]"
                  }`}
                >
                  8209 ***** 9983
                </p>
              </div>
            </div>
            <p
              className={`font-medium pr-4 text-[11px] ${
                activeSavedCard === 1 ? "text-[#0A1C40]" : "text-[#8080808C]"
              }`}
            >
              Sandeep yadav
            </p>
          </div>
          <div
            onClick={() => handleCardClick(2)}
            className={`flex rounded justify-between gap-3 border items-start px-2 py-4 cursor-pointer ${
              activeSavedCard === 2
                ? "border-[#007AFF] bg-[#f0f8ff]"
                : "border-[#8080808C]"
            }`}
          >
            <div className="flex items-start gap-2">
              <input
                type="radio"
                name="card"
                id="card2"
                checked={activeSavedCard === 2}
                readOnly
              />
              <div>
                <p
                  className={`font-semibold text-[11px] ${
                    activeSavedCard === 2
                      ? "text-[#0A1C40]"
                      : "text-[#8080808C]"
                  }`}
                >
                  Visa Card
                </p>
                <p
                  className={`font-semibold text-[13px] ${
                    activeSavedCard === 2
                      ? "text-[#0A1C40]"
                      : "text-[#8080808C]"
                  }`}
                >
                  8209 ***** 9983
                </p>
              </div>
            </div>
            <p
              className={`font-medium pr-4 text-[11px] ${
                activeSavedCard === 2 ? "text-[#0A1C40]" : "text-[#8080808C]"
              }`}
            >
              Sandeep yadav
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
