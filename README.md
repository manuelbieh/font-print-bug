This is a sample repo to demonstrate a bug with Puppeteer and Dank Mono when saving an HTML document as PDF.

How to reproduce:

- clone this repo
- yarn install
- yarn start

You should now see a `printed.pdf` in the root directory.

Change `font-family` in `templates/layout.html:121` to `Courier New` (or basically anything but `Dank Mono`). It works!

You can open and print the HTML file (`html/index.html`) in Chrome and it should work perfectly fine. Just not in Puppeteer.
