const config = require("../config");
module.exports = async (sock, msg, from) => {
    const ms = Date.now();
    await sock.sendMessage(from, { text: `🏓 𝑷𝑶𝑵𝑮 !\n⚡ *${Date.now()-ms}ms*\n✅ 𝑩𝒐𝒕 𝒂𝒄𝒕𝒊𝒇 !${config.signature}` }, { quoted: msg });
};
