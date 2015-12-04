Template.tweetsList.helpers({
    tweets: function() {
         return Tweets.find();
    },
    tweetscount: function() {
        return Tweets.find().count();
    },
    tedIsCool: function() {
      return "Hi, Ted!";
    }
});

Template.tweetsList.events({
  'click button': function( event, template ) {
    var hashtag = template.find( '[name="hashtagSearch"]' ).value;

    Meteor.call( 'startStream', hashtag, function( error, response ) {
      if ( error ) {
        console.log( error );
      } else {
        console.log( response );
      }
    });
  }
});
