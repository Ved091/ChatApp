import { connectToMongoDb } from "@/server/libs/mongodb";
import exportObject from "@/server/models/topic";
import bcrypt from "bcrypt";
import { NextApiRequest } from "next";
const { User, Conversation } = exportObject;
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        
      const { username, password } = await req.json()
      await connectToMongoDb()
      const user = await User.findOne({ username });
      if (!user)
        return NextResponse.json({
          msg: "Incorrect username",
          status: false,
        });
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return NextResponse.json({
          msg: "Incorrect password",
          status: false,
        });
       delete user.password;
      return  NextResponse.json({status:true,user });
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        msg: "Internal server error",
        status: false,
      });
    }
  }