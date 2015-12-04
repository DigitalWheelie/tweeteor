Template.tweetsList.helpers({
    tweets: function() {
         return Tweets.find();
    },
    tweetscount: function() {
        return Tweets.find().count();
    }
});