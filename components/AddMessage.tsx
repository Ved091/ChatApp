'use client'
import * as React from 'react';
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {useState} from "react"
interface IAppProps {
    id:string
}

const AddMessage: React.FunctionComponent<IAppProps> = ({id}) => {
    const [message, setMessage]= useState<string>("")
    const handleSubmit = async(e:any)=>{
        e.preventDefault()
        try {
          const res = await fetch(`http://localhost:3000/api/conversations/${id}`,{
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({message})
          })
          if(!res.ok){
            throw new Error('Failed to Update')
          }
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <div className="flex flex-row items-center justify-center">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg className="h-6 w-6 fill-slate-300" viewBox="0 0 20 20">
              <TagFacesOutlinedIcon />
            </svg>
          </span>
          <span className="absolute inset-y-5 right-7 flex items-center pl-2">
            <svg
              className="h-6 w-6 fill-slate-300 rotate-45"
              viewBox="0 0 20 20"
            >
              <AttachFileOutlinedIcon />
            </svg>
          </span>
          <input
            className=" placeholder:text-black block bg-[#f1f1f1] w-[39rem] border rounded-[999px] py-5 px-14 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-md"
            placeholder="Type a message"
            type="text"
            name="search"
            onChange={(e)=> setMessage(e.target.value)}
          />
        </label>
        <button className="h-14 w-14 bg-green-700 rounded-full ml-4 text-white" onClick={handleSubmit}>
          <SendOutlinedIcon />
        </button>
      </div>
  );
};

export default AddMessage;
