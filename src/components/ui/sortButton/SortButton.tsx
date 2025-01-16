
"use client";

import { useState } from "react";

interface SortButtonProps {
  onClick: () => void;
  isSorted: boolean;
}

export default function SortButton({ onClick, isSorted }: SortButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-md ml-auto"
    >
      {isSorted ? "Show Default Order" : "Sort by Popularity"}
    </button>
  );
}
