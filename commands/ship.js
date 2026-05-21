const config = require("../config");
module.exports = async (sock, msg, from, sender, mentioned) => {
    const t = mentioned[0];
    const c = Math.floor(Math.random()*101);
    const h = c>=80?"❤️❤️❤️ 𝑷𝒂𝒓𝒇𝒂𝒊𝒕 !":c>=50?"💕 𝑩𝒊𝒆𝒏 !":"💔 𝑷𝒂𝒔 𝒕𝒐𝒑...";
    await sock.sendMessage(from, { text: `💘 *𝑺𝑯𝑰𝑷 𝑴𝑬𝑻𝑬𝑹*\n\n@${sender.split("@")[0]} 💕 @${(t||"???").split("@")[0]}\n\n💯 *${c}%* ${h}${config.signature}`, mentions: [sender,t].filter(Boolean) }, { quoted: msg });
};
