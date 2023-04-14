const puppeteer = require('puppeteer-extra');
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const {executablePath} = require('puppeteer');
const fs = require('fs');


async function getArticleUrls(browser) {
    // will need to pull from database which of these to use, for now just hardcode
    // each user will have specific websites they wish to use articles from
    // add more, for now just cnn
    const newWebsites = [
        //repeat this format {link, articleXpath, dbReference}
        { 
            link: "https://edition.cnn.com/business/investing", // Link to main news outlet finance pag
            articleXpath: "/html/body/div[1]//div/section//a", // How to match for hrefs, will vary
            dbReference: 1 //add this number to database if user specifies this website to reference
        },
        {
            link: "https://finance.yahoo.com/news/",
            articleXpath: '//*[@id="Fin-Stream"]/ul//div/div/div[2]/h3/a',
            dbReference: 2
        }
        // add more here
    ];
    
    //save list of article urls found on each news outlet
    var urls = [];
    
    //iterate through news outlets
    for (website of newWebsites) {
        console.log("Getting links for " + website.link);
        const page = await browser.newPage();
        await page.goto(website.link,  {waitUntil: 'domcontentloaded'});
        var hrefs = await page.evaluate(async(xpath) => {
            const xPathMatch = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var hrefs = [];
            for (let i = 0; i < xPathMatch.snapshotLength; i++) {
                node = xPathMatch.snapshotItem(i);
                hrefs.push(node.href);
            }
            return hrefs;
        }, website.articleXpath);
        const noDuplicates = new Set(hrefs);
        urls = urls.concat(Array.from(noDuplicates));
    }
    await browser.close();
    console.log(urls);
    saveUrls(urls);
}

// Write to tmp file
async function saveUrls(urls) {
    console.log("Writing urls to file");

    //change array to string that can be written to file with each url on a new line
    var data = urls.join('\n');

    //create tmp directory if does not exist
    fs.mkdirSync("tmp", { recursive: true });
    filename = "tmp/urls.txt";
    console.log(data);

    fs.writeFile(filename, data, (err) => {
        // In case of a error throw err.
        if (err) console.log(err);
    })
    console.log("Finished writing to " + filename);
}

async function clearData() {
    console.log("Clearing data");
    fs.writeFile('/tmp/urls.txt', "", (err) => {
        // In case of a error throw err.
        if (err) console.log(err);
    })
}

// Starting point
(async () => {
    console.log("Scraping for hrefs");
    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
		headless: true, // Switch to true to not let browser window open
		args: [`--window-size=${1400},${900}`], 
		defaultViewport: {
			width:1400,
			height:900
		},
        executablePath: executablePath(),
	});
    //initial run
    getArticleUrls(browser);

    // search for new articles every 30 minutes
    setInterval(function() {
		console.log("RESTARTING");
        //clear tmp directory urls file
        clearData();
		getArticleUrls(browser);
    }, 1000 * 60 * 30); 
})();
