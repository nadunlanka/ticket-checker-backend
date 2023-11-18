import express from "express";
import controller from "../controllers/ticket"

const router = express.Router();

router.get("/",
	controller.index
);

router.get("/read-excel",
	controller.importExcel
);

router.get("/:id",
	controller.get
);

router.post("/",
	controller.create
);

router.put("/:id",
	controller.update
);



export default router;