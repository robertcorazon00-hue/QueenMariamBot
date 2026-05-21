const config = require("../config");
const qs = [
    {q:"𝑪𝒂𝒑𝒊𝒕𝒂𝒍𝒆 𝒅𝒆 𝒍𝒂 𝑭𝒓𝒂𝒏𝒄𝒆 ?", r:"𝑷𝒂𝒓𝒊𝒔"},
    {q:"𝑪𝒐𝒎𝒃𝒊𝒆𝒏 𝒇𝒐𝒏𝒕 𝟕×𝟖 ?", r:"𝟓𝟔"},
    {q:"𝑷𝒍𝒖𝒔 𝒈𝒓𝒂𝒏𝒅 𝒐𝒄é𝒂𝒏 ?", r:"𝑷𝒂𝒄𝒊𝒇𝒊𝒒𝒖𝒆"},
    {q:"𝑷𝒍𝒖𝒔 𝒈𝒓𝒂𝒏𝒅𝒆 𝒑𝒍𝒂𝒏è𝒕𝒆 ?", r:"𝑱𝒖𝒑𝒊𝒕𝒆𝒓"},
    {q:"𝑸𝒖𝒆𝒍𝒍𝒆 𝒆𝒔𝒕 𝒍𝒂 𝒄𝒂𝒑𝒊𝒕𝒂𝒍𝒆 𝒅𝒖 𝑱𝒂𝒑𝒐𝒏 ?", r:"𝑻𝒐𝒌𝒚𝒐"},
];
module.exports = async (sock, msg, from) => {
    const q = qs[Math.floor(Math.random()*qs.length)];
    await sock.sendMessage(from, { text: `🧠 *𝑻𝑹𝑰𝑽𝑰𝑨*\n\n❓ ${q.q}\n\n⏱️ 𝟑𝟎 𝒔𝒆𝒄𝒐𝒏𝒅𝒆𝒔 !${config.signature}` }, { quoted: msg });
    setTimeout(async () => {
        await sock.sendMessage(from, { text: `💡 𝑹é𝒑𝒐𝒏𝒔𝒆 : *${q.r}*${config.signature}` });
    }, 30000);
};
