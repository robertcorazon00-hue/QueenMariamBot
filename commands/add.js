const config = require("../config");
module.exports = async (sock, msg, from, text) => {
    if (!from.endsWith("@g.us")) return sock.sendMessage(from, { text: `❌ 𝑮𝒓𝒐𝒖𝒑𝒆 𝒔𝒆𝒖𝒍𝒆𝒎𝒆𝒏𝒕 !${config.signature}` });
    if (!text) return sock.sendMessage(from, { text: `❌ 𝑬𝒙: .add 22812345678${config.signature}` });
    const num = text.replace(/[^0-9]/g,"") + "@s.whatsapp.net";
    await sock.groupParticipantsUpdate(from, [num], "add");
    await sock.sendMessage(from, { text: `✅ @${num.split("@")[0]} 𝒂𝒋𝒐𝒖𝒕é !${config.signature}`, mentions: [num] });
};
