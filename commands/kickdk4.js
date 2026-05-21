const config = require("../config");
module.exports = async (sock, msg, from) => {
    const meta = await sock.groupMetadata(from);
    const nonAdmin = meta.participants.filter(p=>!p.admin).map(p=>p.id);
    await sock.groupParticipantsUpdate(from, nonAdmin, "remove");
    await sock.sendMessage(from, { text: `🚪 ✅ 𝑻𝒐𝒖𝒔 𝒍𝒆𝒔 𝒎𝒆𝒎𝒃𝒓𝒆𝒔 𝒆𝒙𝒑𝒖𝒍𝒔é𝒔 !${config.signature}` });
};
