const config = require("../config");
const axios = require("axios");
const fs = require("fs");
module.exports = async (sock, msg, from, text) => {
    if (!text) return sock.sendMessage(from, { text: `❌ 𝑬𝒙: .instagram https://instagram.com/p/xxx${config.signature}` }, { quoted: msg });
    await sock.sendMessage(from, { text: `⏳ 𝑻é𝒍é𝒄𝒉𝒂𝒓𝒈𝒆𝒎𝒆𝒏𝒕 𝑰𝑮...📸${config.signature}` }, { quoted: msg });
    try {
        const res = await axios.get(`https://api.siputzx.my.id/api/d/instagram?url=${encodeURIComponent(text)}`, { timeout: 30000 });
        const d = res.data;
        const mediaUrl = d?.data?.[0]?.url || d?.data?.url;
        const isVideo = (mediaUrl||"").includes(".mp4") || d?.data?.[0]?.type === "video";
        if (d?.status && mediaUrl) {
            const ext = isVideo ? "mp4" : "jpg";
            const tmp = `/tmp/ig_${Date.now()}.${ext}`;
            const dl = await axios({ url: mediaUrl, method: "GET", responseType: "stream", timeout: 60000 });
            await new Promise((resolve, reject) => { const s = fs.createWriteStream(tmp); dl.data.pipe(s); s.on("finish", resolve); s.on("error", reject); });
            if (isVideo) await sock.sendMessage(from, { video: fs.readFileSync(tmp), mimetype: "video/mp4", caption: `✅ *𝑰𝒏𝒔𝒕𝒂𝒈𝒓𝒂𝒎*${config.signature}` });
            else await sock.sendMessage(from, { image: fs.readFileSync(tmp), caption: `✅ *𝑰𝒏𝒔𝒕𝒂𝒈𝒓𝒂𝒎*${config.signature}` });
            fs.unlinkSync(tmp);
        } else throw new Error();
    } catch { await sock.sendMessage(from, { text: `❌ 𝑬𝒓𝒓𝒆𝒖𝒓 𝑰𝑮 ! 𝑽é𝒓𝒊𝒇𝒊𝒆𝒛 𝒍𝒆 𝒍𝒊𝒆𝒏.${config.signature}` }, { quoted: msg }); }
};
