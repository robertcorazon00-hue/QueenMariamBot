const config = require("../config");
module.exports = async (sock, msg, from, sender, mentioned) => {
    if (!from.endsWith("@g.us")) return sock.sendMessage(from, { text: `❌ 𝑮𝒓𝒐𝒖𝒑𝒆 𝒔𝒆𝒖𝒍𝒆𝒎𝒆𝒏𝒕 !${config.signature}` });
    const t = mentioned[0]; if (!t) return sock.sendMessage(from, { text: `❌ 𝑴𝒆𝒏𝒕𝒊𝒐𝒏𝒏𝒆𝒛 𝒒𝒖𝒆𝒍𝒒𝒖'𝒖𝒏 !${config.signature}` });
    await sock.groupParticipantsUpdate(from, [t], "remove");
    await sock.sendMessage(from, { text: `🚪 ✅ @${t.split("@")[0]} 𝒆𝒙𝒑𝒖𝒍𝒔é !${config.signature}`, mentions: [t] });
};
