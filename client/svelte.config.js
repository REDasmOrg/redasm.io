import path from "path";
import node from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";
import viteMd from "vite-plugin-markdown";

const dev = process.env.NODE_ENV !== "production"

let SVELTE_CONFIG = {
    kit: {
        adapter: node(),
        target: "#app-main",
        vite: { 
            compilerOptions: { dev },
            plugins: [viteMd.plugin({ mode: viteMd.Mode.HTML})],
        }
    },
    preprocess: preprocess({
        sourceMap: dev,
    }),
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

export default createConfig()
