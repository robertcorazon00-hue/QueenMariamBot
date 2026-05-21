const config = require("../config");
module.exports = async (sock, msg, from, text) => {
    const meta = await sock.groupMetadata(from);
    const parts = meta.participants.map(p => p.id);
    await sock.sendMessage(from, { text: `📢 *${text || "𝑨𝒕𝒕𝒆𝒏𝒕𝒊𝒐𝒏 !"}*\n\n${parts.map(p=>`@${p.split("@")[0]}`).join(" ")}${config.signature}`, mentions: parts });
};
