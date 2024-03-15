"use client";
import * as React from "react";
import "./ShowMessage.css";
import { useState, useEffect, useRef } from "react";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useRouter } from "next/navigation";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
interface Messages {
  content: string;
  _id: string;
  timestamp: Date;
}
interface IConversation {
  checkSender: boolean;
  note: string[];
}
interface IPost {
  checkCondition: IConversation[];
}

const ShowMessage: React.FunctionComponent<IPost> = ({ checkCondition }) => {
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [emojiOptionShow, setEmojiOptionShow] = useState<boolean>(false);
  const messageTextIsEmpty = content.trim().length === 0;
  // console.log(checkCondition?.note);
  const messages = checkCondition?.note;
  const time = checkCondition?.time;
  const sender = checkCondition?.checkSender;
  const identity = checkCondition?.id;
  // const entries = data?.messages;
  const [isOpen, setIsOpen] = useState(
    new Array(checkCondition?.length).fill(false)
  );
  const toggleDiv = (index: any) => {
    const updatedIsOpen = [...isOpen];
    updatedIsOpen[index] = !updatedIsOpen[index];
    setIsOpen(updatedIsOpen);
  };
  const toggleEmoji = () => {
    setEmojiOptionShow(!emojiOptionShow);
  };
  useEffect(() => {
    // Add a click event listener to the document
    document.addEventListener("click", handleDocumentClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  },[]); // Ensure the effect runs only once
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const handleDocumentClick = (event:any) => {
    if (emojiOptionShow) {
      // Check if the click target is the emoji picker or its container
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        // Click is outside the emoji picker, so close it
        setEmojiOptionShow(false);
      }
    }
  };
  const handleEmojiClick = (event: any, emoji: any) => {
    console.log("emojiObject", event.unified);
    // console.log("event", event);
    setContent((prev) => prev + event.emoji);
  };
  // const id = data?.participants;
  // console.log(message)
  // console.log(JSON.stringify({content}))
  const deleteMessage = async (e: any): Promise<void> => {
    // e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/conversations/${e}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // window.location.reload();
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e: any) => {
    // console.log("hello")
    const convoId = localStorage.getItem("getConvoId");
    const idd = convoId ? JSON.parse(convoId) : null;
    const tipgramUser = localStorage.getItem("userId");
    const _id = tipgramUser ? JSON.parse(tipgramUser) : null;
    e.preventDefault();
    if (messageTextIsEmpty) {
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/conversations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ from: _id, to: idd, message: content }),
      });
      if (res.ok) {
        // window.location.reload();
        router.refresh();
        setContent("");
      }
      if (!res.ok) {
        throw new Error("Failed to Update");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    containerRef.current?.scrollIntoView();
  }, []);
  return (
    <div className="flex flex-col justify-end p-4 items-end ">
      {/* {data ? (
        <div className="pl-96 pr-24 flex flex-col gap-5 max-h-[22rem] overflow-auto custom_scrollbar mb-5">
          {entries?.map((item: any, index: any) => {
            const timestampDate = new Date(item.timestamp);
            const messageId = item._id.toString()
            // Create formatted date and time strings
            const formattedDate = timestampDate.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            const formattedTime = timestampDate.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            });

            // Combine the formatted date and time
            const formattedTimestamp = `${formattedTime}`;

            return (
              <div
                key={index}
                className="bg-violet-900 py-3 pr-20 pl-4 w-fit text-white relative"
                style={{ borderRadius: "15px 0px 15px 15px" }}
              >
                <div className="text-lg">{item.content}</div>
                <div className="text-right absolute bottom-0 right-2">
                  <small className="text-[10px] ">{formattedTimestamp}</small>
                </div>
                <div
                  className="more_button hover:bg-slate-300"
                  onClick={() => toggleDiv(index)}
                >
                  <MoreHorizIcon />
                  
                </div>
                {isOpen[index] && (
                  <div className=" text-black absolute top-11 -left-[4.3rem] rounded-lg cursor-pointer bg-white px-2" onClick={(e)=>deleteMessage(messageId)}>Delete</div>
                )}
              </div>
            );
          })}
          <div ref={containerRef} />
        </div>
      ) : (
        <div className="flex items-center justify-center">No Conversations</div>
      )} */}
      {checkCondition ? (
        <div className="pl-96 pr-24 flex flex-col gap-5 max-h-[22rem] overflow-auto custom_scrollbar mb-5">
          {messages?.map((item: any, index: any) => {
            const sandesh = messages[index];
            const samay = time[index];
            const whoIsSender = sender[index];
            const id = identity[index];
            const timestampDate = new Date(samay);
            // console.log(timestampDate)
            // const messageId = item._id.toString()
            // Create formatted date and time strings
            const formattedDate = timestampDate.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            const formattedTime = timestampDate.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            });

            // Combine the formatted date and time
            const formattedTimestamp = `${formattedTime}`;

            return (
              <div
                key={index}
                className={`${
                  whoIsSender
                    ? `bg-violet-900 py-3 pr-20 pl-4 w-fit text-white relative`
                    : `bg-violet-900 py-3 pr-20 pl-4 w-fit text-white relative`
                }`}
                style={{ borderRadius: "15px 0px 15px 15px" }}
              >
                <div className="text-lg ">{sandesh}</div>
                <div className="text-right absolute bottom-0 right-2">
                  <small className="text-[10px] ">{formattedTimestamp}</small>
                </div>
                <div
                  className="more_button hover:bg-slate-300"
                  onClick={() => toggleDiv(index)}
                >
                  <MoreHorizIcon />
                </div>
                {isOpen[index] && (
                  <div
                    className=" text-black absolute top-11 -left-[4.3rem] rounded-lg cursor-pointer bg-white px-2"
                    onClick={(e) => deleteMessage(id)}
                  >
                    Delete
                  </div>
                )}
              </div>
            );
          })}
          <div ref={containerRef} />
        </div>
      ) : (
        <div>No Conversation</div>
      )}
      <div className="flex flex-row items-center justify-center">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span
            className="absolute inset-y-0 left-0 flex items-center pl-2 cursor-pointer"
            onClick={toggleEmoji} ref={emojiPickerRef}
          >
            
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

          {emojiOptionShow && (
            <div className={`emoji-picker ${emojiOptionShow ? "visible" : ""}`}>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                autoFocusSearch={false}
                emojiStyle={EmojiStyle.NATIVE}
              />
            </div>
          )}
          <input
            className=" placeholder:text-black block bg-[#f1f1f1] w-[39rem] border rounded-[999px] py-5 px-14 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-md"
            placeholder="Type a message"
            type="text"
            name="search"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && messageTextIsEmpty !== true) {
                await handleSubmit(e);
              }
            }}
          />
        </label>
        <button
          className="h-14 w-14 bg-green-700 rounded-full ml-4 text-white "
          onClick={handleSubmit}
          disabled={messageTextIsEmpty}
        >
          <SendOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default ShowMessage;
