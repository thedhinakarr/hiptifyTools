import puppeteer from "puppeteer";


async function x(){

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp"
    });

    const page = await browser.newPage();
    await page.goto("https://www.showsonsale.com",{
        waitUntil: "networkidle2",
    });

    await page.type("#UserName","watermelon1");
    await page.type("#Password","Pricebreak1!");
    await page.click("#btnLogin");
    await  page.waitForNavigation({
        waitUntil: "networkidle2",
    }); 
    console.log("LOGIN SUCCESSFUL.");

    console.log("GONNA TERMINATE"); 
    await page.click('input[type="submit"].btn.btn-primary');
  
    // await  page.waitForNavigation(); 
    console.log("TERMINATED");
    console.log("FIRST CHECKPOINT REACHED!");
   


   // await page.click("");
    // await page.click("body > div.container > div.panel.panel-default > div:nth-child(2) > div:nth-child(3) > div > div > div.panel-body > div:nth-child(2) > form > input.btn.btn-primary");
    // page.waitForNavigation({
    //     waitUntil: "networkidle2",
    // });

}

x();