const config = require("../config");
module.exports = async (sock, msg, from, mentioned) => {
    const t = mentioned[0]; if (!t) return;
    await sock.groupParticipantsUpdate(from, [t], "promote");
    await sock.sendMessage(from, { text: `⬆️ ✅ @${t.split("@")[0]} 𝒆𝒔𝒕 𝒎𝒂𝒊𝒏𝒕𝒆𝒏𝒂𝒏𝒕 𝒂𝒅𝒎𝒊𝒏 ! 👑${config.signature}`, mentions: [t] });
};
