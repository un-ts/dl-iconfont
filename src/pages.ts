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
  const currentWidth = Math.max(
    VIEWPORT.width,
    Math.ceil((boundingBox as puppeteer.BoundingBox).width)
  );
  const currentHeight = Math.max(
    VIEWPORT.height,
    Math.ceil((boundingBox as puppeteer.BoundingBox).height)
  );
  const newViewport = {
    width: currentWidth,
    height: currentHeight,
  };
  await page.setViewport({ ...VIEWPORT, ...newViewport });

  // find signin
  const signInEleDom = await page.waitForSelector("header .signin");
  await signInEleDom?.click();

  // find github login
  await page.waitForSelector(".show-dialog", { visible: true });
  const githubLoginEleDom = await page.waitForSelector(
    ".mp-e2e-content .github"
  );
  await githubLoginEleDom?.click();

  await page.waitForNavigation({ waitUntil: "networkidle0" });

  // screenshot
  await page.screenshot({
    path: "screenshot/example.png",
    fullPage: true,
  });
  await browser.close();
})();
