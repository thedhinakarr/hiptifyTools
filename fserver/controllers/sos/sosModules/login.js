// This utility function takes in the instance of a pupeteer page, logs in to showsOnsale and returns back the page instance.
//Working.

import puppeteer from "puppeteer";

async function login(page) {

  await page.goto("https://www.showsonsale.com/login", {
    waitUntil: "networkidle2",
  });

  await page.type("#UserName", "watermelon1");
  await page.type("#Password", "Pricebreak1!");
  await page.click("#btnLogin");


  console.log("LOGIN SUCCESSFUL.");
  await page.waitForNavigation({
    waitUntil: "networkidle2",
  });
  console.log("GONNA TERMINATE");
  await page.click('input[type="submit"].btn.btn-primary');
  console.log("TERMINATED");

  return page;

}

export default login;
