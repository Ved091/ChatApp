import { connectToMongoDb } from "@/server/libs/mongodb";
import exportObject from "@/server/models/topic";
const { User, Conversation } = exportObject;
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // const {username} = await req.json()
    // console.log(username)
    try {
      const {id} = await req.json()
      const users = await User.find({ _id: { $ne: id } }).select([
        "username",
        "email",
        "_id",
      ]);
      return NextResponse.json({users});
    } catch (error) {
      console.log(error);
    }
  }