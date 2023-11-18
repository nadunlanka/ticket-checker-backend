"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticket_1 = __importDefault(require("../controllers/ticket"));
const router = express_1.default.Router();
router.get("/", ticket_1.default.index);
router.get("/read-excel", ticket_1.default.importExcel);
router.get("/:id", ticket_1.default.get);
router.post("/", ticket_1.default.create);
router.put("/:id", ticket_1.default.update);
exports.default = router;
//# sourceMappingURL=ticket.js.map