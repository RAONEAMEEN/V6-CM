const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    delay, 
    makeCacheableSignalKeyStore, 
    Browsers 
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function SIGMA_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);

        try {
            let Ameen = makeWASocket({
                auth: state,
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }),
                browser: ["𝞙𝞢𝞘𝞙𝞗 𝞑𝞗𝙏🤍", "AmeenInt", ""]
            });

            if (!Ameen.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Ameen.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Ameen.ev.on('creds.update', saveCreds);

            Ameen.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === "open") {
                    await Ameen.sendMessage('916238768108@s.whatsapp.net', {
                        text: `_👀Hᴇʏ Aᴍᴇᴇɴ Sᴇʀ🪄_\n_Keiko-V6 has successfully connected to the server_`
                    });

                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Ameen.sendMessage(Ameen.user.id, { text: 'KeikoV6~' + b64data });

                    let groupLink = 'https://chat.whatsapp.com/GVxT4w51GIU3sndNPZGTnw'; // Replace with your actual fixed group link
                    await Ameen.groupAcceptInvite(groupLink.split('/').pop());

                    let SIGMA_MD_TEXT = `
*_Keiko V6 Connected_*
*_Thanks For Using Keiko💌_*

_Don't Forget To Give Star To My Repo_`;
                    await Ameen.sendMessage(Ameen.user.id, { text: SIGMA_MD_TEXT }, { quoted: session });

                    await delay(100);
                    await Ameen.ws.close();
                    return await removeFile('./temp/' + id);

                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode !== 401) {
                    await delay(10000);
                    SIGMA_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restarted");
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "Service Unavailable" });
            }
        }
    }

    return await SIGMA_MD_PAIR_CODE();
});

module.exports = router;
            
