const config = require("../config");
const axios = require("axios");
const fs = require("fs");
module.exports = async (sock, msg, from, text) => {
    if (!text) return sock.sendMessage(from, { text: `❌ 𝑬𝒙: .facebook https://fb.com/xxx${config.signature}` }, { quoted: msg });
    await sock.sendMessage(from, { text: `⏳ 𝑻é𝒍é𝒄𝒉𝒂𝒓𝒈𝒆𝒎𝒆𝒏𝒕 𝑭𝑩...📘${config.signature}` }, { quoted: msg });
    try {
        const res = await axios.get(`https://api.siputzx.my.id/api/d/facebook?url=${encodeURIComponent(text)}`, { timeout: 30000 });
        const d = res.data;
        const videoUrl = d?.data?.url || d?.data?.sd || d?.data?.hd;
        if (d?.status && videoUrl) {
            const tmp = `/tmp/fb_${Date.now()}.mp4`;
            const dl = await axios({ url: videoUrl, method: "GET", responseType: "stream", timeout: 60000 });
            await new Promise((resolve, reject) => { const s = fs.createWriteStream(tmp); dl.data.pipe(s); s.on("finish", resolve); s.on("error", reject); });
            await sock.sendMessage(from, { video: fs.readFileSync(tmp), mimetype: "video/mp4", caption: `✅ *𝑭𝒂𝒄𝒆𝒃𝒐𝒐𝒌*${config.signature}` });
            fs.unlinkSync(tmp);
        } else throw new Error();
    } catch { await sock.sendMessage(from, { text: `❌ 𝑬𝒓𝒓𝒆𝒖𝒓 𝑭𝑩 ! 𝑽é𝒓𝒊𝒇𝒊𝒆𝒛 𝒍𝒆 𝒍𝒊𝒆𝒏.${config.signature}` }, { quoted: msg }); }
};
