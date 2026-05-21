const config = require("../config");
module.exports = async (sock, msg, from, text) => {
    if (!text) return sock.sendMessage(from, { text: `❌ 𝑬𝒙: .jsencrypt console.log("hello")${config.signature}` }, { quoted: msg });
    const encoded = Buffer.from(text).toString("base64");
    await sock.sendMessage(from, { text: `🔐 *𝑱𝑺 𝑬𝑵𝑪𝑹𝒀𝑷𝑻*\n\n📝 𝑶𝒓𝒊𝒈𝒊𝒏𝒂𝒍:\n${text}\n\n🔒 𝑬𝒏𝒄𝒐𝒅é (𝑩𝒂𝒔𝒆64):\n${encoded}${config.signature}` }, { quoted: msg });
};
