// Пакеты
const EXPRESS = require("express");
const MULTER  = require("multer");

const APP = EXPRESS();
const UPLOAD = MULTER({
    storage: MULTER.memoryStorage(),
    limits: { fileSize: 25 * 1024 * 1024 }
});

APP.use(EXPRESS.json());
APP.use(EXPRESS.static("public"));

APP.post("/server/post", UPLOAD.single("file"), async (req, res) => {
    const { text, toDiscord, toTelegram, toX } = req.body, file = req.file;
    const out = {};
    if(!text) return res.status(400).json({ error: "empty text" });
    try{
      if (toDiscord === "true") out.discord = await require('./handler/discord').send(text, file);
      if (toTelegram === "true") out.telegram = await require('./handler/telegram').send(text, file);
      if (toX === "true") out.x = await require('./handler/tweet').send(text, file);

        res.json({ ok:true, result: out });
    }
    catch(e){
        console.error(e);
        res.status(500).json({ error: e.message, partial: out });
    }
});
require("dotenv").config();
const PORT = process.env.LOCALHOST_PORT;
APP.listen(PORT, ()=>console.log("Server on", PORT));

require("child_process").exec("start http://localhost:3000")