Template.tweetsList.onCreated( function() {
  // var template = Template.instance();
  // template.tweets = new ReactiveVar( [] );
});

Template.tweetsList.onRendered( function() {

  Tracker.autorun( function( computation ) {

    var tweets = Tweets.find().fetch(),
        system;

    if ( tweets.length === 50 ) {
      new p5( function( sketch ) {

        var ParticleSystem = function(position) {
          // Figure out how to identify each circle's corresponding diameter.
          this.origin = position.copy();
          this.particles = [];
        };

        ParticleSystem.prototype.addParticle = function() {
          this.particles.push(new Particle(this.origin));
        };

        ParticleSystem.prototype.run = function( tweetLength ) {
          for (var i = this.particles.length-1; i >= 0; i--) {
            var particle = this.particles[i];
            particle.run( tweetLength );

            if ( particle.isDead() ) {
              this.particles.splice(i, 1);
            }
          }
        };

        // A simple Particle class
        var Particle = function(position) {
          this.acceleration = sketch.createVector(0, 0.05);
          this.velocity = sketch.createVector( sketch.random(-1, 1), sketch.random(-1, 0));
          this.position = position.copy();
          this.lifespan = 255.0;
        };

        Particle.prototype.run = function( tweetLength ) {
          this.update();
          this.display( tweetLength );
        };

        // Method to update position
        Particle.prototype.update = function(){
          this.velocity.add(this.acceleration);
          this.position.add(this.velocity);
          this.lifespan -= 2;
        };

        // Method to display
        Particle.prototype.display = function( diameter ) {
          sketch.stroke(200, this.lifespan);
          sketch.strokeWeight(2);
          sketch.fill(127, this.lifespan);
          sketch.ellipse(this.position.x, this.position.y, diameter, diameter );
        };

        // Is the particle still useful?
        Particle.prototype.isDead = function(){
          if (this.lifespan < 0) {
            return true;
          } else {
            return false;
          }
        };

        var tweet;

        sketch.setup = function() {
          sketch.createCanvas(720, 400);
          tweet = 0;
          // offset x-axis, y-axis of the entire particle drawing
          system = new ParticleSystem( sketch.createVector( sketch.width / 2, sketch.height / 2 ) );
        };

        sketch.draw = function() {
          tweet++;

          if ( tweet === 50 ) {
            tweet = 0;
          }

          var tweetLength = tweets[ tweet ].tweet.length;

          sketch.background( 51 );
          system.addParticle();
          system.run( tweetLength );
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
