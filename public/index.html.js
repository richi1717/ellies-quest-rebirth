// This is a template literal so you can conditionally load things like analytics based on environment variables
module.exports = () => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Ellie's Quest Rebirth</title>
    <link href="/styles.css" rel="stylesheet" />
    <link rel="icon" type="image/ico" href="./favicon.ico"/>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="appRender"></div>
    <script type="text/javascript" src="/bundle.js" charset="utf-8"></script>
  </body>
</html>`;