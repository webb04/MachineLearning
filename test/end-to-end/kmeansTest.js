// .verify.visible('#username')
// .verify.visible('#password')
// .verify.value( 'input[type=submit]', 'Log In' )
// .verify.elementNotPresent('.error')

module.exports = {
  'kmeans shows on homepage': function(client) {
    client
    .url('http://machine-learning-analytics.herokuapp.com')
    .waitForElementVisible( 'body', 1000 )
    .verify.containsText('.card.medium:nth-child(2)', 'K-Means Clustering')
  },

  'kmeans link works on homepage': function (client) {
    client
    .url('http://machine-learning-analytics.herokuapp.com')
    .click(".card.medium:nth-child(2) a", function(response) {
      this.assert.ok(client === this, "Check if the context is right.");
      this.assert.ok(typeof response == "object", "We got a response object.");
    });
  },

  'kmeans form validation works': function (client) {
    client
    .url('http://machine-learning-analytics.herokuapp.com')
  },

  'kmeans visualisation is shown': function (client) {
    client
    .url('http://machine-learning-analytics.herokuapp.com')
  },

  after : function(client) {
    client.end();
  }
}
