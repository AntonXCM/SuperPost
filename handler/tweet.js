const { TwitterApi } = require("twitter-api-v2");
//WARNING: Twitter Api is paid. Free plan doesn't allow posting messages

async function send(text){
    const API_KEY = process.env.TWITTER_APP_KEY;
    if(!API_KEY) return { error: "twitter api key missing" };
    const API_SECRET = process.env.TWITTER_APP_SECRET;
    if(!API_SECRET) return { error: "twitter api secret missing" };
    const ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
    if(!ACCESS_TOKEN) return { error: "twitter access token missing" };
    const ACCESS_SECRET = process.env.TWITTER_ACCESS_SECRET;
    if(!ACCESS_SECRET) return { error: "twitter access secret missing" };

    const client = new TwitterApi({
        appKey: API_KEY,
        appSecret: API_SECRET,
        accessToken: ACCESS_TOKEN,
        accessSecret: ACCESS_SECRET
    });
    return client.readWrite.v2.tweet(text);
}
module.exports = {send};