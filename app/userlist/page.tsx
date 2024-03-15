"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { getUsers } from "@/components/ShowUser";
import { getConversation } from "@/components/ShowUser";
import ShowUser from "@/components/ShowUser";
import ShowMessage from "@/components/ShowMessage";
interface IAppProps {
  _id: string;
  username: string;
}
interface Messages {
  content: string;
  _id: string;
  timestamp: Date;
}
interface IConversation {
  checkSender:boolean;
  note:string[]
}
const App: React.FunctionComponent<IAppProps> = () => {
  const [people, setPeople] = useState<IAppProps[]>([]);
  // const [data, setData] = useState<IConversation[]>([]);
  const [checkCondition,setcheckCondition] = useState<IConversation[]>([])
  
  
  useEffect(() => {
    async function fetchUser() {
      const { users } = await getUsers();
      setPeople(users);
    }
    fetchUser();

  }, []);
  const fetchConvo = async (id: any):Promise<void> => {
    const { checkCondition } = await getConversation(id);
    // console.log(messageData)
    setcheckCondition(checkCondition)
    
  };

  return (
    <div className="flex flex-row items-start mt-4 ">
      <div ><ShowUser people={people} fetchConvo={fetchConvo} /></div>
      <div className="bg-white w-[calc(100vw-368px)] ml-8 flex justify-center h-[calc(100vh-140px)] items-end rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500" ><ShowMessage checkCondition={checkCondition}/></div>
    </div>
  );
};

export default App;
