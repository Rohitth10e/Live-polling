import express from "express";


const router = express.Router();

router.get("/", ()=>{console.log("poll route")});

export default router;