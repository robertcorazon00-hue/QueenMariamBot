const config = require("../config");
module.exports = async (sock, msg, from, mentioned) => {
    const t = mentioned[0]; if (!t) return sock.sendMessage(from, { text: `❌ 𝑴𝒆𝒏𝒕𝒊𝒐𝒏𝒏𝒆𝒛 𝒒𝒖𝒆𝒍𝒒𝒖'𝒖𝒏 !${config.signature}` });
    await sock.groupParticipantsUpdate(from, [t], "demote");
    await sock.groupParticipantsUpdate(from, [t], "remove");
    await sock.sendMessage(from, { text: `💥 @${t.split("@")[0]} 𝒅é𝒈𝒓𝒂𝒅é 𝒆𝒕 𝒆𝒙𝒑𝒖𝒍𝒔é !${config.signature}`, mentions: [t] });
};
