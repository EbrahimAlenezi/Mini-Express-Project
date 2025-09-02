import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const CONN = await mongoose.connect(
      "mongodb+srv://ibrahemalwteed_db_user:s0Xp6V7OXMyjzp6q@cluster0.khufaw6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("mongoodb is connected successfully (:", CONN.connection.host);
  } catch (err) {
    console.error("Somthing went wrong at connection", err);
    process.exit(1);
  }
}; //
export default connectdb;
