import { Navbar } from "@/src/components/navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <main>{children}</main>

      <Navbar />
    </div>
  );
};

export default layout;
