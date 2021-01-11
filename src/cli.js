import program from 'commander';
import { readFile } from './utils.js';
import genDiff from './gendiff.js';

const pkg = JSON.parse(readFile('package.json'));

export default () => {
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
};
