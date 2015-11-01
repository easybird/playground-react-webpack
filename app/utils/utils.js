var utils = {
    getLink(link) {
        return link.substring(link.indexOf("<")+1,link.indexOf(">"));
    }
};

export default utils;