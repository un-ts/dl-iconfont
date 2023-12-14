import fs from 'node:fs/promises'

import puppeteer from 'puppeteer'
import { fetchApi } from 'x-fetch'

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
    headless: headless && 'new',
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

  await page.waitForSelector('a#J_cdn_type_svgsymbol')

  if (await page.$('.project-code-top .cover-btn:not(:last-child)')) {
    const refresh = await page.$('.project-code-top .cover-btn:last-child')
    await refresh!.click()
    const button = await page.waitForSelector(
      '.mx-modal-footer button.mp-e2e-button',
    )
    await button!.click()
    await page.waitForSelector(
      '.project-code-top .cover-btn:not(:last-child)',
      {
        hidden: true,
      },
    )
  }

  // re-pull latest anchor element after refreshing
  const anchor = await page.waitForSelector('a#J_cdn_type_svgsymbol')

  const jsUrl = await anchor!.evaluate(el => el.href)

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
  return fs.writeFile(
    file,
    await fetchApi(url, {
      type: 'text',
    }),
  )
}
