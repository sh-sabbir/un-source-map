[![npm version](https://badge.fury.io/js/un-source-map.svg)](https://badge.fury.io/js/un-source-map)
[![Twitter](https://img.shields.io/twitter/url/https/www.npmjs.com/package/un-source-map.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fun-source-map)

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