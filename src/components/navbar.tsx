"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";

import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  SearchIcon,
  Logo,
  PlusIcon,
} from "@/src/components/icons";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import Register from "./register/Register";
import { useUser } from "../context/user.provider";
import Image from "next/image";
import logo from "@/src/assets/logo.png";

export const Navbar = () => {
  const user = useUser();

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
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
    <NextUINavbar className="fixed " maxWidth="xl" position="sticky" isBordered>
      {/* Left Side (Brand and Links) */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            {/* <Logo /> */}
            <Image width={90} height={40} alt="logo" src={logo} />
            <p className="font-bold  -ml-4 text-red-600">Cooking Community</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent>
        <NavbarItem className="hidden lg:flex flex-1">{searchInput}</NavbarItem>
      </NavbarContent>

      {/* Right Side (User & Buttons for Large Devices) */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem>
          <NextLink href="/my-profile">My Recipe</NextLink>
        </NavbarItem>
        <Button endContent={<PlusIcon />} href="/">
          Create
        </Button>
        <Register />
        <NavbarItem className="hidden md:flex">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        </NavbarItem>
      </NavbarContent>

      {/* Dark Mode and Toggle for Small Devices */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Sidebar Content for Small Devices */}
      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
