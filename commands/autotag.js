const config = require("../config");
const state = {};
module.exports = async (sock, msg, from, text) => {
    state[from] = text === "on";
    await sock.sendMessage(from, { text: `🏷️ 𝑨𝒖𝒕𝒐𝒕𝒂𝒈 : *${text==="on"?"✅ 𝑨𝑪𝑻𝑰𝑽É":"❌ 𝑫É𝑺𝑨𝑪𝑻𝑰𝑽É"}*${config.signature}` });
};
module.exports.state = state;
