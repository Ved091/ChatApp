import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

export async function connectToMongoDb(): Promise<void> {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/chat");
        console.log("mongodb connected");
    } catch (e) {
        console.log(e);
    }
}