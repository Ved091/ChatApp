import { connectToMongoDb } from "@/server/libs/mongodb";
import exportObject from "@/server/models/topic";
import bcrypt from "bcrypt";
import { NextApiRequest } from "next";
const { User, Conversation } = exportObject;
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();
    await connectToMongoDb();
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return NextResponse.json({ msg: "Username already used", status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return NextResponse.json({ msg: "Email already exists", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    delete user.password;
    return NextResponse.json({ status: true, user });
  } catch (err) {
    console.log(err);
  }


  //  await User.create({username})
  //  return NextResponse.json({message: "Username created"},{status: 201})
}


export async function GET(req:NextApiRequest) {
  await connectToMongoDb();
  const users = await User.find();
  return NextResponse.json({ users });
}
