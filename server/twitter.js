var Twit = Meteor.npmRequire('twit');

 var conf = JSON.parse(Assets.getText('twitter.json'));
T = new Twit({
     consumer_key: conf.consumer.key,
     consumer_secret: conf.consumer.secret,
     access_token: conf.access_token.key,
     access_token_secret: conf.access_token.secret});

var removeTweets = function() {
  Tweets.remove({});
};

Meteor.methods({
  resetStream: function() {
    removeTweets();
  },
  startStream: function( hashtag ) {
    removeTweets();

    T.get('search/tweets', {
      q: "#" + hashtag,
      count: 50
    }, Meteor.bindEnvironment(function( err, data, response ) {
      var statuses = data.statuses;

      for ( var i = 0; i < statuses.length; i++ ) {
        var tweet = statuses[ i ];
        var userName = tweet.user.name;
        var userScreenName = tweet.user.screen_name;
        var userTweet = tweet.text;
        var tweetDate = tweet.created_at;
        var profileImg = tweet.user.profile_image_url;

         Tweets.insert({
           user: userName,
           userscreen: userScreenName,
           tweet: userTweet,
           picture: profileImg,
           date: tweetDate
         }, function(error){
           if(error) {
             console.log(error);
           }
         });
      }
    }));
  }
});
