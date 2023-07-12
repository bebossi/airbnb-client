import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {  useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "../../Hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";
import { api } from "../../api";
import useLoginModal from "../../Hooks/useLoginModal";

const RegisterModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await api.post("/signup", data)
    setIsLoading(true);
    console.log("registered")
  };

  const toogle = useCallback(() => {
    loginModal.onOpen()
    registerModal.onClose()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="firstName"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
        <hr/>
        <Button outline label="Continue with google" icon={FcGoogle} onClick={() => {}}  />
        <Button outline label="Continue with gitHub" icon={AiFillGithub} onClick={() => {}}  />
    <div className="text-neutral-500 text-center mt-4 font-light">
    <div className="justify-center flex flex-row items-center gap-2">
        <div>

        Already have an account
        </div>
        <div onClick={toogle} className="text-neutral-900 cursor-pointer hover:underline"> 

        Login in
        </div>
    </div>
    </div>
    </div>
  )

  return (
    <div>
      <Modal
        onSubmit={handleSubmit(onSubmit)}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        isOpen={registerModal.isOpen}
        disabled={isLoading}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;
