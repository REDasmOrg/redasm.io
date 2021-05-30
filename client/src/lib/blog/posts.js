const allposts = import.meta.globEager("/src/blog/*.md");

export function getPostUrl(path) {
    let res = /\/src\/blog\/(.+)\.md$/.exec(path);
    if(!res) return undefined;
    let url = encodeURIComponent(res[1]);
    return `/blog/${url}`;
}

export function getPost(postid) {
    let fn = decodeURIComponent(postid);
    postid = `/src/blog/${fn}.md`;
    return (postid in allposts) ? allposts[postid] : undefined;
}

export let posts = [ ];

for(let [path, post] of Object.entries(allposts)) {
    post.attributes.date = new Date(post.attributes.date);
    post.attributes.url = getPostUrl(path);
    post.attributes.path = path;
}

posts = Object.values(allposts).sort((p1, p2) => p2.attributes.date - p1.attributes.date);
