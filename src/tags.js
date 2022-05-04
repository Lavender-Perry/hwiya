function getTags(post, site) {
    switch (site) {
        case "e926":
            return Object.values(post.tags).reduce((a, b) => a.concat(b));
        case "safebooru":
            return tagStrToTags(post.tags);
        default:
            throw "Bad site name";
    }
}

export function filterToTags(posts, tags, site) {
    return posts.filter(function(post) {
        const post_tags = getTags(post, site);
        for (const i in tags) {
            if (post_tags.indexOf(tags[i]) === -1) {
                return false;
            }
        }
        return true;
    });
}

export const tagStrToTags = str => str?.split(" ") ?? [];

