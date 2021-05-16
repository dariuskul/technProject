require('dotenv').config()
const Twit = require('twit')
const { RequestError } = require('../_helpers/request-error')

module.exports = {
    getTweetsByTitle
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