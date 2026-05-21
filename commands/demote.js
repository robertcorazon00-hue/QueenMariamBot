const config = require("../config");
module.exports = async (sock, msg, from, mentioned) => {
    const t = mentioned[0]; if (!t) return;
    await sock.groupParticipantsUpdate(from, [t], "demote");
    await sock.sendMessage(from, { text: `⬇️ @${t.split("@")[0]} 𝒏'𝒆𝒔𝒕 𝒑𝒍𝒖𝒔 𝒂𝒅𝒎𝒊𝒏 !${config.signature}`, mentions: [t] });
};
