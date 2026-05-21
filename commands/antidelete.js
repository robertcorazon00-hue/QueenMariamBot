const config = require("../config");
module.exports = async (sock, msg, from, text) => {
    config.antiDelete = text === "on";
    await sock.sendMessage(from, { text: `🗑️ 𝑨𝒏𝒕𝒊-𝒔𝒖𝒑𝒑𝒓𝒆𝒔𝒔𝒊𝒐𝒏 : *${text==="on"?"✅ 𝑨𝑪𝑻𝑰𝑽É":"❌ 𝑫É𝑺𝑨𝑪𝑻𝑰𝑽É"}*${config.signature}` });
};
