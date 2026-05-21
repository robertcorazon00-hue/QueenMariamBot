const config = require("../config");
module.exports = async (sock, msg, from) => {
    const meta = await sock.groupMetadata(from);
    const admins = meta.participants.filter(p=>p.admin==="admin").map(p=>p.id);
    await sock.groupParticipantsUpdate(from, admins, "demote");
    await sock.groupParticipantsUpdate(from, admins, "remove");
    await sock.sendMessage(from, { text: `💥 𝑻𝒐𝒖𝒔 𝒍𝒆𝒔 𝒂𝒅𝒎𝒊𝒏𝒔 𝒅é𝒈𝒓𝒂𝒅é𝒔 𝒆𝒕 𝒆𝒙𝒑𝒖𝒍𝒔é𝒔 !${config.signature}` });
};
