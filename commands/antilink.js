const config = require("../config");
module.exports = async (sock, msg, from, text) => {
    config.antiLink = text === "on";
    await sock.sendMessage(from, { text: `🔗 𝑨𝒏𝒕𝒊-𝒍𝒊𝒆𝒏 : *${text==="on"?"✅ 𝑨𝑪𝑻𝑰𝑽É":"❌ 𝑫É𝑺𝑨𝑪𝑻𝑰𝑽É"}*${config.signature}` });
};
