const node = require("@sveltejs/adapter-node");
const preprocess = require("svelte-preprocess");
const pkg = require("./package.json");

const dev = process.env.NODE_ENV !== "production"

let SVELTE_CONFIG = {
    kit: {
        adapter: node(),
        target: "#app-main",

        vite: {
            compilerOptions: { dev },
            ssr: { noExternal: Object.keys(pkg.dependencies || {}) },
        }
    },
    preprocess: preprocess(),
};

function createConfig() {
    if(dev) {
        SVELTE_CONFIG.kit.vite["server"] = {
            proxy: {
                "/api": {
                    target: "http://127.0.0.1:3001",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        }
    }

    return SVELTE_CONFIG;
}

module.exports = createConfig()
