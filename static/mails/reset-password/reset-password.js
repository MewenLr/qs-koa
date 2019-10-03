module.exports = (ctx, data) => `
<mjml>
  <mj-head>
    <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />
  </mj-head>
  <mj-body>
    <mj-raw><!-- Image Header --></mj-raw>
    <mj-section padding="0">
      <mj-column width="600px">
        <mj-image padding="0" src="http://1.bp.blogspot.com/-TPrfhxbYpDY/Uh3Refzk02I/AAAAAAAALw8/5sUJ0UUGYuw/s1600/New+York+in+The+1960's+-+70's+(2).jpg" />
      </mj-column>
    </mj-section>
    <mj-raw><!-- Intro text --></mj-raw>
    <mj-section background-color="#fafafa">
      <mj-column width="400px">
        <mj-text font-size="20px" font-family="Roboto" color="#626262" align="center">${ctx.i18n.__('mail.reset-pwd.title')}</mj-text>
        <mj-text color="#525252" font-family="Roboto" align="center">${ctx.i18n.__('mail.reset-pwd.body')}</mj-text>
        <mj-button background-color="#F45E43" href="http://www.mywebsite.fr/reset-password?token=${data.token}">${ctx.i18n.__('mail.reset-pwd.cta')}</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`
