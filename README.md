# @jacobbubu/pull-utf8-decoder

[![Build Status](https://travis-ci.org/jacobbubu/pull-utf8-decoder.svg)](https://travis-ci.org/jacobbubu/pull-utf8-decoder)
[![Coverage Status](https://coveralls.io/repos/github/jacobbubu/pull-utf8-decoder/badge.svg)](https://coveralls.io/github/jacobbubu/pull-utf8-decoder)
[![npm](https://img.shields.io/npm/v/@jacobbubu/pull-utf8-decoder.svg)](https://www.npmjs.com/package/@jacobbubu/pull-utf8-decoder/)

> Rewite [pull-utf8-decoder](https://github.com/pull-stream/pull-utf8-decoder) in TypeScript.

## Usage

```bash
npm i @jacobbubu/pull-utf8-decoder
```

```ts
pull(
  // '¢' = [0xc2, 0xa2] in utf8
  pull.values([Buffer.from([0xc2], Buffer.from([0xa2]])),
  decode('utf8'),
  pull.collect(function(_, ary) {
    console.log(ary)  // ['¢']
  })
)
```
