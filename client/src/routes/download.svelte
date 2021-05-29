<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import Table from "$lib/components/Table.svelte";
    import Tabs from "$lib/components/Tabs.svelte";
    import Link from "$lib/components/Link.svelte";
    import Button from "$lib/components/Button.svelte";

    const PAGES = [ "Releases", "Nightly Builds", "Packages"];
    let artifacts = [ ], releases = [ ], selartifacts = [ ], seldate = "", selartifact = "";

    $: selartifacts = seldate && seldate in artifacts ? artifacts[seldate] : [ ];

    const PACKAGES = {
        header: [
            { label: "OS", value: "os" },
            { label: "Package Name", value: "name" },
            { label: "URL", value: "url" }
        ],

        data: [
            { os: "Arch (Stable)", name: "redasm", url: "https://aur.archlinux.org/packages/redasm" },
            { os: "Arch (Git)", name: "redasm-git", url: "https://aur.archlinux.org/packages/redasm-git" },
            { os: "Debian", name: "redasm", url: "http://phd-sid.ethz.ch/debian/redasm" },
            { os: "Gentoo", name: "redasm", url: "https://gpo.zugaina.org/dev-util/redasm" },
            { os: "FreeBSD", name: "redasm", url: "https://www.freshports.org/devel/redasm" },
            { os: "Haiku", name: "redasm", url: "https://ports-mirror.haiku-os.org/redasm" }
        ]
    };

    let currtab = $page.query.get("page") || PAGES[0];

    function getFileSize(bytes, si=false, dp=1) {
        const thresh = si ? 1000 : 1024;
        if(Math.abs(bytes) < thresh) return bytes + " B";

        const units = si ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
                         : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
        let u = -1;
        const r = 10**dp;

        do {
            bytes /= thresh;
            ++u;
        } while(Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

        return bytes.toFixed(dp) + " " + units[u];
    }

    function downloadArtifact() {
        window.location.href = selartifacts[selartifact].archive_download_url;
    }

    async function getReleases() {
        let response = await fetch("/api/releases");
        if(!response.ok) return [ ];

        let releases = await response.json();

        return releases.reduce((acc, r) => {
            if(r.draft || !r.assets.length) return acc;

            for(let a of r.assets) {
                acc.push({
                    version: r.tag_name,
                    prerelease: r.prerelease,
                    asset: {
                        name: a.name,
                        url: a.browser_download_url,
                        created: new Date(a.created_at).toLocaleString(),
                        downloads: a.download_count,
                        size: a.size,
                    }
                });
            }

            return acc;
        }, [ ]);
    }

    async function getArtifacts() {
        let response = await fetch("/api/artifacts");
        if(!response.ok) return [ ];

        let artifacts = (await response.json()).artifacts;

        let r = artifacts.reduce((acc, a) => {
            let date = new Date(a.created_at).toLocaleDateString();
            if(!(date in acc)) acc[date] = [ ];
            acc[date].push(a);
            return acc;
        }, { });

        //console.log(r);
        return r;
    }

    onMount(async () => {
        releases = await getReleases();
        artifacts = await getArtifacts();
    });
</script>

<svelte:head>
    <title>REDasm - Download</title>
</svelte:head>

<Tabs pages={PAGES} bind:currentpage={currtab}>
    <div class:hidden={currtab !== PAGES[0]}>
        <div class="text-center">
            <Table header={["Name", "Size", "Date", "Version", "Downloads"]}>
                {#each releases as r}
                    <tr>
                        <td class="p-1">
                            <div class="flex text-left">
                                <div class="flex-grow">
                                    <Link href="{r.asset.url}">{r.asset.name}</Link>
                                </div>
                                {#if r.prerelease}
                                    <span class="mx-2 bg-secondary text-sm font-bold p-1 rounded text-dark uppercase">Prerelease</span>
                                {/if}
                        </td>
                        <td>{getFileSize(r.asset.size)}</td>
                        <td>{r.asset.created}</td>
                        <td>{r.version}</td>
                        <td>{r.asset.downloads}</td>
                    </tr>
                {/each}
            </Table>
                            </div>
        </div>
        <div class:hidden={currtab !== PAGES[1]}>
            <div class="mb-3">
                Nightly builds are provided by <a href="https://github.com/REDasmOrg/REDasm/actions/workflows/build.yml">GitHub Actions</a>.<br>
                They provides the latest features and bugfixes, but they can be unstable.
            </div>
            <div class="flex justify-center">
                <Button color="primary" on:click={() => window.location.href = "https://github.com/REDasmOrg/REDasm/actions/workflows/build.yml"}>Open GitHub Actions</Button>
            </div>
            <div class="hidden mb-3">
                <div class="pb-1">Select a nightly build below:</div>
                <div class="row">
                    <div class="col">
                        <select class="form-select form-select-sm" bind:value={seldate}>
                            <option value=""></option>
                            {#each Object.keys(artifacts) as d}
                                <option value="{d}">{d}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="col-1"></div>
                    <div class="col-4"></div>
                </div>
            </div>
            <div class:hidden={!selartifacts.length}>
                Version:
                <div class="row">
                    <div class="col">
                        <select class="form-select form-select-sm" bind:value={selartifact}>
                            <option value=""></option>
                            {#each selartifacts as a, i}
                                <option value="{i}">{a.name} {getFileSize(a.size_in_bytes)} ({new Date(a.created_at).toLocaleTimeString()})</option>
                            {/each}
                        </select>
                    </div>
                    <div class="col-1">
                        <button class="btn btn-primary btn-sm" class:d-none={selartifact === ""} on:click={downloadArtifact}>Download</button>
                    </div>
                    <div class="col-4"></div>
                </div>
            </div>
        </div>
        <div class:hidden={currtab !== PAGES[2]}>
            <div class="mb-3">
                Unofficial packages created by the community.
            </div>
            <table class="w-full text-center">
                <thead>
                    <tr>
                        {#each PACKAGES.header as h}
                            <th class="border-b p-1">{h.label}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each PACKAGES.data as d}
                        <tr>
                            {#each PACKAGES.header as h}
                                <td class="p-1">
                                    {#if h.value === "url"}
                                        <Link href={d[h.value]}>{d[h.value]}</Link>
                                    {:else}
                                        {d[h.value]}
                                    {/if}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
</Tabs>
