Template.tweetsList.onCreated( function() {
  // var template = Template.instance();
  // template.tweets = new ReactiveVar( [] );
});

Template.tweetsList.onRendered( function() {

  Tracker.autorun( function( computation ) {

    var tweets = Tweets.find().fetch();

    if ( tweets.length === 50 ) {
      new p5( function( sketch ) {

        sketch.setup = function() {
          sketch.createCanvas(720, 400);
        };

        sketch.draw = function() {
          var count = 0;

          for ( var i = 0; i < tweets.length; i++ ) {
            // x, y, width, height
            var diameter = tweets[i].tweet.length,
                offset   = 100;

            sketch.ellipse( offset + i, offset + i, diameter, diameter);
            sketch.noFill();
            count++;
          }

          if ( count === 50 ) {
            sketch.noLoop();
          }
        };

      }, "tweets-sketch" );
      computation.stop();
    }
  });
});

Template.tweetsList.helpers({
    tweets: function() {
      return Tweets.find();
    },
    tweetscount: function() {
        return Tweets.find().count();
    },
    drawTweets: function( tweet ) {
      Template.instance().tweets.
      console.log( tweet.tweet.length );
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
