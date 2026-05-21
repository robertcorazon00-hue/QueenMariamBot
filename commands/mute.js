const config = require("../config");
module.exports = async (sock, msg, from) => {
    await sock.groupSettingUpdate(from, "announcement");
    await sock.sendMessage(from, { text: `🔇 *𝑮𝒓𝒐𝒖𝒑𝒆 𝒇𝒆𝒓𝒎é !*\n𝑺𝒆𝒖𝒍𝒔 𝒍𝒆𝒔 𝒂𝒅𝒎𝒊𝒏𝒔 𝒑𝒆𝒖𝒗𝒆𝒏𝒕 é𝒄𝒓𝒊𝒓𝒆.${config.signature}` });
};
