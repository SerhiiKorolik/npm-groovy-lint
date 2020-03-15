#! /usr/bin/env node
// Copy required files into jdeploy-bundle after bundle generation
"use strict";

// Imports
const fse = require('fs-extra');
const rimraf = require('rimraf');

// Reset dist folder
if (fse.existsSync('dist')) {
    rimraf.sync("dist");
    fse.mkdirSync('dist');
}
else {
    fse.mkdirSync('dist');
}

// Copy files into dist folder (where they will be taken by "jdeploy install" command and copied to jdeploy_bundle)
const filesToCopy =
    [
        "codenarc-caller.js",
        "codenarc-factory.js",
        "config.js",
        "groovy-lint.js",
        "groovy-lint-fix.js",
        "groovy-lint-rules.js",
        "index.js",
        "options.js",
        "output.js",
        "utils.js"
    ];

for (const fileName of filesToCopy) {
    const origin = `src/${fileName}`;
    const target = `dist/${fileName}`;
    fse.copyFileSync(origin, target);
    console.info(`GroovyLint: Copied ${origin} into ${target} `);
}

fse.copySync('.groovylintrc-recommended.js', 'dist/.groovylintrc-recommended.js');
console.info('GroovyLint: Copied .groovylintrc-recommended.js files into dist/.groovylintrc-recommended.js');

fse.copySync('.groovylintrc-all.js', 'dist/.groovylintrc-all.js');
console.info('GroovyLint: Copied .groovylintrc-all.js files into dist/.groovylintrc-all.js');

fse.copySync('src/rules', 'dist/rules');
console.info('GroovyLint: Copied src/rules files into dist/rules');

fse.copySync('lib', 'dist/lib');
console.info('GroovyLint: Copied lib files into dist/lib');

process.exit(0);
