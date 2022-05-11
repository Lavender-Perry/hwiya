import fetch from "node-fetch";

let posts = {
    e926: undefined,
    safebooru: undefined
};

export default posts;

export async function getPosts(site, tags = "") {
    const urls = {
        e926: "e926.net/posts.json?limit=100",
        safebooru: "safebooru.org/index.php?page=dapi&s=post&q=index&limit=100&json=1"
    };
    const ret = await fetch("https://" + urls[site] + "&tags=" + tags, {
        method: "GET",
        headers: {
            "User-Agent": "Hwiya"
        }
    });
    if (!ret.ok) {
        console.log("Error getting " + site + " posts: " + ret.status);
        return;
    }

    let rec_posts;
    try {
        rec_posts = site === "e926" ? (await ret.json()).posts : await ret.json();
    }
    catch {
        rec_posts = [];
    }

    if (tags !== "") {
        return rec_posts;
    }
    posts[site] = rec_posts;
    setTimeout(getPosts, 3600000, site); // Repeat in 1 hour
}

for (let key in posts) {
    getPosts(key);
}

