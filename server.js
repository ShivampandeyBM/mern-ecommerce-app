require("dotenv").config()
const mongoose = require("mongoose")
const app = require("./index")

const PORT = process.env.PORT || 5000

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected successfully");
};

app.listen(PORT, async () => {
    try {
        await connect()
        console.log("Server is running at port : ",PORT)
        
    } catch (error) {
        console.log("Error while connection to database :",error)
    }
})