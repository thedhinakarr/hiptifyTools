import puppeteer from "puppeteer";


async function login() {

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });

  const page = await browser.newPage();

  await page.goto("https://www.showsonsale.com/login", {
    waitUntil: "networkidle2",
  });

  await page.type("#UserName", "watermelon1");
  await page.type("#Password", "Pricebreak1!");
  await page.click("#btnLogin");

  await page.waitForNavigation({
    waitUntil: "networkidle2",
  });

  console.log("LOGIN SUCCESSFUL.");

  const url = page.url();

  if (url === 'https://www.showsonsale.com/connection-limited') {
    console.log(page.url());
    console.log("GONNA TERMINATE, waiting for selector.");
    await page.waitForSelector('input[type="submit"].btn.btn-primary');
    console.log("Found the selector.");
    await page.click('input[type="submit"].btn.btn-primary');
    console.log("TERMINATED");
  } else {
    console.log(page.url());
    console.log("REDIRECTED TO HOME.");
  }

  //Logout Logic
  await page.waitForSelector("#menu > div.navbar-right > ul > li > a > span");
  await page.click("#menu > div.navbar-right > ul > li > a > span");
  await page.waitForSelector("#menu > div.navbar-right > ul > li > ul > li:nth-child(7) > a");
  await page.click("#menu > div.navbar-right > ul > li > ul > li:nth-child(7) > a");

  browser.close();
}

login();

export default login;
