import axios from 'axios';

function getRepos(username) {
    return axios.get(`https://api.github.com/users/${username}/repos`);
}

function getUserInfo(username) {
    return axios.get(`https://api.github.com/users/${username}`);
}

function getUsersUrl(totalUsers) {
    return `https://api.github.com/search/users?q=location%3Abelgium&per_page=${totalUsers}`;
}

function getUsers(url) {
    var users = [];
    var totalCount = 0;
    return axios.get(`${url}`)
        .then((result) => {
            console.log(result.headers.link);
            totalCount = totalCount+result.data.items.length;
            console.log(result.data.items);
            
            users.push(result.data.items);
            //if (totalCount<totalUsers){
            //
            //}
            return {
                users: result.data.items
            }
        });
}

var helpers = {
    getGithubInfo(username) {
        return axios.all([
            getRepos(username),
            getUserInfo(username)
        ])
            .then((arr) => {
                return {
                    repos: arr[0].data,
                    bio: arr[1].data
                }
            });
    },
    getBelgiumUsers(totalUsers) {
        return getUsers(getUsersUrl(totalUsers));
    }
};

export default helpers;