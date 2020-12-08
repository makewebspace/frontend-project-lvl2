# genDiff
The tiny utility that compares two configuration files and shows a difference.

[![Actions Status](https://github.com/makewebspace/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/makewebspace/frontend-project-lvl2/actions)

## Install
```bash
git clone https://github.com/makewebspace/frontend-project-lvl2.git
make install
gendiff -h
```

## Usage on your own code
```bash
npm install --save @hexlet/code
```

```javascript
import genDiff from '@hexlet/code';

const diff = genDiff(filepath1, filepath2);
console.log(diff);
```