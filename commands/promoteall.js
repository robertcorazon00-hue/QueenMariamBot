const config = require("../config");
module.exports = async (sock, msg, from) => {
    const meta = await sock.groupMetadata(from);
    const parts = meta.participants.filter(p=>!p.admin).map(p=>p.id);
    await sock.groupParticipantsUpdate(from, parts, "promote");
    await sock.sendMessage(from, { text: `⬆️ ✅ 𝑻𝒐𝒖𝒔 𝒍𝒆𝒔 𝒎𝒆𝒎𝒃𝒓𝒆𝒔 𝒔𝒐𝒏𝒕 𝒂𝒅𝒎𝒊𝒏𝒔 !${config.signature}` });
};
