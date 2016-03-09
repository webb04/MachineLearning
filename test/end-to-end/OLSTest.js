// .verify.visible('#password')
// .verify.value( 'input[type=submit]', 'Log In' )
// .verify.elementNotPresent('.error')
// this.verify.containsText('#algorithmTitle', 'OLS');


module.exports = {
  'ols shows on homepage': function(client) {
    client
    .url('http://machine-learning-analytics.herokuapp.com')
    .waitForElementVisible( 'body', 1000 )
    .verify.containsText('.card.medium:nth-child(3)', 'Linear Regression')
  },

  'ols link works on homepage': function (client) {
    client
    .url('http://machine-learning-analytics.herokuapp.com')
    .click(".card.medium:nth-child(3) a", function(response) {
      this.assert.ok(client === this, "Check if the context is right.");
      this.assert.ok(typeof response == "object", "We got a response object.");
    });
  },

  'ols form validation works': function (client) {
    client
    .url('http://machine-learning-analytics.herokuapp.com')
  },

  'ols visualisation is shown': function (client) {
    client
    .url('http://machine-learning-analytics.herokuapp.com')
  },

  'ols input works': function (client) {
    client
    .url('http://machine-learning-analytics.herokuapp.com')
  },

  after : function(client) {
    client.end();
  }
}
