import puppeteer  from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://www.iconfont.cn/');
await page.screenshot({path: 'screenshot/example.png'});
await browser.close();
