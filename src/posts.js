import fetch from "node-fetch";

let posts = {
    safebooru: undefined
};

export default posts;

async function getPosts(site) {
    const urls = {
        safebooru: "https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1"
    };
    const ret = await fetch(urls[site]);
    if (!ret.ok) {
        console.log("Error getting " + site + " posts: " + ret.status);
        return;
    }
    posts[site] = await ret.json();

    setTimeout(getPosts, 3600000, site); // Repeat in 1 hour
}

getPosts("safebooru");

