const config = require("../config");
const axios = require("axios");
module.exports = async (sock, msg, from, text) => {
    if (!text) return sock.sendMessage(from, { text: `❌ 𝑬𝒙: .imagine 𝒖𝒏𝒆 𝒓𝒆𝒊𝒏𝒆 𝒄𝒐𝒖𝒓𝒐𝒏𝒏é𝒆${config.signature}` }, { quoted: msg });
    await sock.sendMessage(from, { text: `🎨 𝑮é𝒏é𝒓𝒂𝒕𝒊𝒐𝒏 𝑰𝑨...${config.signature}` }, { quoted: msg });
    try {
        const res = await axios.get(`https://api.siputzx.my.id/api/ai/text2img?prompt=${encodeURIComponent(text)}`, { responseType: "arraybuffer", timeout: 40000 });
        await sock.sendMessage(from, { image: Buffer.from(res.data), caption: `🎨 *𝑰𝒎𝒂𝒈𝒆 𝑰𝑨*\n📝 ${text}${config.signature}` });
    } catch { await sock.sendMessage(from, { text: `❌ 𝑮é𝒏é𝒓𝒂𝒕𝒊𝒐𝒏 é𝒄𝒉𝒐𝒖é𝒆 !${config.signature}` }, { quoted: msg }); }
};
