const config = require("../config");
const saved = {};
module.exports = { saved };
module.exports.handle = async (sock, msg, from) => {
    const body = msg.message?.conversation || msg.message?.extendedTextMessage?.text || "";
    if (body) saved[msg.key.id] = { body, from, sender: msg.key.participant || msg.key.remoteJid };
};
module.exports.onDelete = async (sock, key) => {
    const s = saved[key.id];
    if (s) await sock.sendMessage(s.from, { text: `🗑️ *𝑴𝒆𝒔𝒔𝒂𝒈𝒆 𝒔𝒖𝒑𝒑𝒓𝒊𝒎é 𝒅é𝒕𝒆𝒄𝒕é !*\n👤 @${s.sender.split("@")[0]}\n💬 ${s.body}${config.signature}`, mentions: [s.sender] });
};
