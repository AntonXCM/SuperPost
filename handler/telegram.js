async function send(text) {
    const BOT = process.env.TELEGRAM_BOT_TOKEN;
    if(!BOT)    return { error: "telegram bot token missing" };
    const CHAT =process.env.TELEGRAM_CHAT_ID;
    if(!CHAT)   return { error: "telegram chat id missing" };

    const json = await (await 
        fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({ chat_id: CHAT, text, parse_mode: "HTML" })
    }).json());

    if(!json.ok) 
        return json;
    else
        return { error: json };
}
module.exports = {send};