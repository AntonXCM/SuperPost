const EXPRESS = require("express");
const APP = EXPRESS();
APP.use(EXPRESS.json());
APP.use(EXPRESS.static("public"));

APP.post("/server/post", async (req, res) => {
    const out = {};
    const { text, toDiscord, toTelegram, toX } = req.body;
    if(!text) return res.status(400).json({ error: "empty text" });

    try{
        if(toDiscord)   out.discord = await require("./handler/discord").send(text);
        if(toTelegram)  out.telegram = await require("./handler/telegram").send(text);
        if(toX)         out.x = await require("./handler/tweet").send(text);

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