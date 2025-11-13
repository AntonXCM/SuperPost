async function send(text){
    const webhook = process.env.DISCORD_WEBHOOK_URL;
    if(!webhook) return { error: "discord webhook missing" };

    const json = await (await
        fetch(webhook, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({ content: text }) }
    )).json();

    if(!json.ok) 
        return json;
    else
        return { error: json };
}
module.exports = {send};