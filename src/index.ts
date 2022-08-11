import fs from 'node:fs/promises'

import got from 'got'
import puppeteer from 'puppeteer'

const ICONFONT_URL = 'https://www.iconfont.cn/'

const VIEWPORT = { height: 1920, width: 1280 }

export interface FetchOptions {
  project: string
  login: string
  password: string
  headless?: boolean
}

export const fetchJsUrl = async ({
  project,
  login,
  password,
  headless = true,
}: FetchOptions) => {
  if (!project || !login || !password) {
    throw new Error('`project`, `login` and `password` must all be provided')
  }

  const browser = await puppeteer.launch({
    headless,
    defaultViewport: VIEWPORT,
  })

  const page = await browser.newPage()

  page.setDefaultNavigationTimeout(0)

  await page.goto(ICONFONT_URL, { waitUntil: 'networkidle0' })

  await page.click('header .signin')

  // login
  await page.waitForSelector('.login')
  await page.type('#userid', login)
  await page.type('#password', password)
  await page.click('button[type="submit"')
  await page.waitForNavigation({ waitUntil: 'networkidle0' })

  await page.evaluate(() => {
    localStorage.setItem('_iconfont_view_type_', 'svgsymbol')
    localStorage.setItem('_iconfont_view_code_', 'show')
    localStorage.setItem('project_tips_online_demo', 'true')
    localStorage.setItem('project_tips_new', 'true')
  })

  // go to project
  await page.goto(
    `${ICONFONT_URL}manage/index?manage_type=myprojects&projectId=${project}`,
    { waitUntil: 'networkidle0' },
  )

  if (await page.$('.project-code-mask')) {
    const refresh = await page.$('.project-code-top .cover-btn:last-child')
    if (refresh) {
      await refresh.click()
      await page.waitForSelector('.project-code-mask', { hidden: true })
    }
  }

  const element = await page.waitForSelector('#J_cdn_type_svgsymbol')
  const jsUrl = await element!.evaluate(el => el.textContent)

  await browser.close()

  return jsUrl
}

export const download = async (url: string, file: string) => {
  if (!/https?:\/\//.test(url)) {
    if (url.startsWith('//')) {
      url = 'https:' + url
    } else {
      throw new Error('invalid url for downloading')
    }
  }
  return fs.writeFile(file, got.stream(url))
}
