"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ticket_1 = __importDefault(require("../models/ticket"));
const xlsx_1 = __importDefault(require("xlsx"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, tableNumber, couple } = req.body;
    const ticket = new ticket_1.default({
        name,
        tableNumber,
        couple
    });
    ticket.save();
    return res.status(201).json({ ticket });
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const ticket = yield ticket_1.default.findOne({
        where: {
            id
        }
    });
    if (ticket) {
        const { checkin, couple1, couple2, gift, photo } = req.body;
        if (checkin != null) {
            ticket.checkin = checkin;
        }
        if (couple1 != null) {
            ticket.couple1 = couple1;
        }
        if (couple2 != null) {
            ticket.couple2 = couple2;
        }
        if (gift != null) {
            ticket.gift = gift;
        }
        if (photo != null) {
            ticket.photo = photo;
        }
        yield ticket.save();
        return res.status(200).json({ ticket });
    }
});
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const ticket = yield ticket_1.default.findOne({
        where: {
            id
        }
    });
    return res.status(200).json({ ticket });
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tickets = yield ticket_1.default.findAll({});
    return res.status(200).json(tickets);
});
const importExcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("--a--", __dirname);
    const workbook = xlsx_1.default.readFile(`${__dirname}\/tickets.xlsx`); // Step 2
    let workbook_sheet = workbook.SheetNames; // Step 3
    let workbook_response = xlsx_1.default.utils.sheet_to_json(// Step 4
    workbook.Sheets[workbook_sheet[0]]);
    let i = 0;
    for (const iterator of workbook_response) {
        ++i;
        if (i === 1) {
            continue;
        }
        const ticket = new ticket_1.default({
            name: iterator["__EMPTY_1"] + iterator["__EMPTY_2"] + " " + iterator["__EMPTY_3"],
            tableNumber: iterator["__EMPTY_5"],
            couple: false
        });
        ticket.save();
    }
    return res.status(200).json(workbook_response);
});
exports.default = { create, update, get, index, importExcel };
//# sourceMappingURL=ticket.js.map