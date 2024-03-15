import mongoose, { Document } from "mongoose";

interface IUser {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
}
interface IMessages {
  content: string;
  timestamp: string;
}
interface IConversation {
  message:{
    text:string
  };
  users:[]
  sender:mongoose.Schema.Types.ObjectId
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    uniquie: true,  
    // we can also limit the field by setting min and max values as max:8
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required:true
  },
});


// const conversationSchema = new mongoose.Schema<IConversation>({
//   participants: {
//     type: String,
//     ref: "User",
//     required: true,
//   },
//   messages: [
//     {
//       content: {
//         type: String,
//       },
//       timestamp: {
//         type: Date,
//         default: Date.now,
//       },
//     },
//   ],
// });

const conversationSchema = new mongoose.Schema<IConversation>({
  message: {
    text: {
      type: String,
      required: true,
    },
  },
  users: Array,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},
{
  timestamps: true,
});
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
const Conversation =
  mongoose.models.Conversation 
  ||
  mongoose.model<IConversation>("Conversation", conversationSchema);

const exportObject = {
  User,
  Conversation,
};
export default exportObject;
