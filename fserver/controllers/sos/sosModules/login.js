// This utility function takes in the instance of a pupeteer page, logs in to showsOnsale and returns back the page instance.

async function login(page) {

  await page.goto("https://www.showsonsale.com/login", {
    waitUntil: "networkidle2",
  });
  // await page.waitForSelector("#UserName");
  await page.type("#UserName", "watermelon1");
  //  await page.waitForSelector("#Password");
  await page.type("#Password", "Pricebreak1!");
  await page.click("#btnLogin");

  console.log("LOGIN SUCCESSFUL.");

  await page.waitForNavigation({
    waitUntil: "networkidle2",
  });

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

  return page;

}

export default login;
