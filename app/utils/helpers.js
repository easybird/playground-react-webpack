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
    return axios.get(`${url}`)
        .then((result) => {
            return {
                link: result.headers.link,
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
    },
    getNext(url){
        return getUsers(`${url}`);
    }
};

export default helpers;