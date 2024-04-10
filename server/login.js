import puppeteer from "puppeteer";


async function login() {

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp"
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

  console.log("GONNA TERMINATE");
  await page.click('input[type="submit"].btn.btn-primary');
  console.log("TERMINATED");

  browser.close();
}

login();

export default login;
