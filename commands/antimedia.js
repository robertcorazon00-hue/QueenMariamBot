const config = require("../config");
module.exports = async (sock, msg, from, text) => {
    config.antiMedia = text === "on";
    await sock.sendMessage(from, { text: `🎬 𝑨𝒏𝒕𝒊-𝒎é𝒅𝒊𝒂 : *${text==="on"?"✅ 𝑨𝑪𝑻𝑰𝑽É":"❌ 𝑫É𝑺𝑨𝑪𝑻𝑰𝑽É"}*${config.signature}` });
};
