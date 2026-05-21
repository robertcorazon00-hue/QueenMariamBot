const config = require("../config");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
module.exports = async (sock, msg, from) => {
    const imgMsg = msg.message?.imageMessage;
    if (!imgMsg) return sock.sendMessage(from, { text: `❌ 𝑬𝒏𝒗𝒐𝒚𝒆𝒛 𝒖𝒏𝒆 𝒊𝒎𝒂𝒈𝒆 𝒂𝒗𝒆𝒄 *.removbg*${config.signature}` }, { quoted: msg });
    await sock.sendMessage(from, { text: `⏳ 𝑺𝒖𝒑𝒑𝒓𝒆𝒔𝒔𝒊𝒐𝒏 𝒇𝒐𝒏𝒅...${config.signature}` }, { quoted: msg });
    try {
        const stream = await sock.downloadMediaMessage(msg);
        const tmp = `/tmp/rbg_${Date.now()}.png`;
        const form = new FormData();
        form.append("image_file", stream, "image.jpg");
        form.append("size", "auto");
        const res = await axios.post("https://api.remove.bg/v1.0/removebg", form, {
            headers: { ...form.getHeaders(), "X-Api-Key": "DEMO" },
            responseType: "arraybuffer", timeout: 30000
        });
        fs.writeFileSync(tmp, res.data);
        await sock.sendMessage(from, { image: fs.readFileSync(tmp), caption: `✅ *𝑭𝒐𝒏𝒅 𝒔𝒖𝒑𝒑𝒓𝒊𝒎é !*${config.signature}` });
        fs.unlinkSync(tmp);
    } catch { await sock.sendMessage(from, { text: `❌ 𝑬𝒓𝒓𝒆𝒖𝒓 𝑹𝒆𝒎𝒐𝒗𝒆𝑩𝑮 ! 𝑨𝒋𝒐𝒖𝒕𝒆𝒛 𝒗𝒐𝒕𝒓𝒆 𝒄𝒍é 𝑨𝑷𝑰.${config.signature}` }); }
};
