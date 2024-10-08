"use client";
import RCInput from "@/src/components/form/RCInput";
import RcForm from "@/src/components/form/RcForm";
import { Button } from "@nextui-org/button";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import RcModal from "@/src/components/ui/modal/RcModal";
import { Divider, Link } from "@nextui-org/react";
import { useRegisterUser } from "@/src/hooks/auth.hooks";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import RCImageInput from "../form/RCImageInput";

const Register = () => {
  const { mutate: handleCreateUser } = useRegisterUser();

  // State to handle file previews (optional)
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Form submission handler
  const handleRegister: SubmitHandler<FieldValues> = async (registerInfo) => {
    const formData = new FormData();

    console.log(registerInfo.profileImage[0], "0");
    console.log(registerInfo.username);
    console.log(registerInfo.email);

    const data = {
      username: registerInfo.username,
      email: registerInfo.email,
      password: registerInfo.password,
    };

    formData.append("profilePicture", registerInfo.profileImage[0]);
    formData.append("data", JSON.stringify(data));

    await handleCreateUser(formData);
  };

  // Image preview handler (with explicit event type)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file, "file");

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <RcModal heading="Register">
      <div className="z-20 px-5">
        <h2 className="font-bold text-xl text-start">Register</h2>
        <p className="text-sm text-start">
          By continuing, you agree to our{" "}
          <Link underline="active" href={"#"}>
            User Agreement
          </Link>{" "}
          and <br /> acknowledge that you understand the{" "}
          <Link href={"#"}>Privacy Policy</Link>.
        </p>
        <div className="">
          <RcForm onSubmit={handleRegister}>
            <div className="py-3 space-y-2">
              <Button className="w-full" startContent={<FcGoogle />}>
                Log In with Google
              </Button>
              <Button className="w-full" startContent={<FcGoogle />}>
                Log In with Apple
              </Button>
            </div>

            <Divider />

            <div className="py-3">
              <RCInput label={"Name"} name={"username"} type={"text"} />
            </div>
            <div className="py-3">
              <RCInput label={"Email"} name={"email"} type={"text"} />
            </div>
            <div className="py-3">
              <RCInput label={"Password"} name={"password"} type={"password"} />
            </div>

            {/* Image upload field */}
            <div className="py-3">
              <RCImageInput
                label={"Profile Image"}
                name={"profileImage"}
                onImageChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full mt-2"
                />
              )}
            </div>

            <div>
              <Button
                type="submit"
                style={{ backgroundColor: "#FF4500" }}
                className="w-full text-white"
              >
                Register
              </Button>
            </div>

            <div className="py-3 flex-end">
              <h5 className="text-end">
                Already have an account? <Link href={"/login"}>Login</Link>
              </h5>
            </div>
          </RcForm>
        </div>
      </div>
    </RcModal>
  );
};

export default Register;
