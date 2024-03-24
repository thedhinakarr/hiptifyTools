import puppeteer from "puppeteer";
import { writeFile } from 'fs/promises';

async function extractor() {

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp"
  });

  const page = await browser.newPage();
  await page.goto("https://www.showsonsale.com/home", {
    waitUntil: "networkidle2",
  });

  await page.select('#sos-select-search-type', '4');
  await page.select('#sos-select-search-date', '2');
  await page.type('#event-name-filter', '');
  await page.select('#event-country-filter', 'United States and Canada');
  await page.click('#select-filter-submit-button');

  // Wait for the table to be visible or for a suitable selector
  await page.waitForSelector('#event-table-listing');

  const tableData = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('#event-table-listing tbody tr'));

    return rows.map((row) => {
      const tds = row.querySelectorAll('td.main');
      const eventData = {
        eventTitle: tds[0]?.querySelector('.event .info a.btn-link.tippy-similar-event').innerText.trim(),
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

  await linkModifier(page, tableData);
  browser.close();
  return tableData;

}

async function linkModifier(page, data) {
  for (const obj of data) {
    await page.goto(obj.link, { waitUntil: 'domcontentloaded' }); // Navigate to the original link
    const redirectedLink = page.url(); // Get the redirected URL after navigation
    obj.link = redirectedLink; // Update the link in the object
  }
}

async function saveDataToFile(data) {
  try {
    // Filter out objects without any keys
    const nonEmptyData = data.filter(obj => Object.keys(obj).length > 1);

    // Check if there's any non-empty data
    if (nonEmptyData.length > 1) {
      await writeFile('data.json', JSON.stringify(nonEmptyData, null, 2));
      console.log('Data saved to data.json');
    } else {
      console.log('No non-empty data to save.');
    }
  } catch (error) {
    console.error('Error saving data:', error);
  }
}


(async () => {
  const tableData = await extractor();
  console.log(tableData);
  await saveDataToFile(tableData);
})();
