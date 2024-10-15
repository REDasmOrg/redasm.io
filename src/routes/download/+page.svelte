<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import Table from "$lib/Table.svelte";

    const TABS = ["Releases", "Nightly Builds", "Packages"];
    let artifacts = [],
        releases = [],
        selartifacts = [],
        seldate = "",
        selartifact = "";

    $: selartifacts = seldate && seldate in artifacts ? artifacts[seldate] : [];

    const PACKAGES = {
        header: [
            { label: "OS", value: "os" },
            { label: "Package Name", value: "name" },
            { label: "URL", value: "url" },
        ],

        data: [
            {
                os: "Arch (Stable)",
                name: "redasm",
                url: "https://aur.archlinux.org/packages/redasm",
            },
            {
                os: "Arch (Git)",
                name: "redasm-git",
                url: "https://aur.archlinux.org/packages/redasm-git",
            },
            {
                os: "Debian",
                name: "redasm",
                url: "http://phd-sid.ethz.ch/debian/redasm",
            },
            {
                os: "Gentoo",
                name: "redasm",
                url: "https://gpo.zugaina.org/dev-util/redasm",
            },
            {
                os: "FreeBSD",
                name: "redasm",
                url: "https://www.freshports.org/devel/redasm",
            },
            {
                os: "Haiku",
                name: "redasm",
                url: "https://ports-mirror.haiku-os.org/redasm",
            },
        ],
    };

    let currtab = $page.url.searchParams.get("page") || TABS[0];
    if (!TABS.includes(currtab)) currtab = TABS[0];

    function getFileSize(bytes, si = false, dp = 1) {
        const thresh = si ? 1000 : 1024;
        if (Math.abs(bytes) < thresh) return bytes + " B";

        const units = si
            ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
            : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
        let u = -1;
        const r = 10 ** dp;

        do {
            bytes /= thresh;
            ++u;
        } while (
            Math.round(Math.abs(bytes) * r) / r >= thresh &&
            u < units.length - 1
        );

        return bytes.toFixed(dp) + " " + units[u];
    }

    function downloadArtifact() {
        window.location.href = selartifacts[selartifact].archive_download_url;
    }

    async function getReleases() {
        const URL =
            "https://raw.githubusercontent.com/REDasmOrg/redasm.dev/refs/heads/data/releases.json";

        try {
            const response = await fetch(URL);

            if (response.ok) {
                const releases = await response.json();

                return releases.reduce((acc, r) => {
                    if (r.draft || !r.assets.length) return acc;

                    for (let a of r.assets) {
                        acc.push({
                            version: r.tag_name,
                            prerelease: r.prerelease,
                            asset: {
                                name: a.name,
                                url: a.browser_download_url,
                                created: new Date(
                                    a.created_at,
                                ).toLocaleString(),
                                downloads: a.download_count,
                                size: a.size,
                            },
                        });
                    }

                    return acc;
                }, []);
            } else console.error(response.statusText);
        } catch (error) {
            console.error(error.messasge);
        }

        return [];
    }

    async function getArtifacts() {
        // let response = await fetch("/api/artifacts");
        // if (!response.ok) return [];
        //
        // let artifacts = (await response.json()).artifacts;
        //
        // let r = artifacts.reduce((acc, a) => {
        //     let date = new Date(a.created_at).toLocaleDateString();
        //     if (!(date in acc)) acc[date] = [];
        //     acc[date].push(a);
        //     return acc;
        // }, {});

        //console.log(r);
        return [];
    }

    onMount(async () => {
        releases = await getReleases();
        artifacts = await getArtifacts();
    });
</script>

<ul class="nav nav-tabs">
    {#each TABS as t}
        <li class="nav-item">
            <a
                href="#"
                class="nav-link"
                class:active={currtab === t}
                on:click|preventDefault={() => (currtab = t)}>{t}</a
            >
        </li>
    {/each}
</ul>
<div class="my-3">
    <div class:d-none={currtab !== TABS[0]}>
        <div class="mb-3">
            <Table header={["Name", "Size", "Date", "Version", "Downloads"]}>
                {#each releases as r}
                    <tr>
                        <td>
                            <div class="d-flex">
                                <div class="flex-fill">
                                    <a href={r.asset.url}>{r.asset.name}</a>
                                </div>
                                {#if r.prerelease}
                                    <div
                                        class="mx-2 badge bg-warning text-dark text-uppercase"
                                    >
                                        Prerelease
                                    </div>
                                {/if}
                            </div></td
                        >
                        <td class="col-1">{getFileSize(r.asset.size)}</td>
                        <td class="col-2">{r.asset.created}</td>
                        <td class="col-2">{r.version}</td>
                        <td class="col-1">{r.asset.downloads}</td>
                    </tr>
                {/each}
            </Table>
        </div>
    </div>
    <div class:d-none={currtab !== TABS[1]}>
        <div class="mb-3">
            Nightly builds are provided by <a
                href="https://github.com/REDasmOrg/REDasm/actions/workflows/build.yml"
                >GitHub Actions</a
            >.<br />
            They provides the latest features and bugfixes, but they can be unstable.
        </div>
        <div class="d-flex justify-content-center">
            <button
                class="btn btn-primary"
                on:click={() =>
                    window.open(
                        "https://github.com/REDasmOrg/REDasm/actions/workflows/build.yml",
                    )}>Open GitHub Actions</button
            >
        </div>
        <div class="d-none mb-3">
            <div class="pb-1">Select a nightly build below:</div>
            <div class="row">
                <div class="col">
                    <select
                        class="form-select form-select-sm"
                        bind:value={seldate}
                    >
                        <option value=""></option>
                        {#each Object.keys(artifacts) as d}
                            <option value={d}>{d}</option>
                        {/each}
                    </select>
                </div>
                <div class="col-1"></div>
                <div class="col-4"></div>
            </div>
        </div>
        <div class:d-none={!selartifacts.length}>
            Version:
            <div class="row">
                <div class="col">
                    <select
                        class="form-select form-select-sm"
                        bind:value={selartifact}
                    >
                        <option value=""></option>
                        {#each selartifacts as a, i}
                            <option value={i}
                                >{a.name}
                                {getFileSize(a.size_in_bytes)} ({new Date(
                                    a.created_at,
                                ).toLocaleTimeString()})</option
                            >
                        {/each}
                    </select>
                </div>
                <div class="col-1">
                    <button
                        class="btn btn-primary btn-sm"
                        class:d-none={selartifact === ""}
                        on:click={downloadArtifact}>Download</button
                    >
                </div>
                <div class="col-4"></div>
            </div>
        </div>
    </div>
    <div class:d-none={currtab !== TABS[2]}>
        <div class="mb-3">Unofficial packages created by the community.</div>
        <table class="table table-dark table-hover text-nowrap">
            <thead>
                <tr>
                    {#each PACKAGES.header as h}
                        <th>{h.label}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each PACKAGES.data as d}
                    <tr>
                        {#each PACKAGES.header as h}
                            <td>
                                {#if h.value === "url"}
                                    <a href={d[h.value]}>{d[h.value]}</a>
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
</div>
