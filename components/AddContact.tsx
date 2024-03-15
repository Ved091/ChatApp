"use client";
import * as React from "react";
import { useState, useEffect , useRef} from "react";
import { getUsers } from "./ShowUser";
interface IAppProps {
  _id: string;
  username: string;
}

const AddContact: React.FunctionComponent<IAppProps> = (props) => {
  // let lastObjectId;
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  // const [participants, setParticipants] = useState<string>("")
  // const [people, setPeople] = useState<IAppProps[]>([]);
  const people = useRef<IAppProps[]>([]);
  const participants = useRef<string>("")
  // Function to toggle the pop-up visibility

  

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  async function fetchUser() {
    const { users } = await getUsers();
    console.log(users)
    // setPeople(users);
    people.current=users
  }
  // fetchUser();
  const postMessage = async () => {
    // e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify({ participants:participants.current,messages:[] }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify({ username }),
      });
      if (res.ok) {
        await fetchUser();
        const lastObject = people.current[people.current.length-1];
        const lastObjectId = lastObject._id;
        participants.current = lastObjectId
        await postMessage()
        togglePopup();
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <button onClick={togglePopup} className="btn">
        Add Contact 
      </button>

      {/* Conditionally render the pop-up based on state */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content flex flex-col justify-center items-center">
            <h2>Save Contact</h2>
            <input
              type="text"
              name=""
              id=""
              className="bg-black text-white pl-4"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSubmit} className="btn w-fit">
              Add Contact
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddContact;
