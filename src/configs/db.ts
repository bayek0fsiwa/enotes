import mongoose from "mongoose";


export default async function connectDB(URI: string) {
    try {

        mongoose.connection.on("connected", () => {
            console.log("DB connected.");
        })

        mongoose.connection.on("error", (err) => {
            console.error("Error in connecting.", err);
        })

        await mongoose.connect(URI);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
