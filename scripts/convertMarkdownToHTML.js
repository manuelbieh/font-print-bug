const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const showdown = require('showdown');
const showdownHighlight = require('showdown-highlight');
const prettier = require('prettier');

const converter = new showdown.Converter({
  extensions: ['gitbook-hints', showdownHighlight],
});

converter.setFlavor('github');

const convertFile = (filename) => {
  const prettierOptions = prettier.resolveConfig(__dirname + '/../.prettierrc');

  const rawFile = prettier.format(
    fs
      .readFileSync(`${__dirname}/../content/${filename}`, {
        encoding: 'utf-8',
      })
      // this is to circumvent a Showdown bug:
      // https://github.com/showdownjs/showdown/issues/653
      .replace(/\\\(/g, '(')
      .replace(/\\\)/g, ')'),
    {
      printWidth: 80,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5',
      semi: true,
      arrowParens: 'always',
      parser: 'markdown',
    }
  );

  const convertedFile = converter
    .makeHtml(rawFile)
    .replace(
      /<p>(.*)<img(.*)alt="(.*)"(.*)>(.*)<\/p>/g,
      '<p class="has-image">$1<span><img$2alt="$3"$4><span class="caption">$3</span></span>$5</p>'
    );

  return convertedFile;
};

const writeHtml = (filename, html) => {
  mkdirp.sync(path.dirname(`${__dirname}/../html/${filename}`));
  fs.writeFileSync(
    `${__dirname}/../html/${filename.replace(/(.md|.html)$/i, '.html')}`,
    html
  );
};

const wrapWithLayout = (html) => {
  const layout = fs.readFileSync(`${__dirname}/../templates/layout.html`, {
    encoding: 'utf-8',
  });

  return layout.replace(/{{\s*content\s*}}/, html);
};

const convertAndSave = (filename) => {
  const html = convertFile(filename);
  writeHtml(filename, wrapWithLayout(html));
};

convertAndSave('index.md');
