import { Router } from "express";
const router = Router();

router.post("/authorization", async(req, res) => {
    res.status(200).json({
        errorCode: 0,
        message: "successful communication"
    })
})

export default router;