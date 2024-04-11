// This utility function takes in the instance of a pupeteer page, logs in to showsOnsale and returns back the page instance.

//npm library:
import config from "config";

/*
    Login Function

    Parameters:
        1. pupeteer page instance.

    Description:
        1. The function takes in a pupeteer page instance and logis in to the
           showsOnSale loginpage.

    Return value:
        1. Pupeteer Page instance.
*/

async function login(page) {

  console.log("\n======ENTERED LOGIN FUNCTION======");

  await page.goto(config.get("showsOnSale.loginPageURL"), {
    waitUntil: "networkidle2",
  }); //Goes to the login page and waits until the network is idle.

  console.log("-> Entering login credentials");

  // await page.waitForSelector("#UserName");
  await page.type("#UserName", config.get("showsOnSale.userName"));
  //  await page.waitForSelector("#Password");
  await page.type("#Password", config.get("showsOnSale.password"));
  await page.click("#btnLogin");

  console.log("-> LOGIN SUCCESSFUL.");

  await page.waitForNavigation({
    waitUntil: "networkidle2",
  });

  //VERIFICATION
  const url = page.url();

  if (url === config.get("showsOnSale.connectionsLimitedPageURL")) {

    console.log("-> Redirected to connections-limited page URL: ", page.url());
    console.log("-> Going to terminate one user's connection , waiting for selector.");
    await page.waitForSelector('input[type="submit"].btn.btn-primary');
    console.log("-> Found the selector.");
    await page.click('input[type="submit"].btn.btn-primary');
    console.log("-> Terminated a connection.");

  } else {
    console.log("-> Redirected to homepage URL: ", page.url());
  }

  console.log("======EXITING LOGIN FUNCTION======\n");
  return page;

}

export default login;
