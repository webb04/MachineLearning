module.exports = {
  'Login Page Initial Render': function( _browser ) {
    _browser
    .url('http://dev.matthewroach.me/login/')
    .waitForElementVisible( 'body', 1000 )
    .verify.visible('#username')
    .verify.visible('#password')
    .verify.value( 'input[type=submit]', 'Log In' )
    .verify.elementNotPresent('.error')
  }
}
