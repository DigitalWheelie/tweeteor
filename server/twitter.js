var Twit = Meteor.npmRequire('twit');

 var conf = JSON.parse(Assets.getText('twitter.json'));
 var T = new Twit({
     consumer_key: conf.consumer.key,
     consumer_secret: conf.consumer.secret,
     access_token: conf.access_token.key,
     access_token_secret: conf.access_token.secret});

 //
 // filter the twitter public stream
 //

var stream = T.stream('statuses/filter', { track: conf.keyword, language: 'en'  })

stream.on('tweet', Meteor.bindEnvironment(function (tweet) {
 var userName = tweet.user.name;
 var userScreenName = tweet.user.screen_name;
 var userTweet = tweet.text;
 var tweetDate = tweet.created_at;
 var profileImg = tweet.user.profile_image_url;

    Tweets.insert({user: userName, userscreen: userScreenName, tweet: userTweet, picture: profileImg, date: tweetDate}, function(error){
    if(error)
    console.log(error);
    });
}))
