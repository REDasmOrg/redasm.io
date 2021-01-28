const express = require("express");
const compression = require("compression");
const helmet = require('helmet');
const nunjucks = require("nunjucks");
const favicon = require("serve-favicon");
const AppVeyor = require("./server/appveyor.js");
const Database = require("./server/database.js");
const path = require("path");
const fs = require("fs");

const app = express(); 
app.use(favicon(path.join(__dirname, "static", "favicon.ico")));
app.use(compression());

app.use(helmet({
  contentSecurityPolicy: false
}));

let appveyor = new AppVeyor("Dax89", "redasm-ntvg3");

function readJson(filename) { return fs.readFileSync(`static/assets/${filename}`).toString().trim().split("\n"); }
function readLines(filename) { return fs.readFileSync(`static/assets/${filename}`).toString().trim().split("\n"); }
 
let env = nunjucks.configure("templates", {
  autoescape: true,
  cache: false,
  express: app
});

env.addGlobal("VERSION", "0.7");
env.addGlobal("DOMAIN", "https://redasm.io");
env.addGlobal("database", new Database());
env.addGlobal("features", readLines("features.txt"));
env.addGlobal("formats", readLines("formats.txt"));
env.addGlobal("assemblers", readLines("assemblers.txt"));
env.addGlobal("roadmap", readLines("roadmap.txt").map((item) => { return item.split("|"); }));

app.use("/assets", express.static("static/assets"));
app.use("/dist", express.static("static/dist"));
app.use("/css", express.static("static/css"));
//app.use("/js", express.static("static/js"));

// Meta

// Pages
app.get("/", (req, res) => { res.render("pages/home.html"); });
app.get("/features", (req, res) => { res.render("pages/features.html"); });
app.get("/roadmap", (req, res) => { res.render("pages/roadmap.html"); });
app.get("/download", (req, res) => { res.render("pages/download.html"); });

// API
app.get("/api/ostypes", (req, res) => { 
  res.send(appveyor.getOsTypes());
});

app.get("/api/nightlies", (req, res) => { 
  appveyor.getHistory().then(response => res.send(response));
});

app.get("/api/download/:ostype/:buildid", (req, res) => { 
  console.log(req);
});

app.listen(1989);
