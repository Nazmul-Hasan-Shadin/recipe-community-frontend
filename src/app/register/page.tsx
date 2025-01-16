"use client";
import RCInput from "@/src/components/form/RCInput";
import RcForm from "@/src/components/form/RcForm";
import { Button } from "@nextui-org/button";
import { FcGoogle } from "react-icons/fc";

import React from "react";
import RcModal from "@/src/components/ui/modal/RcModal";

const register = () => {
  const handleRegister = () => {
    console.log("hi");
  };
  return (
 <RcModal>
   
<div className=" z-20 flex items-center   flex-col justify-center ">
      <h2 className="font-bold text-xl">Log In</h2>
      <p className="text-sm">
        By continuing, you agree to our User Agreement and <br /> acknowledge
        that you understand the Privacy Policy.
      </p>
      <RcForm onSubmit={handleRegister}>
        <div className="py-3">
          <Button className="w-full" startContent={<FcGoogle />}>
            {" "}
            Log In with Google
          </Button>
        </div>
        <div className="py-3">
          <RCInput label={"Name"} name={"name"} type={"text"} />
        </div>
        <div className="py-3">
          <RCInput label={"Email"} name={"email"} type={"text"} />
        </div>
        <div className="py-3">
          <RCInput label={"Password"} name={"password"} type={"password"} />
        </div>
        <div>
        <Button style={{backgroundColor:"#FF4500"}} className="w-full text-white ">Register</Button>
        </div>
      </RcForm>
</div>
 </RcModal>
  );
};

export default register;
