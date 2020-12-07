import { program } from 'commander';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

export default () => {
  program
    .version(pkg.version, '-V, --version')
    .description(pkg.description)
    .option('-f, --format [type]', 'output format');

  program.arguments('<filepath1> <filepath2>');

  program.parse(process.argv);
};
