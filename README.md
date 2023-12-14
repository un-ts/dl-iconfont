# dl-iconfont

[![GitHub Actions](https://github.com/un-ts/dl-iconfont/workflows/CI/badge.svg)](https://github.com/un-ts/dl-iconfont/actions/workflows/ci.yml)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/un-ts/dl-iconfont.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/un-ts/dl-iconfont/context:javascript)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fun-ts%2Fdl-iconfont%2Fmain%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![npm](https://img.shields.io/npm/v/dl-iconfont.svg)](https://www.npmjs.com/package/dl-iconfont)
[![GitHub Release](https://img.shields.io/github/release/un-ts/dl-iconfont)](https://github.com/un-ts/dl-iconfont/releases)

[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![changesets](https://img.shields.io/badge/maintained%20with-changesets-176de3.svg)](https://github.com/atlassian/changesets)

An [iconfont][] downloader via [puppeteer][].

## TOC <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
  - [CLI](#cli)
    - [Environments](#environments)
    - [Command](#command)
  - [API](#api)
- [Sponsors](#sponsors)
- [Backers](#backers)
- [Changelog](#changelog)
- [License](#license)

## Install

```sh
# yarn
yarn global add dl-iconfont

# npm
npm i -g dl-iconfont
```

## Usage

### CLI

[dotenv][] is used inside the CLI, so you can simply create a `.env` file.

#### Environments

1. `ICONFONT_PROJECT` (optional, can be provided via `-p` option)
2. `ICONFONT_LOGIN` (optional, can be provided via `-l` option)
3. `ICONFONT_PASSWORD` (optional, can be provided via `-p` option)
4. `ICONFONT_DOWNLOAD_FILE` (optional, can be provided via `downloadFile` argument)
5. `PUPPETEER_HEADLESS` (optional, can be provided via `-h` option)

#### Command

`dli`, `dl-iconfont` and `iconfont-dl` are all available.

```sh
Usage: dli [options] [downloadFile]

Arguments:
  downloadFile              Filename path to be downloaded

Options:
  -V, --version             output the version number
  -p, --project <string>    Project ID from iconfont.cn
  -l, --login <string>      User login (mobile number) for iconfont.cn
  -p, --password <string>   User password for iconfont.cn
  -h, --headless <boolean>  Run in headless mode (default: true)
  --help                    display help for command
```

### API

```ts
import { fetchJsUrl, download } from 'dl-iconfont'

const jsUrl = await fetchJsUrl({ project, login, password, headless })

await download(jsUrl, 'iconfont.js')
```

## Sponsors

| 1stG                                                                                                                               | RxTS                                                                                                                               | UnTS                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective backers and sponsors](https://opencollective.com/1stG/organizations.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective backers and sponsors](https://opencollective.com/rxts/organizations.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective backers and sponsors](https://opencollective.com/unts/organizations.svg)](https://opencollective.com/unts) |

## Backers

| 1stG                                                                                                                             | RxTS                                                                                                                             | UnTS                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective backers and sponsors](https://opencollective.com/1stG/individuals.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective backers and sponsors](https://opencollective.com/rxts/individuals.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective backers and sponsors](https://opencollective.com/unts/individuals.svg)](https://opencollective.com/unts) |

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [Edisonsu768][]

[dotenv]: https://github.com/motdotla/dotenv
[edisonsu768]: https://github.com/Edisonsu768
[iconfont]: https://www.iconfont.cn
[mit]: http://opensource.org/licenses/MIT
[puppeteer]: https://github.com/puppeteer/puppeteer
