This is a sample repo to demonstrate a bug with Puppeteer and [Dank Mono](https://dank.sh) when saving an HTML document as PDF.

How to reproduce:

- clone this repo
- yarn install
- yarn start

You should now see a `printed.pdf` in the root directory. This PDF does not contain certain characters (like the `f` in `function` or the `//` from the comment).

Change `font-family` in `templates/layout.html:121` to `Courier New` (or basically anything but `Dank Mono`). It works!

Sample files: [Dank Mono](printed-dank.pdf), [Courier New](printed-courier.pdf)

You can open and print the HTML file (`html/index.html`) in a real non-headless Chrome and it works perfectly fine but not in Puppeteer.

Happens on Windows 10 v1809, Build 17763.316
