#!/usr/bin/env node

import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as chalk from 'chalk';
import { Command } from 'commander';
import { SourceMapConsumer } from 'source-map';
import { extname, dirname, join, isAbsolute } from 'path';

const program = new Command();
const version = '1.0.0';
let outputDir = '';

/* Method: Prints Asccii logo with some informations */
const printHeader = () => {
    console.log(`
${chalk.magenta(`█░█ █▄░█ █▀▄▀█ ▄▀█ █▀█`)}
${chalk.green(`█▄█ █░▀█ █░▀░█ █▀█ █▀▀`)}
`);
    console.log(chalk.white('Version:'), chalk.green(version));
    console.log('CLI tool to unpack from sourcemap');
    console.log();
};

/* Main entry point to the CLI */
program
    .name('unmap')
    .version(version, '-v, -V', 'output the current version')
    .argument('[source]', 'enter path to sourcemap')
    .option('-o, --output <path>', 'path to output dir', '')
    .description('CLI tool to unpack from sourcemap')
    .action((source, options) => {
        if (!source) {
            console.log();
            printHeader();
            console.log();
            console.log();
            console.log(
                chalk.white('To get started please type'),
                chalk.green('unmap -h'),
                chalk.white('and hit enter'),
            );
            console.log();
        } else {
            const hasOutput = options.output ? true : false;

            if (hasOutput) {
                outputDir = isAbsolute(options.output)
                    ? options.output
                    : join(process.cwd(), options.output);
                outputDir += outputDir.endsWith('/') ? '' : '/';
            }

            const pathToMap = isAbsolute(source)
                ? source
                : join(process.cwd(), source);

            fs.lstat(pathToMap, (err, stats) => {
                if (err) {
                    console.log();
                    return console.log(
                        chalk.red('Error:'),
                        chalk.white(
                            `${pathToMap} is not a valid directory or .map file`,
                        ),
                    );
                }
                const isDir = stats.isDirectory();
                if (isDir) {
                    fs.readdir(pathToMap, function (err, files) {
                        const mapFiles = files.filter(
                            (el) => extname(el) === '.map',
                        );
                        // Make sure source file for map exists
                        let sourceMaps = mapFiles.filter((file) => {
                            let fileName = file.replace('.js.map', '.js');
                            return files.indexOf(fileName) >= 0;
                        });
                        processSourceMap(sourceMaps, pathToMap).then(() => {
                            console.log();
                            console.log(
                                chalk.green(
                                    `🎉  ${chalk.bold(
                                        'All done!',
                                    )} Yet another mission to save 🌎 completed successfully!`,
                                ),
                            );
                        });
                    });
                } else {
                    let sourceMaps = pathToMap;
                    processSourceMap(sourceMaps, '').then(() => {
                        console.log();
                        console.log(
                            chalk.green(
                                '🎉  All done! Yet another mission to save 🌎 completed successfully!',
                            ),
                        );
                    });
                }
            });
        }
    });

/* Parse the CLI command */
program.parse();

/* Mehtod: Process Sourcemap files and starts to unpack them */
const processSourceMap = async (sourceMaps: any, rootPath: string) => {
    let promises = [];
    if (rootPath) {
        const fileCount = sourceMaps.length;
        const tFile = fileCount > 1 ? 'files' : 'file';
        console.log('Starting process...');
        delayIt(300);
        console.log(
            chalk.green(`Found ${chalk.bold(fileCount)} sourcemap ${tFile}`),
        );
        delayIt(100);
        console.log('.');
        console.log('.');
        sourceMaps.forEach((source: string, index: number) => {
            promises.push(
                new Promise((resolve, reject) => {
                    unmapThis(
                        rootPath + source,
                        source,
                        `${index + 1}/${fileCount}`,
                    ).then(() => {
                        resolve(1);
                    });
                }),
            );
        });
    } else {
        promises.push(
            new Promise((resolve, reject) => {
                unmapThis(sourceMaps).then(() => {
                    resolve(1);
                });
            }),
        );
    }
    await Promise.all(promises);
};

/* Method: Unpacks sources from sourcemap. Shows porgress accordingly */
const unmapThis = async (
    path: string,
    currentSource = '',
    currentIndex = '',
) => {
    try {
        const mapFile = fs.readFileSync(path, 'utf8');
        await SourceMapConsumer.with(mapFile, null, (consumer) => {
            console.log(
                chalk.green.bold(`Processing ${currentIndex}:`),
                currentSource,
            );
            let sources = consumer.sources;
            sources = sources.filter((source) => {
                return !source.includes('/webpack');
            });
            const localCount = sources.length;
            console.log(` - Found ${localCount} files`);
            console.log(chalk.magenta(` - Unpacking 🛍  your sourcemap 🗺`));
            sources.forEach((source, index) => {
                console.log(` - [ ${index + 1}/${localCount}]`, source);
                const WEBPACK_SUBSTRING_INDEX = 10;
                const content = consumer.sourceContentFor(source) as string;
                let filePath = source.substring(WEBPACK_SUBSTRING_INDEX);
                if (outputDir) {
                    filePath = outputDir + filePath;
                }
                mkdirp.sync(dirname(filePath));
                fs.writeFileSync(filePath, content);
                delayIt(50);
            });
            console.log(chalk.green(` - 🎉 Done!`));
        });
        delayIt(100);
    } catch (err) {
        console.log(chalk.red('Oops! Something is wrong happened here!'));
        console.log('\n', err);
    }
};

/* Method: Adds some delay to the universe ;) */
const delayIt = (milliseconds: number) => {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
};
