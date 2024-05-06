import app from "./src/app";


const startServer = () => {
    const port = process.env.PORT || 8080;

    app.listen(port, () => {
        console.log(`Running on http://localhost:${port}`);
    });
}


startServer();
