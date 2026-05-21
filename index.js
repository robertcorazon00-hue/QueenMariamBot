// ╔══════════════════════════════════════════╗
// ║   🎀👑 𝙌𝙪𝙚𝙚𝙣 𝙈𝙖𝙧𝙞𝙖𝙢 𝙈𝘿 🎀✨           ║
// ║   ✦ 𝑴𝒂𝒅𝒆 𝒃𝒚 𝗿𝗼𝗯𝗲𝗿𝘁𝗰𝗼𝗿𝗮𝘇𝗼𝗻💥 ✦       ║
// ║   ✦ 𝑷𝒍𝒂𝒕𝒆𝒇𝒐𝒓𝒎𝒆: 𝑾𝒉𝒂𝒕𝒔𝑨𝒑𝒑 𝑴𝑫 ✦      ║
// ╚══════════════════════════════════════════╝

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const pino = require("pino");
const { handleMessage } = require("./handler");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth_info");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
        browser: ["🎀 Queen Mariam MD 🎀", "Chrome", "1.0.0"],
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
        if (connection === "close") {
            const shouldReconnect =
                new Boom(lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) startBot();
        } else if (connection === "open") {
            console.log(`
╔══════════════════════════════════════════╗
║                                          ║
║   🎀👑 𝙌𝙪𝙚𝙚𝙣 𝙈𝙖𝙧𝙞𝙖𝙢 𝙈𝘿 🎀✨           ║
║                                          ║
║   ✅  𝑩𝒐𝒕 𝒄𝒐𝒏𝒏𝒆𝒄𝒕é 𝒂𝒗𝒆𝒄 𝒔𝒖𝒄𝒄è𝒔 !     ║
║   👨‍💻  𝑴𝒂𝒅𝒆 𝒃𝒚 𝗿𝗼𝗯𝗲𝗿𝘁𝗰𝗼𝗿𝗮𝘇𝗼𝗻💥         ║
║   ⚙️   𝑷𝒓é𝒇𝒊𝒙𝒆 : .                      ║
║   📱  𝑵𝒖𝒎é𝒓𝒐 : +22871406871             ║
║                                          ║
╚══════════════════════════════════════════╝
            `);
        }
    });

    sock.ev.on("messages.upsert", async ({ messages, type }) => {
        if (type !== "notify") return;
        const msg = messages[0];
        if (!msg.message) return;
        await handleMessage(sock, msg);
    });

    // ✦ Détection messages supprimés
    sock.ev.on("messages.update", async (updates) => {
        for (const update of updates) {
            if (update.update?.messageStubType === 1) {
                console.log("🗑️ 𝑴𝒆𝒔𝒔𝒂𝒈𝒆 𝒔𝒖𝒑𝒑𝒓𝒊𝒎é 𝒅é𝒕𝒆𝒄𝒕é");
            }
        }
    });

    // ✦ Bienvenue nouveaux membres
    sock.ev.on("group-participants.update", async ({ id, participants, action }) => {
        if (action === "add") {
            for (const participant of participants) {
                await sock.sendMessage(id, {
                    text: `╔══════════════════════╗
║  🎀 𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒖𝒆 ! 🎀
╚══════════════════════╝

✨ 𝑩𝒊𝒆𝒏𝒗𝒆𝒏𝒖(𝒆) @${participant.split("@")[0]} !

𝑵𝒐𝒖𝒔 𝒔𝒐𝒎𝒎𝒆𝒔 𝒉𝒆𝒖𝒓𝒆𝒖𝒙 𝒅𝒆 𝒕'𝒂𝒗𝒐𝒊𝒓 𝒑𝒂𝒓𝒎𝒊 𝒏𝒐𝒖𝒔 👑
𝑻𝒂𝒑𝒆 *.menu* 𝒑𝒐𝒖𝒓 𝒗𝒐𝒊𝒓 𝒍𝒆𝒔 𝒄𝒐𝒎𝒎𝒂𝒏𝒅𝒆𝒔 !

╰─❥ 🎀👑𝙌𝙪𝙚𝙚𝙣 𝙈𝙖𝙧𝙞𝙖𝙢 𝙈𝘿🎀✨
      ✦ 𝑴𝒂𝒅𝒆 𝒃𝒚 𝗿𝗼𝗯𝗲𝗿𝘁𝗰𝗼𝗿𝗮𝘇𝗼𝗻💥 ✦`,
                    mentions: [participant],
                });
            }
        } else if (action === "remove") {
            for (const participant of participants) {
                await sock.sendMessage(id, {
                    text: `👋 𝑨𝒖 𝒓𝒆𝒗𝒐𝒊𝒓 @${participant.split("@")[0]} ! 😢

╰─❥ 🎀👑𝙌𝙪𝙚𝙚𝙣 𝙈𝙖𝙧𝙞𝙖𝙢 𝙈𝘿🎀✨
      ✦ 𝑴𝒂𝒅𝒆 𝒃𝒚 𝗿𝗼𝗯𝗲𝗿𝘁𝗰𝗼𝗿𝗮𝘇𝗼𝗻💥 ✦`,
                    mentions: [participant],
                });
            }
        }
    });
}

startBot().catch(console.error);
