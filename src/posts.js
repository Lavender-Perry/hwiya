import fetch from "node-fetch";

export const sites = {
    e926: {
        url: "e926.net/posts.json?limit=100",
        getURLs: (post) => ({
            post: `https://e926.net/posts/${post.id}`,
            file: post.file.url
        })
    },
    safebooru: {
        url: "safebooru.org/index.php?page=dapi&s=post&q=index&limit=100&json=1",
        getURLs: (post) => ({
            post: `https://safebooru.org/index.php?page=post&s=view&id=${post.id}`,
            file: `https://safebooru.org/images/${post.directory}/${post.image}`
        })
    }
};

export async function getPosts(site, tags = "") {
    const ret = await fetch("https://" + sites[site].url + "&tags=" + tags, {
        method: "GET",
        headers: {
            "User-Agent": "Hwiya"
        }
    });
    if (!ret.ok) {
        console.log("Error getting " + site + " posts: " + ret.status);
        return;
    }

    try {
        return site === "e926" ? (await ret.json()).posts : await ret.json();
    }
    catch {
        return [];
    }
}

