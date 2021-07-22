import puppeteer from "puppeteer";
import download from "offline-iconfont";

const URL = "https://www.iconfont.cn/";
const PROJECT_URL =
  "https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=1626314";
const VIEWPORT = { height: 1920, width: 1280 };

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
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

  // find sign in
  await page.click("header .signin");

  // find github login
  await page.waitForSelector(".show-dialog", { visible: true });
  const githubLoginEleDom = await page.waitForSelector(
    ".mp-e2e-content .github"
  );
  await (githubLoginEleDom as puppeteer.ElementHandle).click();

  // login
  await page.waitForNavigation({ waitUntil: "networkidle0" });
  const userName = process.env.login;
  const password = process.env.password;
  await page.type("input[name=login]", userName as string);
  await page.type("input[name=password]", password as string);
  await page.click("input[name=commit]");
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  // go to project
  // await page.click(".site-nav li [href*=/manage/index]");
  const page2 = await browser.newPage();
  await page2.goto(PROJECT_URL, { waitUntil: "networkidle0" });
  page2.setDefaultNavigationTimeout(0);
  await page2.evaluate(() => {
    localStorage.setItem("_iconfont_view_type_", "fontclass");
    localStorage.setItem("_iconfont_view_code_", "show");
    localStorage.setItem("project_tips_online_demo", "true");
    localStorage.setItem("project_tips_new", "true");
  });
  await page2.goto(PROJECT_URL, { waitUntil: "networkidle0" });
  await page2.setViewport({ ...VIEWPORT, ...newViewport });
  const element = await page2.waitForSelector("#J_cdn_type_fontclass"); // select the element
  const value = await (element as puppeteer.ElementHandle).evaluate(
    (el) => el.textContent
  );
  download({
    cssUrl: value as string,
    // @ts-ignore
    extnameList: ["js"],
  });

  // screenshot
  await page2.screenshot({
    path: "screenshot/example.png",
    fullPage: true,
  });

  await browser.close();
})();
