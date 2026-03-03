async function post(formData){
    const res = await fetch("/server/post", {
        method:"POST",
        body: formData
    });
    return res.json();
}

function showOut(text) {
    document.getElementById("out").textContent = text;
}


document.getElementById("send").addEventListener("click", async ()=>{
    const text = document.getElementById("text").value.trim();
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    if(!text && !file){
        showOut("Нет текста или файла");
        return;
    }
    const formData = new FormData();
    formData.append("text", text);
    formData.append("toDiscord", document.getElementById("toDiscord").checked);
    formData.append("toTelegram", document.getElementById("toTelegram").checked);
    formData.append("toX", false);
    if(file) formData.append("file", file);
    
    showOut("Сервер думает ***");
    
    try{
        showOut(JSON.stringify(await post(formData), null, 2));
    }catch(e){
        showOut(e.message);
    }
});