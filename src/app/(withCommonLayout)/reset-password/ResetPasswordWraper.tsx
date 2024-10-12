"use client";
import ResetPassPage from "@/src/components/modules/ResetPass/ResetPassPage";
import React, { Suspense } from "react";

const ResetPassPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassPage />
    </Suspense>
  );
};

export default ResetPassPageWrapper;
