const config = require("../config");
module.exports = async (sock, msg, from, text) => {
    if (!text) return sock.sendMessage(from, { text: `❌ 𝑬𝒙: .setprefix !${config.signature}` });
    config.prefix = text[0];
    await sock.sendMessage(from, { text: `✅ 𝑷𝒓é𝒇𝒊𝒙𝒆 𝒄𝒉𝒂𝒏𝒈é: *${config.prefix}*${config.signature}` });
};
