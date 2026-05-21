const config = require("../config");
const axios = require("axios");
module.exports = async (sock, msg, from, text) => {
    if (!text) return sock.sendMessage(from, { text: `❌ 𝑬𝒙: .deepseek 𝑸𝒖𝒊 𝒆𝒔𝒕 𝑬𝒊𝒏𝒔𝒕𝒆𝒊𝒏 ?${config.signature}` }, { quoted: msg });
    await sock.sendMessage(from, { text: `🟢 𝑫𝒆𝒆𝒑𝑺𝒆𝒆𝒌 𝒕𝒓𝒂𝒊𝒕𝒆...⏳${config.signature}` }, { quoted: msg });
    try {
        const res = await axios.get(`https://api.siputzx.my.id/api/ai/deepseek-r1?prompt=${encodeURIComponent(text)}`, { timeout: 25000 });
        const reply = res.data?.data || res.data?.result || "𝑷𝒂𝒔 𝒅𝒆 𝒓é𝒑𝒐𝒏𝒔𝒆.";
        await sock.sendMessage(from, { text: `🟢 *𝑫𝒆𝒆𝒑𝑺𝒆𝒆𝒌*\n\n❓ ${text}\n\n💬 ${reply}${config.signature}` }, { quoted: msg });
    } catch { await sock.sendMessage(from, { text: `❌ 𝑬𝒓𝒓𝒆𝒖𝒓 𝑰𝑨 !${config.signature}` }, { quoted: msg }); }
};
