import fetch from "node-fetch";

let posts = {
    e926: undefined,
    safebooru: undefined
};

export default posts;

async function getPosts(site) {
    const urls = {
        e926: "e926.net/posts.json?limit=100",
        safebooru: "safebooru.org/index.php?page=dapi&s=post&q=index&limit=100&json=1"
    };
    const ret = await fetch("https://" + urls[site], {
        method: "GET",
        headers: {
            "User-Agent": "Hwiya"
        }
    });
    if (!ret.ok) {
        console.log("Error getting " + site + " posts: " + ret.status);
        return;
    }
    posts[site] = await ret.json();
    console.log(posts.e926); // Temporary

    setTimeout(getPosts, 3600000, site); // Repeat in 1 hour
}

for (let key in posts) {
    getPosts(key);
}

