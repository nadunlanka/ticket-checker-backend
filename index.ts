import express from 'express';
import './lib/db';
import ticketRoute from './routes/ticket';

const router = express();
const port = 9000;
router.use((req, res, next) => {
    /** Log the req */
    console.log(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on("finish", () => {
        /** Log the res */
        console.log(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }

    next();
});

router.get("/", (req, res) => {
    res.send("welcome to the API");
});

router.use("/ticket", ticketRoute);

router.listen(port, () => console.log(`server is running on ${port}`));