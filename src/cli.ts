import './env.js'

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { program } from 'commander'

import { download, fetchJsUrl, FetchOptions } from './index.js'

const {
  ICONFONT_PROJECT,
  ICONFONT_LOGIN,
  ICONFONT_PASSWORD,
  ICONFONT_DOWNLOAD_FILE,
  PUPPETEER_HEADLESS,
} = process.env

await program
  .version(
    (
      JSON.parse(
        await fs.readFile(
          path.resolve(fileURLToPath(import.meta.url), '../../package.json'),
          'utf8',
        ),
      ) as {
        version: string
      }
    ).version,
  )
  .requiredOption(
    '-p, --project <string>',
    'Project ID from iconfont.cn',
    ICONFONT_PROJECT,
  )
  .requiredOption(
    '-l, --login <string>',
    'User login (mobile number) for iconfont.cn',
    ICONFONT_LOGIN,
  )
  .requiredOption(
    '-p, --password <string>',
    'User password for iconfont.cn',
    ICONFONT_PASSWORD,
  )
  .option(
    '-h, --headless <boolean>',
    'Run in headless mode',
    !['0', 'false'].includes(PUPPETEER_HEADLESS!),
  )
  .argument(
    '[downloadFile]',
    'Filename path to be downloaded',
    ICONFONT_DOWNLOAD_FILE,
  )
  .action(async (downloadFile: string, options: FetchOptions) => {
    const jsUrl = await fetchJsUrl(options)

    if (downloadFile) {
      console.log(
        `[dl-iconfont]: downloading \`${jsUrl!}\` into \`${downloadFile}\``,
      )
      await download(jsUrl!, downloadFile)
    } else {
      console.log(
        '[dl-iconfont] no `downloadFile` provided, you can use the environment variable or `dli ICONFONT_DOWNLOAD_FILE` to download the js file automatically',
      )
      console.log(`[dl-iconfont]: ${jsUrl!}`)
    }
  })
  .parseAsync(process.argv)
