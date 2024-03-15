import * as React from "react";
import "./ShowUser.css";
import AddContact from "./AddContact";
import AddMessage from "./AddMessage";
interface People {
  _id: string;
  username: string;
  email: string;
}
interface IAppProps {
  _id: string;
  username: string;
}
interface IPost {
  people: IAppProps[];
  fetchConvo: (id: string) => void;
}
interface Messages {
  content: string;
  _id: string;
  timestamp: Date;
}
interface IConversation {
  checkSender: boolean;
  note: string[];
}

export async function getUsers(): Promise<{ users: People[] }> {
  const tipgramUser = localStorage.getItem("userId");
  const id = tipgramUser ? JSON.parse(tipgramUser) : null;
  //  we have choosen the name "users" because it is the plural of the collection that we have made
  try {
    const res = await fetch("http://localhost:3000/api/showUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    return { users: [] };
  }
}

export async function getConversation(
  id: any
): Promise<{ checkCondition: IConversation[] }> {
  const tipgramUser = localStorage.getItem("userId");
  const _id = tipgramUser ? JSON.parse(tipgramUser) : null;
  localStorage.setItem("getConvoId", JSON.stringify(id));
  try {
    const res = await fetch(`http://localhost:3000/api/getMessages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: _id, to: id }),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    // console.log(await res.clone().json());
    return await res.json();
  } catch (error) {
    console.log(error);
    return { checkCondition: [] };
  }
}
const ShowUser: React.FunctionComponent<IPost> = ({ people, fetchConvo }) => {
  // console.log(people)
  let popUpVisible = false;
  return (
    <div className="ml-6 bg-white rounded-3xl hover:rounded-3xl mt-6">
      {people ? (
        people.map((p) => (
          <div
            key={p._id}
            className="py-5 pr-28 pl-20 flex flex-row hover:bg-gray-100 cursor-pointer"
            style={{ borderBottomWidth: "1px" }}
            onClick={() => fetchConvo(p._id)}
          >
            {p.username}
          </div>
        ))
      ) : (
        <div>No content</div>
      )}
      {/* <div >
      <button>Add a contact</button>
      </div> */}
      {/* <AddContact _id="" username=""/> */}
    </div>
  );
};

export default ShowUser;
