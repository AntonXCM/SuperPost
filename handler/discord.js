async function send(text, file){
    const webhook = process.env.DISCORD_WEBHOOK_URL;
    if(!webhook) return { error: "discord webhook missing" };

    const paragraphs = text.split("\n").map(p => p.trim()).filter(p => p.length);
    var json = ""
    for(const p of paragraphs){
        const res = await fetch(webhook,{
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body: JSON.stringify({ content: p })
        });

        json += await res.text();
    }
    if(file){
        const form = new FormData();
        form.append("file", new Blob([file.buffer], {type:file.mimetype}), file.originalname);
        const res = await fetch(webhook,{
            method:"POST",
            body: form
        });
        json += await res.text();
    }

    return { sent: paragraphs.length + (file != null)};
}
module.exports = {send};