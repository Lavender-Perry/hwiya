export const tagStrToTags = (str) => str?.split(" ") ?? [];

export function filterToTags(posts, tags, site) {
    return posts.filter(function(post) {
        const post_tags = site === "e926" ? 
            Object.values(post.tags).flat() :
            tagStrToTags(post.tags);
        for (let i in tags) {
            if (post_tags.indexOf(tags[i]) === -1) {
                return false;
            }
        }
        return true;
    });
}

