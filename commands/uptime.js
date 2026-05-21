const config = require("../config");
module.exports = async (sock, msg, from) => {
    const s = process.uptime();
    const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), sec = Math.floor(s%60);
    await sock.sendMessage(from, { text: `⏱️ *𝑼𝑷𝑻𝑰𝑴𝑬*\n\n🕐 ${h}𝒉 ${m}𝒎𝒊𝒏 ${sec}𝒔\n✅ 𝑩𝒐𝒕 𝒆𝒏 𝒎𝒂𝒓𝒄𝒉𝒆 !${config.signature}` }, { quoted: msg });
};
