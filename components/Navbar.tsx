"use client";
import * as React from "react";
import photo from "../—Pngtree—chat vector icon_3725278.png";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";
const Navbar: React.FunctionComponent = () => {
  const router = useRouter();
  const handleClick = async () => {
    localStorage.clear();
    router.push("/login");
  };
  return (
    <div>
      <div className="flex flex-column justify-between items-center">
        <div className="flex flex-column items-center">
          <Image src={photo} alt="this is it" className="h-16 w-16" />
          <h1 className="font-bold">Chat Application</h1>
        </div>
        <div className="flex gap-5 mr-8 items-center text-sm">
          <div>HOME</div>
          <div>CHAT</div>
          <div>CONTACTS</div>
          <div>SETTINGS</div>
          <div>FAQS</div>
          <div>TERMS OF USE</div>
          <IconButton>
            <SearchIcon style={{ color: "black" }} />
          </IconButton>
          <IconButton>
            <NotificationsActiveIcon style={{ color: "black" }} />
          </IconButton>
        </div>
      </div>
      <div className="flex items-center justify-between px-5">
        <div>
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                <SearchIcon />
              </svg>
            </span>
            <input
              className=" placeholder:text-black block bg-white w-30 border rounded-3xl py-4 pl-9 pr-9 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="search"
              name="search"
            />
          </label>
        </div>
        <div className="flex flex-column gap-5">
          <button className="bg-white p-3 rounded-2xl ">Clear Data</button>
          <button
            className="bg-white py-3 px-6 rounded-2xl"
            onClick={handleClick}
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
// https://dribbble.com/shots/16507884-Chatbot
