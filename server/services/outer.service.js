require('dotenv').config()
const Twit = require('twit')
const { RequestError } = require('../_helpers/request-error')
const https = require('https')
const fetch = require('node-fetch')

module.exports = {
    getTweetsByTitle,
    getJobsByTitle
}

const config = {
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET,
    app_only_auth: true
}
const twitterAPI = new Twit(config)

async function getTweetsByTitle({ search, date, count = 10 }) {
    if (!search) throw new RequestError("Search query missing", 400)

    var altDate = new Date()
    var currentDate = new Date()
    altDate.setDate(0)
    altDate.setDate(currentDate.getDate())

    const searchParams = { q: `#${search} since:${date? date: altDate.toISOString()}`, count }
    return twitterAPI.get('search/tweets', searchParams)
}

async function getJobsByTitle({ description = "", full_time = true, location = "", page = "0"}) {
    const url = `https://jobs.github.com/positions.json?` +
                `description=${description}&full_time=${full_time}&location=${location}&page=${page}`

    const response = await fetch(url)
    if (!response.ok) throw new RequestError(response.statusText, response.status)
    const data = await response.json()
    return data
}