import fetch from "node-fetch";
import fs from "fs";

export default class GitHub {
    URL = "https://api.github.com/repos/REDasmOrg/REDasm";
    ARTIFACTS = "artifacts.json";
    RELEASES = "releases.json";

    async getReleases() { return await this._check("releases", this.RELEASES); }
    async getArtifacts() { return await this._check("actions/artifacts", this.ARTIFACTS); }

    async _req(q, filename) {
        let response = await fetch(`${this.URL}/${q}`);

        if(response.ok) {
            response = await response.json();
            fs.writeFileSync(filename, JSON.stringify(response));
        }

        return this._read(filename);
    }

    async _check(q, filename) {
        let res = null;
        if(this._isExpired(filename)) res = await this._req(q, filename);
        else res = this._read(filename);
        return res;
    }

    _read(filename) {
        try { return JSON.parse(fs.readFileSync(filename)); }
        catch { return null; }
    }

    _isExpired(filename) {
        if(!fs.existsSync(filename)) return true;
        const { birthtime } = fs.statSync(filename);
        let days = Math.round(Math.abs(new Date() - birthtime) / 36e5);
        return days > 0; // >= 1 day = expired
    }
}
