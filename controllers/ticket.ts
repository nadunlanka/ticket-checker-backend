import Ticket from "../models/ticket";
import  {Request, Response} from 'express';
import xlsx from 'xlsx';

const create = async (req: Request, res: Response) => {
    const { name, tableNumber, couple }:any = req.body;
    const ticket = new Ticket({
        name,
        tableNumber,
        couple
    })
    ticket.save();
    return res.status(201).json({ ticket });
}

const update = async (req: Request, res: Response) => {
    const id = req.params.id

    const ticket = await Ticket.findOne({
        where: {
            id
        }
    });

    if(ticket){
        const { checkin, couple1, couple2, gift, photo } : any = req.body;
        
        if(checkin != null){
            ticket.checkin = checkin;
        }

        if(couple1 != null){
            ticket.couple1 = couple1;
        }

        if(couple2 != null){
            ticket.couple2 = couple2;
        }

        if(gift != null){
            ticket.gift = gift;
        }

        if(photo != null){
            ticket.photo = photo;
        }

        await ticket.save();

        return res.status(200).json({ ticket });
    }
}

const get = async (req: Request, res: Response) => {
    const id = req.params.id

    const ticket = await Ticket.findOne({
        where: {
            id
        }
    });

    return res.status(200).json({ ticket });
}

const index = async (req: Request, res: Response) => {
    const tickets = await Ticket.findAll({});
    return res.status(200).json(tickets);
} 

const importExcel = async (req: Request, res: Response) => {
    console.log("--a--",__dirname)
    const workbook = xlsx.readFile(`${__dirname}\/tickets.xlsx`);  // Step 2
    let workbook_sheet = workbook.SheetNames;                // Step 3
    let workbook_response = xlsx.utils.sheet_to_json(        // Step 4
      workbook.Sheets[workbook_sheet[0]]
    );

    for (const iterator of workbook_response) {
        const ticket = new Ticket({
            name: iterator["Title"]+iterator["Calling Name"]+" "+iterator["Surname"],
            tableNumber: iterator["Table Nos."],
            couple: iterator["Couple"] === "y" ? true: false
        })
        ticket.save();
    }
    return res.status(200).json(workbook_response);
} 

export default { create, update, get, index, importExcel }