const { Octokit } = require('octokit')
require('dotenv').config();

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

const handleError = (e, res) => {
    if (e.status == 404) {
        res.status(404).send({ error: "Not found" })
    } else {
        console.log(e)
        res.status(500).send({ error: "GitHub API error" })
    }
}

const getAllUsers = async (req, res) => {
    const since = req.query.since ? req.query.since : 0;
    const per_page = req.query.per_page ? req.query.per_page : 30

    try {
        response = await octokit.request('GET /users?since={since}&per_page={per_page}', { since, per_page })
    } catch (e) {
        handleError(e, res)
    }

    res.send(response.data.map((user) => { return { id: user.id, login: user.login } } ))
}

const getUser = async function (req, res) {
    const username = req.params.username;

    let response
    try {
        response = await octokit.request('GET /users/{username}', { username })
    } catch (e) {
        handleError(e, res)
        return
    }
    
    const data = response.data
    res.send({
        id: data.id,
        login: data.login,
        avatar_url: data.avatar_url,
        bio: data.bio,
        url: data.html_url,
        created_at: data.created_at
    })
}

const getUserRepos = async (req, res) => {
    const username = req.params.username;

    let response
    try {
        response = await octokit.request('GET /users/{username}/repos', { username })
    } catch (e) {
        handleError(e, res)
        return
    }

    res.send(response.data.map((repo) => { return { id: repo.id, full_name: repo.full_name, url: repo.html_url } }))
}


module.exports = { getUser, getUserRepos, getAllUsers }