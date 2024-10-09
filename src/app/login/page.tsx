"use client";
import RCInput from "@/src/components/form/RCInput";
import RcForm from "@/src/components/form/RcForm";
import { Button } from "@nextui-org/button";
import { FcGoogle } from "react-icons/fc";

import React from "react";
import RcModal from "@/src/components/ui/modal/RcModal";
import { Divider, Link } from "@nextui-org/react";
import { useLoginUser } from "@/src/hooks/auth.hooks";
import { FieldValues, SubmitHandler } from "react-hook-form";

const LoginPage = () => {
  const { mutate: handleLoginUser } = useLoginUser();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLoginUser(data);
  };

  return (
    <RcModal heading="Login">
      <div className="z-20 px-6 py-6 space-y-6">
        <h2 className="font-bold text-xl text-start">Login</h2>
        <p className="text-sm text-start">
          By continuing, you agree to our{" "}
          <Link underline="active" href={"#"}>
            User Agreement
          </Link>{" "}
          and <br /> acknowledge that you understand the{" "}
          <Link href={"#"}>Privacy Policy</Link>.
        </p>

        <RcForm onSubmit={onSubmit}>
          <div className="py-4 space-y-4">
            <Button className="w-full" startContent={<FcGoogle />}>
              Log In with Google
            </Button>
            <Button className="w-full" startContent={<FcGoogle />}>
              Log In with Apple
            </Button>
          </div>

          <Divider className="my-4" />

          <div className="py-2">
            <RCInput label={"Email"} name={"email"} type={"text"} />
          </div>
          <div className="py-2">
            <RCInput label={"Password"} name={"password"} type={"password"} />
          </div>

          <div className="mt-4">
            <Button
              type="submit"
              style={{ backgroundColor: "#FF4500" }}
              className="w-full text-white"
            >
              Login
            </Button>
          </div>
        </RcForm>
      </div>
    </RcModal>
  );
};

export default LoginPage;
