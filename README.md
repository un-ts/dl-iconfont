# dl-iconfont

An iconfont downloader for [iconfont](https://www.iconfont.cn) via [puppeteer](https://github.com/puppeteer/puppeteer).

## Install

```sh
# yarn
yarn global add dl-iconfont

# npm
npm i -g dl-iconfont
```

## Usage

### CLI

[dotenv](https://github.com/motdotla/dotenv) is used inside the CLI, so you can simply create a `.env` file.

#### Environments

1. `ICONFONT_PROJECT_ID` (required)
2. `ICONFONT_LOGIN` (required)
3. `ICONFONT_PASSWORD` (required)
4. `ICONFONT_DOWNLOAD_FILE` (optional)
5. `PUPPETEER_HEADLESS` (optional)

### Command

```sh
# [iconfont.js] is optional, it can be provided via env `ICONFONT_DOWNLOAD_FILE` too
dli iconfont.js
```

### API

```ts
import { fetchJsUrl, download } from 'dl-iconfont'

const jsUrl = await fetchJsUrl({ projectId, login, password, headless })
await download(jsUrl, 'iconfont.js')
```

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][]

[mit]: http://opensource.org/licenses/MIT
