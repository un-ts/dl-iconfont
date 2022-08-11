import fs from 'node:fs'

import got from 'got'
import puppeteer from 'puppeteer'

const ICONFONT_URL = 'https://www.iconfont.cn/'

const VIEWPORT = { height: 1920, width: 1280 }

export const fetchJsUrl = async ({
  projectId,
  login,
  password,
  headless = true,
}: {
  projectId: string
  login: string
  password: string
  headless?: boolean
}) => {
  if (!projectId || !login || !password) {
    throw new Error('`projectId`, `login` and `password` must all be provided')
  }

  const browser = await puppeteer.launch({ headless })
  const page = await browser.newPage()
  page.setDefaultNavigationTimeout(0)
  await page.goto(ICONFONT_URL, { waitUntil: 'networkidle0' })

  // Resize the viewport to screenshot elements outside of the viewport
  const body = await page.$('body')
  const boundingBox = await body!.boundingBox()
  await page.setViewport({
    ...VIEWPORT,
    width: Math.max(VIEWPORT.width, Math.ceil(boundingBox!.width)),
    height: Math.max(VIEWPORT.height, Math.ceil(boundingBox!.height)),
  })

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
    `${ICONFONT_URL}manage/index?manage_type=myprojects&projectId=${projectId}`,
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
  return fs.promises.writeFile(file, await got(url).buffer())
}
