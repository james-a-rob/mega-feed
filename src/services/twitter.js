const { TwitterClient } = require('twitter-api-client');

const twitterClient = new TwitterClient({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
});


class Twitter {
    constructor(view){
        this.latestFollower = null;
        this.view = view;

    }
    async getLatestFollower(){
        const data = await twitterClient.accountsAndUsers.followersList({count:1}).catch((e)=>console.log(e));
        return data.users[0];
    }
   async init(){
        const latestFollower = await this.getLatestFollower();

        if(this.latestFollower && (latestFollower.id !== this.latestFollower)){
            this.view.onMessage({service: 'twitter', content: `you have a new follower ${latestFollower.screen_name}`});   

        }
        this.latestFollower = latestFollower.id;

        setTimeout(()=>{

            this.init();

        }, 20000);


    }

}

module.exports = Twitter;