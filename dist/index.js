"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./lib/db");
const ticket_1 = __importDefault(require("./routes/ticket"));
const router = (0, express_1.default)();
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
router.use(express_1.default.urlencoded({ extended: true }));
router.use(express_1.default.json());
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
router.use("/ticket", ticket_1.default);
router.listen(port, () => console.log(`server is running on ${port}`));
//# sourceMappingURL=index.js.map