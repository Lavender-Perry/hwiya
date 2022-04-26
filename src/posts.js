import * as https from "https"

export default let posts = {
    safebooru: undefined
};

export function getPosts(site) {
    const site_info = {
        // [hostname, path]
        safebooru: ["safebooru.org", "/index.php?page=dapi&s=post&q=index&json=1"]
    };
    const req = https.request({
        hostname: site_info[site][0],
        port: 443,
        path: site_info[site][1],
        method: "GET"
    }, res => res.on("data", data => posts[site] = data));
    req.on("error", console.error);

    setTimeout(getPosts, 3600000, site); // Repeat in 1 hour
}

