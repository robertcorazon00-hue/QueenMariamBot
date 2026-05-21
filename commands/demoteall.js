const config = require("../config");
module.exports = async (sock, msg, from) => {
    const meta = await sock.groupMetadata(from);
    const parts = meta.participants.filter(p=>p.admin==="admin").map(p=>p.id);
    await sock.groupParticipantsUpdate(from, parts, "demote");
    await sock.sendMessage(from, { text: `⬇️ ✅ 𝑻𝒐𝒖𝒔 𝒍𝒆𝒔 𝒂𝒅𝒎𝒊𝒏𝒔 𝒓é𝒕𝒓𝒐𝒈𝒓𝒂𝒅é𝒔 !${config.signature}` });
};
