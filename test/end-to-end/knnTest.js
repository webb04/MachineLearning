module.exports = {
  'knn shows on homepage': function(client) {
    client
    .url('http://machine-learning-analytics.herokuapp.com')
    .waitForElementVisible( 'body', 1000 )
    .verify.containsText('.card.medium:nth-child(1)', 'K-Nearest Neighbours')
  },

  'knn link works on homepage': function (client) {
    client
    .url('http://machine-learning-analytics.herokuapp.com')
    .click(".card.medium:nth-child(1) a", function(response) {
      this.assert.ok(client === this, "Check if the context is right.");
      this.assert.ok(typeof response == "object", "We got a response object.");
    });
  },

  'knn form validation works': function (client) {
    client
    .url('http://machine-learning-analytics.herokuapp.com')
  },

  'knn visualisation is shown': function (client) {
    client
    .url('http://machine-learning-analytics.herokuapp.com')
  },

  after : function(client) {
    client.end();
  }
}
