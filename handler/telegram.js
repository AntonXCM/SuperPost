function detectType(file) {
    if(file?.mimetype) {
        if(file.mimetype.startsWith("image/")) return "photo";
        if(file.mimetype.startsWith("video/")) return "video";
        if(file.mimetype.startsWith("audio/")) return "audio";
    }
    return "document";
}


async function send(text, file) {
    const BOT = process.env.TELEGRAM_BOT_TOKEN;
    if(!BOT)    return { error: "telegram bot token missing" };
    const CHAT =process.env.TELEGRAM_CHAT_ID;
    if(!CHAT)   return { error: "telegram chat id missing" };
    var json;
    if(!file){
        json = await (await 
            fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({ chat_id: CHAT, text, parse_mode: "HTML" })
            })).json();
    } else {
        const type = detectType(file);
        const method = {
            document: "sendDocument",
            photo: "sendPhoto",
            video: "sendVideo",
            audio: "sendAudio"
        }[type];

        const form = new FormData();
        form.append("chat_id", CHAT);
        if(text) form.append("caption", text);
        form.append(type, new Blob([file.buffer], {type:file.mimetype}), file.originalname);
        json = await fetch(`https://api.telegram.org/bot${BOT}/` + method, { method: "POST", body: form });
    }
            
    if(!json.ok) 
        return json;
    else
        return { error: json };
}
module.exports = {send};