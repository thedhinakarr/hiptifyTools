// Login to showOnsale and save the cookies to the cookies.json file to be used later.
// The cookies of the website show that few of them expire, when the user closes the browser itself.
// this is not helpful. So a wise thing to do would be to have login as a utility function. And use it both the extraction and
// Retrieval processes.

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

  //Need to add a filter here, if the program should perform the termination or not.
  console.log("GONNA TERMINATE");
  await page.click('input[type="submit"].btn.btn-primary');
  console.log("TERMINATED");

}



export default login;
