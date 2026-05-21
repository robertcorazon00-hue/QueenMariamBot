const config = require("../config");
module.exports = async (sock, msg, from) => {
    const meta = await sock.groupMetadata(from);
    await sock.sendMessage(from, { text: `🏆 *𝑻𝑶𝑷 𝑴𝑬𝑴𝑩𝑹𝑬𝑺*\n\n👥 𝑻𝒐𝒕𝒂𝒍: ${meta.participants.length} 𝒎𝒆𝒎𝒃𝒓𝒆𝒔\n👑 𝑨𝒅𝒎𝒊𝒏𝒔: ${meta.participants.filter(p=>p.admin).length}${config.signature}` });
};
