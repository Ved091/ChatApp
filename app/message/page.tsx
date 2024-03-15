'use client'
import * as React from 'react';
import { getConversation } from '@/components/ShowUser';
import {useState, useEffect} from "react"
interface IAppProps {
}
interface Messages {
    content: string;
    _id: string;
    timestamp: Date
  }
  interface IConversation {
    _id: string;
    participants:string;
    messages: Messages[]
  }
const App: React.FunctionComponent<IConversation> = () => {
    const [message, setMessage] = useState<IConversation[]>([])
  return (
    <div>

    </div>
  );
};

export default App;
