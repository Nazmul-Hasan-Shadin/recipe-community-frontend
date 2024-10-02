"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { HomeIcon } from "../../icons";
import React, { useState } from "react";

type LinkItem = {
  href: string;
  label: string;
  icon?: JSX.Element;
}[];

const SideBarOptions = ({ links }: { links: LinkItem }) => {
  const [selectedLink, setSelectedLink] = useState<string>("");
  return (
    <div>
      {links.map((link, index) => (
        <Link
          key={link.href}
          className={`block w-full rounded-md px-3 py-2 hover:bg-default-200 ${
            selectedLink === link.href ? "bg-[#DBE4E9]" : ""
          }`}
          onClick={() => setSelectedLink(link.href)}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default SideBarOptions;
