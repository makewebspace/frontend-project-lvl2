#!/usr/bin/env node
import program from 'commander';
import { readFile } from '../src/utils.js';
import genDiff from '../src/gendiff.js';

const pkg = JSON.parse(readFile('package.json'));

program
  .version(pkg.version, '-V, --version')
  .description(pkg.description)
  .option('-f, --format [type]', 'output format', 'stylish');

program
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, { format }) => {
    console.log(genDiff(filepath1, filepath2, format));
  });

program.parse(process.argv);
