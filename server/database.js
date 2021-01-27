const path = require("path");
const fs = require("fs");

module.exports = class Database {
    constructor() {
        this.m_packages = this._readData("packages");
    }

    get packages() { return this.m_packages; }

    _readAsset(filename) { return fs.readFileSync(`${__dirname}/../static/assets/${filename}`).toString().trim().split("\n"); }
    _readData(dataname) { return JSON.parse(fs.readFileSync(`${__dirname}/../static/assets/data/${dataname}.json`)); }
}