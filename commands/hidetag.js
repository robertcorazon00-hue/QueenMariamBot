const config = require("../config");
module.exports = async (sock, msg, from, text) => {
    const meta = await sock.groupMetadata(from);
    const parts = meta.participants.map(p => p.id);
    await sock.sendMessage(from, { text: text || "📢 𝑴𝒆𝒔𝒔𝒂𝒈𝒆 𝒊𝒎𝒑𝒐𝒓𝒕𝒂𝒏𝒕 !", mentions: parts });
};
