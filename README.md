# gendiff
The tiny utility that compares two configuration files and shows a difference.

[![Actions Status](https://github.com/makewebspace/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/makewebspace/frontend-project-lvl2/actions)
[![Actions Status](https://github.com/makewebspace/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/makewebspace/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/bdb1000233387957e991/maintainability)](https://codeclimate.com/github/makewebspace/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bdb1000233387957e991/test_coverage)](https://codeclimate.com/github/makewebspace/frontend-project-lvl2/test_coverage)

[![asciicast](https://asciinema.org/a/CzyZMXYMr05SdMz8EATnQxsFm.svg)](https://asciinema.org/a/CzyZMXYMr05SdMz8EATnQxsFm)
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