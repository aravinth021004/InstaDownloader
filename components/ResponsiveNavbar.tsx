'use client';
import React from "react";

import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import Link from "next/link";

export default function ResponsiveNavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const authMenuItems = ["Home", "Download"];

  const menuItems = ["Home"];

  return (
    <ClerkProvider>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">Instadown</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href={"/"}>
              Home
            </Link>
          </NavbarItem>

          <SignedIn>
            <NavbarItem>
              <Link color="foreground" href={"/download"}>
                Download
              </Link>
            </NavbarItem>
          </SignedIn>
        </NavbarContent>
        <NavbarContent justify="end">
          <SignedIn>
            <NavbarItem className="hidden lg:flex">
              <div>
                <UserButton />
              </div>
            </NavbarItem>

            <NavbarItem className="hidden lg:flex">
              <div>
                <SignOutButton />
              </div>
            </NavbarItem>
          </SignedIn>

          <SignedOut>
            <NavbarItem className="hidden lg:flex">
              <div>
                <SignInButton />
              </div>
            </NavbarItem>

            <NavbarItem className="hidden lg:flex">
              <div>
                <SignUpButton />
              </div>
            </NavbarItem>
          </SignedOut>
        </NavbarContent>
        <NavbarMenu>
          <SignedIn>
            {authMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="w-full"
                  color={
                    index === 2
                      ? "primary"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href={`/${item.toLowerCase()}`}
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
            <NavbarMenuItem>
              <Link className="w-full" color={"primary"} href="#">
                <UserButton />
              </Link>
              <Link className="w-full" color={"danger"} href="#">
                <SignOutButton />
              </Link>
            </NavbarMenuItem>
          </SignedIn>

          <SignedOut>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link className="w-full" color={"primary"} href={"/"}>
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
            <NavbarMenuItem>
              <Link className="w-full" color={"primary"} href="#">
                <SignInButton />
              </Link>
              <Link className="w-full" color={"danger"} href="#">
                <SignUpButton />
              </Link>
            </NavbarMenuItem>
          </SignedOut>
        </NavbarMenu>
      </Navbar>
    </ClerkProvider>
  );
}
