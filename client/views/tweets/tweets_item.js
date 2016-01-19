// TODO: Simplify this into a single function that can be reused.
Template.tweetItem.helpers({
  tweetLength: function( tweet ) {
    return tweet.length;
  }
});
