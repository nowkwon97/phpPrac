const express = require('express');
const { execSync } = require('child_process');

const app = express();

app.use((req, res, next) => {
  const phpFile = `./public${req.path}.php`;
  const command = `php-cgi ${phpFile}`;

  try {
    const output = execSync(command).toString();
    res.send(output);
  } catch (error) {
    next();
  }
});

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
