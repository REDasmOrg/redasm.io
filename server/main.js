import polka from "polka";
import send from "@polka/send-type";
import GitHub from "./github.js";

const PORT = 3001;
const server = polka();
const gh = new GitHub();

server.get("/releases", async (_, res) => { send(res, 200, await gh.getReleases()); });
server.get("/artifacts", async (_, res) => { send(res, 200, await gh.getArtifacts()); });

server.listen(PORT, err => {
    if(err) throw err;
    console.log(`Running on localhost:${PORT}`);
});
