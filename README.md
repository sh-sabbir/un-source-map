[![npm version](https://badge.fury.io/js/@sabbirshouvo%2Fun-source-map.svg)](https://badge.fury.io/js/@sabbirshouvo%2Fun-source-map)
[![GitHub issues](https://img.shields.io/github/issues/sh-sabbir/un-source-map)](https://github.com/sh-sabbir/un-source-map/issues)
[![GitHub stars](https://img.shields.io/github/stars/sh-sabbir/un-source-map)](https://github.com/sh-sabbir/un-source-map/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/sh-sabbir/un-source-map)](https://github.com/sh-sabbir/un-source-map/network)
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40sabbirshouvo%2Fun-source-map)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40sabbirshouvo%2Fun-source-map)

# Un-Source-Map (unmap)

### CLI to Unpack your JS source maps to original files and folders in a proper way.  


## Install
npm:
```shell
npm install -g @sabbirshouvo/un-source-map
```
yarn:
```shell
yarn global add  @sabbirshouvo/un-source-map
```

## Usage
```shell
unmap [options] [source]
```

`source` is a required parameter, it can also be a directory.

If `source` is a directory, `unmap` will traverse all the files in this directory and deal each file.

## Examples

```shell
unmap bundle.js.map
unmap bundle.js.map -o app
```