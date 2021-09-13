import './env.js'

import { download, fetchJsUrl } from './index.js'

const {
  ICONFONT_PROJECT_ID,
  ICONFONT_LOGIN,
  ICONFONT_PASSWORD,
  ICONFONT_DOWNLOAD_FILE,
  PUPPETEER_HEADLESS,
} = process.env

const DOWNLOAD_FILE = process.argv[2] || ICONFONT_DOWNLOAD_FILE

const main = async () => {
  const jsUrl = await fetchJsUrl({
    projectId: ICONFONT_PROJECT_ID!,
    login: ICONFONT_LOGIN!,
    password: ICONFONT_PASSWORD!,
    headless: !['0', 'false'].includes(PUPPETEER_HEADLESS!),
  })
  if (DOWNLOAD_FILE) {
    console.log(
      `[dl-iconfont]: downloading \`${jsUrl!}\` into \`${DOWNLOAD_FILE}\``,
    )
    await download(jsUrl!, DOWNLOAD_FILE)
  } else {
    console.log(
      '[dl-iconfont] no `ICONFONT_DOWNLOAD_FILE` provided, you can use the environment variable or `dli ICONFONT_DOWNLOAD_FILE` to download the js file automatically',
    )
    console.log(`[dl-iconfont]: ${jsUrl!}`)
  }
}

main().catch((err: Error) => {
  console.error(err)
  process.exitCode = 1
})
