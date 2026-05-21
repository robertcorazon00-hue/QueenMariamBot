const config = require("../config");
const axios = require("axios");
const fs = require("fs");
module.exports = async (sock, msg, from, text) => {
    if (!text) return sock.sendMessage(from, { text: `❌ 𝑬𝒙: .img chat mignon${config.signature}` }, { quoted: msg });
    await sock.sendMessage(from, { text: `🔍 𝑹𝒆𝒄𝒉𝒆𝒓𝒄𝒉𝒆 𝒊𝒎𝒂𝒈𝒆...${config.signature}` }, { quoted: msg });
    try {
        const res = await axios.get(`https://api.siputzx.my.id/api/s/images?query=${encodeURIComponent(text)}`, { timeout: 20000 });
        const imgUrl = res.data?.data?.[0]?.url || res.data?.[0]?.url;
        if (imgUrl) {
            const tmp = `/tmp/img_${Date.now()}.jpg`;
            const dl = await axios({ url: imgUrl, method: "GET", responseType: "stream", timeout: 20000 });
            await new Promise((res, rej) => { const s = fs.createWriteStream(tmp); dl.data.pipe(s); s.on("finish", res); s.on("error", rej); });
            await sock.sendMessage(from, { image: fs.readFileSync(tmp), caption: `🖼️ *${text}*${config.signature}` });
            fs.unlinkSync(tmp);
        } else throw new Error();
    } catch { await sock.sendMessage(from, { text: `❌ 𝑨𝒖𝒄𝒖𝒏𝒆 𝒊𝒎𝒂𝒈𝒆 𝒕𝒓𝒐𝒖𝒗é𝒆 !${config.signature}` }, { quoted: msg }); }
};
