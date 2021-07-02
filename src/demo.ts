import puppeteer from "puppeteer";

const URL = "https://www.iconfont.cn/";
const VIEWPORT = { height: 1920, width: 1280 };

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle0" });

  // Resize the viewport to screenshot elements outside of the viewport
  const bodyHandle = await page.$("body");
  const boundingBox = await bodyHandle?.boundingBox();
  const newViewport = {
    width: Math.max(
      VIEWPORT.width,
      Math.ceil((boundingBox as puppeteer.BoundingBox).width)
    ),
    height: Math.max(
      VIEWPORT.height,
      Math.ceil((boundingBox as puppeteer.BoundingBox).height)
    ),
  };
  await page.setViewport({ ...VIEWPORT, ...newViewport });

  // find signin
  const signInElmDom = await page.waitForSelector("header .signin");
  await signInElmDom?.click();
  await page.waitForNavigation({ waitUntil: "load" });

  // await page.screenshot({path: 'screenshot/example.png', fullPage: true});
  await browser.close();
})();
