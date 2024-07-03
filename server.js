const express = require("express");

const { handleGetLocation, handleGetTemperature } = require("./lib/helper")


const app = express();

app.use(express.json());

app.set('trust proxy', true);

app.use("/api/hello", async (req, res) => {

    const { visitor_name } = req.query


    if (!visitor_name) {
        return res.send("name is required")
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const userLocation = await handleGetLocation(ip)

    const userTemp = await handleGetTemperature(userLocation)


    res.status(200).json({
        clientIp: ip,
        location: userLocation,
        greeting: `Hello, ${visitor_name}!, the temperature is ${userTemp} degree Celcius in ${userLocation}`
    })



})


const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log("listening on port " + port);
})

