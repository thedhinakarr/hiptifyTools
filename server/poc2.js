import puppeteer from "puppeteer";

async function x(){

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp"
    });

    const page = await browser.newPage();
    await page.goto("https://www.showsonsale.com/home",{
        waitUntil: "networkidle2",
    });

    const allElements2 = await page.$$('html *');

    // Iterate over each element and print its HTML
    for (let i = 0; i < allElements2.length; i++) {
      const element = allElements2[i];
      const html = await page.evaluate(element => element.outerHTML, element);
      console.log("-> " ,html);
      }
      

    await browser.close();

}

x();