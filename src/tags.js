const tagStrToTags = (str) => str?.split(" ") ?? [];

export default function filterToTags(posts, tags, site) {
    return posts.filter(function(post) {
        const post_tags = site === "e926" ? 
            Object.values(post.tags).flat() :
            tagStrToTags(post.tags);
        for (let tag of tagStrToTags(tags)) {
            if (post_tags.indexOf(tag) === -1) {
                return false;
            }
        }
        return true;
    });
}

