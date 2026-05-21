const config = require("../config");
const axios = require("axios");
const fs = require("fs");
module.exports = async (sock, msg, from, text) => {
    if (!text) return sock.sendMessage(from, { text: `❌ 𝑬𝒙: .pinterest https://pinterest.com/pin/xxx${config.signature}` }, { quoted: msg });
    await sock.sendMessage(from, { text: `⏳ 𝑻é𝒍é𝒄𝒉𝒂𝒓𝒈𝒆𝒎𝒆𝒏𝒕 𝑷𝒊𝒏𝒕𝒆𝒓𝒆𝒔𝒕...📌${config.signature}` }, { quoted: msg });
    try {
        const res = await axios.get(`https://api.siputzx.my.id/api/d/pinterest?url=${encodeURIComponent(text)}`, { timeout: 30000 });
        const d = res.data;
        const imgUrl = d?.data?.url || d?.url;
        if (imgUrl) {
            const tmp = `/tmp/pin_${Date.now()}.jpg`;
            const dl = await axios({ url: imgUrl, method: "GET", responseType: "stream", timeout: 30000 });
            await new Promise((resolve, reject) => { const s = fs.createWriteStream(tmp); dl.data.pipe(s); s.on("finish", resolve); s.on("error", reject); });
            await sock.sendMessage(from, { image: fs.readFileSync(tmp), caption: `✅ *𝑷𝒊𝒏𝒕𝒆𝒓𝒆𝒔𝒕* 📌${config.signature}` });
            fs.unlinkSync(tmp);
        } else throw new Error();
    } catch { await sock.sendMessage(from, { text: `❌ 𝑬𝒓𝒓𝒆𝒖𝒓 𝑷𝒊𝒏𝒕𝒆𝒓𝒆𝒔𝒕 !${config.signature}` }, { quoted: msg }); }
};
