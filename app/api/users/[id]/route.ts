import { connectToMongoDb } from "@/server/libs/mongodb";
import exportObject from "@/server/models/topic";
const { User, Conversation } = exportObject;
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  let ID = req.url.split("/users/")[1];
  await connectToMongoDb();
  await User.findByIdAndDelete(ID);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}

export async function PUT(request: Request) {
  const ID = request.url?.split("/users/")[1];
  const text = await new Response(request.body).json();
  await connectToMongoDb();
  const { newUsername: username } = text;
  await User.findByIdAndUpdate({ _id: ID }, { username });
  return NextResponse.json({ message: "Topic Updated" }, { status: 200 });
}

// export async function POST(req:Request){
//     try {
//         const { username, password } =await req.json();
//         const user = await User.findOne({ username });
//         if (!user)
//           return NextResponse.json({
//             msg: "Incorrect username",
//             status: false,
//           });

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid)
//           return NextResponse.json({
//             msg: "Incorrect password",
//             status: false,
//           });
//         delete user.password;
//         return NextResponse.json({ status: true, user });
//       } catch (error) {
//         console.log(error)
//       }

// }

export async function GET(req: Request) {
  try {
    const ID = req.url?.split("/users/")[1];
    const users = await User.find({ _id: { $ne: ID } }).select([
      "username",
      "email",
      "_id",
    ]);
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
  }
}
