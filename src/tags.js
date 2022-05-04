function getTags(post, site) {
    switch (site) {
        case "e926":
            return post.tags.values().reduce((a, b) => a.concat(b));
        case "safebooru":
            return tagStrToTags(post.tags);
        default:
            throw "Bad site name";
    }
}

export function filterToTags(posts, tags, site) {
    return posts.filter(function(post) {
        const post_tags = getTags(post, site);
        for (const tag in tags) {
            if (post_tags.indexOf(tag) === -1) {
                return false;
            }
        }
        return true;
    });
}

export const tagStrToTags = str => str?.split(" ") ?? [];

