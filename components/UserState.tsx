'use client'
import * as React from 'react';
import {useState, useEffect} from "react"
import { getUsers } from './ShowUser';
import ShowUser from './ShowUser';
interface IAppProps {
    _id: string;
    username: string
}

const UserState: React.FunctionComponent<IAppProps> = () => {
    const [people, setPeople] = useState<IAppProps[]>([])
    useEffect(()=>{
        async function fetchUser(){
            const {peoples} = await getUsers()
            setPeople(peoples)
        }
        fetchUser()
    },[])
  return (
    <ShowUser people={people} />
  );
};

export default UserState;
