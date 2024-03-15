import { connectToMongoDb } from "@/server/libs/mongodb";
import exportObject from "@/server/models/topic";
const { User, Conversation } = exportObject;
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let ID = request.url.split("/conversations/")[1];
  await connectToMongoDb();
  const messageData = await Conversation.findOne({ participants: ID });
  return NextResponse.json({ messageData }, { status: 200 });
}

export async function PATCH(request: Request) {
  let ID = request.url.split("/conversations/")[1];
  await connectToMongoDb();
  const message = await new Response(request.body).json();
  let person = await Conversation.findOne({ participants: ID });
  await person.messages.push(message);
  await person.save();
  return new Response("Message added to the conversation", { status: 200 });
}

export async function DELETE(req:Request){
  let ID = req.url.split("/conversations/")[1];
  await connectToMongoDb()
  await Conversation.findByIdAndDelete(ID);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}




