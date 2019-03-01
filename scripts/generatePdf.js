const puppeteer = require('puppeteer');
const express = require('express');

const app = express();

app.use(express.static('html'));

const server = app.listen(3000, () => {
  console.log('server listening on http://localhost:3000');
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/index.html', {
      waitUntil: 'load',
    });

    await page.pdf({
      path: 'printed.pdf',
      format: 'A5',
      printBackground: true,
    });

    await browser.close();
    server.close();
  })();
});
