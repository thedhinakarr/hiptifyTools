//npm libraries
import puppeteer from "puppeteer";
import { writeFile } from 'fs/promises';
import config from "config";

//Modules
import login from "./login.js";

/*
    Extractor Function

    Parameters:
        1. Artists string

    Description:
        1. The function takes in the artists and extracts the data of these artists.
        2. Then it calls a linkModifier function which modifies the link.
        3. At the end it logs out of the showsOnSale site and returns the extracted data.

    Return value:
        1. TableData
*/

export async function extractor(artists) {
  console.log("\n======ENTERED EXTRACTION FUNCTION======");
  console.log("-> Launching a new pupeteer browser session. ");
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: false
  });
  console.log("-> Launched a new pupeteer browser session. ");

  console.log("-> Creating a new page instance.");
  let page = await browser.newPage();
  console.log("-> Created a new page instance.");

  console.log("-> Passing the page instance to login.");
  page = await login(page);
  console.log("-> Redirected back to the extractor function after successful login.");

  console.log("-> Navigating to the homePage to start extraction.");
  await page.goto(config.get("showsOnSale.homePageURL"), {
    waitUntil: "networkidle2",
  });
  console.log("-> Successfully Navigated to the homepage.");

  console.log("-> Entering the arguments in the extraction form.");
  await page.select('#sos-select-search-type', '6');
  await page.select('#sos-select-search-date', '0');
  await page.type('#event-name-filter', artists);
  await page.select('#event-country-filter', 'United States and Canada');
  await page.click('#select-filter-submit-button');
  console.log("-> Search successful.");

  // Wait for the table to be visible or for a suitable selector
  console.log("-> Waiting for the event table selector.");
  await page.waitForSelector('#event-table-listing');
  console.log("-> Event table found.");

  console.log("-> Initiating data extraction.");
  const tableData = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('#event-table-listing tbody tr'));
    return rows.map((row) => {
      const tds = row.querySelectorAll('td.main');
      const eventData = {
        Artist: tds[0]?.querySelector('.event .info a.btn-link.tippy-similar-event').innerText.trim(),
        agentCodes: tds[0]?.querySelector('.event .info a.btn-link.tippy-similar-event span').innerText.trim(),
        link: `https://www.showsonsale.com/${tds[0]?.querySelector('a')?.getAttribute('href')}`,
        // dangerText: tds[0]?.querySelector('.event .info .text-danger span'),
        venue: tds[0]?.querySelector('.event .location .venue').innerText.trim(),
        city: tds[0]?.querySelector('.event .location .city').innerText.trim(),
        Eventdate: tds[0]?.querySelector('.dates .date').innerText.trim(),
        presaleDate: tds[0]?.querySelector('.dates .presale').innerText.trim(),
        publicDate: tds[0]?.querySelector('.dates .public').innerText.trim()
      };
      return eventData;
    });
  });
  console.log("-> Data extracted successfully.");

  console.log("-> Initiating Link modification.\n");
  await linkModifier(page, tableData);
  console.log("-> Link modification successful.");
  console.log("-> Redirecting to homePage to logout.");
  await page.goto(config.get("showsOnSale.homePageURL"), {
    waitUntil: "networkidle2",
  });
  console.log("-> Redirection to homePage successful.");

  //Logout Logic
  console.log("-> Performing Logout.");
  await page.waitForSelector("#menu > div.navbar-right > ul > li > a > span");
  await page.click("#menu > div.navbar-right > ul > li > a > span");
  await page.waitForSelector("#menu > div.navbar-right > ul > li > ul > li:nth-child(7) > a");
  await page.click("#menu > div.navbar-right > ul > li > ul > li:nth-child(7) > a");
  console.log("-> Logout Successful.");

  console.log("-> Closing browser.");
  browser.close();
  console.log("-> Successfully closed the browser.");

  console.log("======EXITING EXTRACTION FUNCTION======\n");
  return tableData;

}


/*
    LinkModifier Function

    Parameters:
        1. pupeteer Page instance.
        2. Extracted data.

    Description:
        1. The function takes in the page instance and data and modifies only the link propertu of all the
            objects in the array.
        2. This is done by iteratively selecting the link property and redirecting to each of these links and
            updating the new url to the link property of object in the array.

    Return value:
        No return value.
*/
export async function linkModifier(page, data) {
  console.log("\n======ENTERED LINKMODIFIER FUNCTION======");
  console.log("-> Initiating link modification.");
  for (const obj of data) {
    await page.goto(obj.link, { timeout: 600000 }, { waitUntil: 'domcontentloaded' }); // Navigate to the original link
    const redirectedLink = page.url(); // Get the redirected URL after navigation
    obj.link = redirectedLink; // Update the link in the object
  }
  console.log("-> Link modification successful.");
  console.log("======EXITING LINKMODIFIER FUNCTION======\n");
}


/*
    saveDataToFile Function

    Parameters:
        2. Extracted data.

    Description:
        1. The function takes in the extracted data and writes it to a file

    Return value:
        No return value.
*/
export async function saveDataToFile(data) {
  try {
    console.log("\n======ENTERED SAVEDATATOFILE FUNCTION======");

    console.log("-> Filtering out objects without keys.");
    // Filter out objects without any keys
    const nonEmptyData = data.filter(obj => Object.keys(obj).length > 1);
    console.log("-> Filtering out objects without keys successful.");

    console.log("-> Initiating check to see if the nonmptyData object is empty or not");
    // Check if there's any non-empty data
    if (nonEmptyData.length > 1) {
      console.log("-> Object is non empty, writing to fserver/controllers/sos/data.json");
      await writeFile(config.get("showsOnSale.DATAFILEPATH"), JSON.stringify(nonEmptyData, null, 2));
      console.log('-> Data saved to fserver/controllers/sos/data.json');
    } else {
      console.log('-> No non-empty data to save.');
      console.log("-> Object is empty, not writing to fserver/controllers/sos/data.json");
    }
  } catch (error) {
    console.error('Error saving data:', error);
  }
  console.log("======EXITING SAVEDATATOFILE FUNCTION======\n");
}


export default { extractor, saveDataToFile, linkModifier };
