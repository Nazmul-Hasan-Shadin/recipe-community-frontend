"use client";

import { useState, useRef } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import Image from "next/image";
import { Input } from "@nextui-org/input";
import axios from "axios";
import { GithubIcon, PlusIcon, SearchIcon } from "@/src/components/icons";
import { siteConfig } from "@/config/site";
import { useUser } from "../context/user.provider";
import logo from "@/src/assets/logo.png";
import { Avatar } from "@nextui-org/avatar";
import { ThemeSwitch } from "./theme-switch";
import LoginPage from "../app/login/page";
import { useLogoutUser } from "../hooks/auth.hooks";
import Register from "./register/Register";

export const Navbar = () => {
  const { setSearchResults } = useUser();
  const [searchTerms, setSearchTerms] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const { user } = useUser();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      setSearchTerms(value);
      if (value.trim() !== "") {
        try {
          const response = await axios.get(
            `https://recipe-sharing-community.vercel.app/api/v1/recipe/?searchTerm=${value}`
          );
          setSearchResults(response.data.data);
        } catch (error: any) {
          console.error(error);
        }
      }
    }, 300);
  };

  const searchInput = (
    <Input
      onChange={handleSearch}
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100 rounded-md shadow-sm",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar
      className="fixed bg-white shadow-lg z-50"
      maxWidth="xl"
      position="sticky"
      isBordered
    >
      {/* Left Side (Brand and Links) */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center  md:gap-2"
            href="/"
          >
            <Image width={90} height={40} alt="logo" src={logo} />
            <p className="font-bold text-sm md:text-xl text-[#FF4500]">
              Cooking Community
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent>
        <NavbarItem className="hidden lg:flex flex-1">{searchInput}</NavbarItem>
      </NavbarContent>

      {/* Right Side (User & Buttons for Large Devices) */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full items-center gap-4"
        justify="end"
      >
        {user?.role === "admin" && (
          <NavbarItem>
            <NextLink href={"/admin"}>
              <p>Dashboard</p>
            </NextLink>
          </NavbarItem>
        )}
        <NavbarItem>
          <NextLink href={"/my-profile"}>
            <p>My Recipe</p>
          </NextLink>
        </NavbarItem>

        <NavbarItem>
          <NextLink href="/user/create-post">
            <Button
              style={{ backgroundColor: "#FF4500", borderColor: "#FF4500" }}
              className="text-white"
              endContent={<PlusIcon />}
            >
              Create
            </Button>
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink href={"/about"}>
            <p>About</p>
          </NextLink>
        </NavbarItem>
        {user ? (
          <Button onClick={() => useLogoutUser()}> Log Out</Button>
        ) : (
          <Register />
        )}
        {user ? null : <LoginPage />}
        <NavbarItem className="hidden md:flex">
          <Avatar
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            className="border-2 border-[#FF4500]"
          />
        </NavbarItem>
      </NavbarContent>

      {/* Dark Mode and Toggle for Small Devices */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link
          isExternal
          aria-label="Github"
          href={siteConfig.links.github}
          className="text-[#FF4500]"
        >
          <GithubIcon />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Sidebar Content for Small Devices */}
      <NavbarMenu>
        <div className="px-4 py-3">{searchInput}</div>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <NavbarMenuItem>
            <NextLink href="/" className="hover:text-[#FF4500]">Home</NextLink>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <NextLink href="/about" className="hover:text-[#FF4500]">About</NextLink>
          </NavbarMenuItem>
          {user?.role === "admin" && (
            <NavbarMenuItem>
              <NextLink href="/admin" className="hover:text-[#FF4500]">Dashboard</NextLink>
            </NavbarMenuItem>
          )}
          <NavbarMenuItem>
            <NextLink href="/my-profile" className="hover:text-[#FF4500]">My Recipe</NextLink>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <NextLink href="/user/create-post" className="hover:text-[#FF4500]">Create</NextLink>
          </NavbarMenuItem>
          {user ? (
            <NavbarMenuItem>
              <Button onClick={() => useLogoutUser()} className="hover:text-[#FF4500]">Log Out</Button>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem>
              <Register />
            </NavbarMenuItem>
          )}
          {user ? null : (
            <NavbarMenuItem>
              <LoginPage />
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
