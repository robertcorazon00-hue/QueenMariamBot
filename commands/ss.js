const config = require("../config");
const axios = require("axios");
const fs = require("fs");
module.exports = async (sock, msg, from, text) => {
    if (!text) return sock.sendMessage(from, { text: `❌ 𝑬𝒙: .ss https://google.com${config.signature}` }, { quoted: msg });
    await sock.sendMessage(from, { text: `📸 𝑪𝒂𝒑𝒕𝒖𝒓𝒆...${config.signature}` }, { quoted: msg });
    try {
        const res = await axios.get(`https://api.siputzx.my.id/api/tools/ss?url=${encodeURIComponent(text)}`, { responseType: "arraybuffer", timeout: 30000 });
        await sock.sendMessage(from, { image: Buffer.from(res.data), caption: `📸 *𝑺𝒄𝒓𝒆𝒆𝒏𝒔𝒉𝒐𝒕*\n🌐 ${text}${config.signature}` });
    } catch { await sock.sendMessage(from, { text: `❌ 𝑬𝒓𝒓𝒆𝒖𝒓 𝑺𝑺 !${config.signature}` }); }
};
