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
    console.log("hi", data);
    handleLoginUser(data);
  };

  return (
    <RcModal heading="Login">
      <div className=" z-20  px-5">
        <h2 className="font-bold text-xl text-start">Login</h2>
        <p className="text-sm text-start">
          By continuing, you agree to our{" "}
          <Link underline="active" href={"#"}>
            User Agreement
          </Link>{" "}
          and <br /> acknowledge that you understand the{" "}
          <Link href={"#"}>Privacy Policy</Link>.
        </p>
        <div className="">
          <RcForm onSubmit={onSubmit}>
            <div className="py-3 space-y-2">
              <Button className="w-full" startContent={<FcGoogle />}>
                {" "}
                Log In with Google
              </Button>
              <Button className="w-full" startContent={<FcGoogle />}>
                {" "}
                Log In with Apple
              </Button>
            </div>

            <Divider />

            <div className="py-3">
              <RCInput label={"Email"} name={"email"} type={"text"} />
            </div>
            <div className="py-3">
              <RCInput label={"Password"} name={"password"} type={"password"} />
            </div>

            <div>
              <Button
                type="submit"
                style={{ backgroundColor: "#FF4500" }}
                className="w-full text-white "
              >
                Login
              </Button>
            </div>
          </RcForm>
        </div>
      </div>
    </RcModal>
  );
};

export default LoginPage;