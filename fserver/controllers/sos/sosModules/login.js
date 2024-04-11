// This utility function takes in the instance of a pupeteer page, logs in to showsOnsale and returns back the page instance.
import config from "config";

async function login(page) {

  await page.goto(config.get("showsOnSale.loginPageURL"), {
    waitUntil: "networkidle2",
  });
  // await page.waitForSelector("#UserName");
  await page.type("#UserName", config.get("showsOnSale.userName"));
  //  await page.waitForSelector("#Password");
  await page.type("#Password", config.get("showsOnSale.password"));
  await page.click("#btnLogin");

  console.log("LOGIN SUCCESSFUL.");

  await page.waitForNavigation({
    waitUntil: "networkidle2",
  });

  //VERIFICATION
  const url = page.url();

  if (url === config.get("showsOnSale.connectionsLimitedPageURL")) {
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
