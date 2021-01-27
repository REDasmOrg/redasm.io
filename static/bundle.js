require("popper.js");
require("bootstrap");
require("typeface-montserrat");
require("./style.scss");
require("@fortawesome/fontawesome-free/css/all.min.css");

const $ = require("jquery");
global.jQuery = $;
global.$ = $;

const axios = require("axios");
global.axios = axios;