import mongoose from "mongoose";


export default async function connectDB(URI: string) {
    try {

        mongoose.connection.on("connected", () => {
            console.log("DB connected.");
        })

        mongoose.connection.on("error", (err) => {
            console.error("Error in connecting.", err);
        })

        const res = await mongoose.connect(URI);
        console.info(`DB host: ${res.connection.host}`)

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
