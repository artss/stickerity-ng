const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');
const babel = require('babel-core');

const srcDir = './src';
const destDir = './dist';

glob(path.join(srcDir, '**/*.{js,json,txt}'), (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    const src = path.parse(file);

    const relDir = path.relative(srcDir, src.dir);

    const dest = path.format({
      dir: path.join(destDir, relDir),
      name: src.name,
      ext: src.ext,
    });

    mkdirp.sync(path.dirname(dest));

    if (['.json', '.txt'].includes(src.ext)) {
      fs.createReadStream(file)
        .pipe(fs.createWriteStream(dest));
    } else {
      const result = babel.transformFileSync(file, { babelrc: true });
      fs.writeFileSync(dest, result.code);
    }
  });
});
