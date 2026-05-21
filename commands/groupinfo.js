const config = require("../config");
module.exports = async (sock, msg, from) => {
    if (!from.endsWith("@g.us")) return sock.sendMessage(from, { text: `❌ 𝑮𝒓𝒐𝒖𝒑𝒆 𝒔𝒆𝒖𝒍𝒆𝒎𝒆𝒏𝒕 !${config.signature}` });
    const meta = await sock.groupMetadata(from);
    await sock.sendMessage(from, {
        text: `╔══════════════════╗\n║  📊 𝑰𝑵𝑭𝑶 𝑮𝑹𝑶𝑼𝑷𝑬\n╚══════════════════╝\n📛 𝑵𝒐𝒎: ${meta.subject}\n👥 𝑴𝒆𝒎𝒃𝒓𝒆𝒔: ${meta.participants.length}\n📝 𝑫𝒆𝒔𝒄: ${meta.desc || "𝑨𝒖𝒄𝒖𝒏𝒆"}\n🔗 𝑳𝒊𝒆𝒏: ${config.groupLink}${config.signature}`
    }, { quoted: msg });
};
