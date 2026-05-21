const config = require("../config");
const axios = require("axios");
module.exports = async (sock, msg, from, text) => {
    if (!text) return sock.sendMessage(from, { text: `❌ 𝑬𝒙: .github robertcorazon${config.signature}` }, { quoted: msg });
    try {
        const res = await axios.get(`https://api.github.com/users/${text}`, { timeout: 10000 });
        const d = res.data;
        await sock.sendMessage(from, { text: `🐙 *𝑮𝒊𝒕𝑯𝒖𝒃*\n\n👤 ${d.name||d.login}\n📝 ${d.bio||"𝑨𝒖𝒄𝒖𝒏𝒆 𝒃𝒊𝒐"}\n📦 ${d.public_repos} 𝒓é𝒑𝒐𝒔\n👥 ${d.followers} 𝒇𝒐𝒍𝒍𝒐𝒘𝒆𝒓𝒔\n🔗 ${d.html_url}${config.signature}` }, { quoted: msg });
    } catch { await sock.sendMessage(from, { text: `❌ 𝑼𝒕𝒊𝒍𝒊𝒔𝒂𝒕𝒆𝒖𝒓 𝒊𝒏𝒕𝒓𝒐𝒖𝒗𝒂𝒃𝒍𝒆 !${config.signature}` }); }
};
