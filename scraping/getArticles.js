const puppeteer = require('puppeteer');
const fs = require('fs');


async function getArticleUrls(browser) {
    const page = await browser.newPage();
    // will need to pull from database which of these to use, for now just hardcode
    // each user will have specific websites they wish to use articles from
    // add more, for now just cnn
    const newWebsites = [
        //repeat this format {link, articleXpath, dbReference}
        { 
            link: "https://edition.cnn.com/business/investing", // Link to main news outlet finance pag
            articleXpath: "/html/body/div[1]//div/section//a", // How to match for hrefs, will vary
            dbReference: 1 //add this number to database if user specifies this website to reference
        }
        // add more here
    ];
    
    //save list of article urls found on each news outlet
    var urls = [];
    
    //iterate through news outlets
    for (website of newWebsites) {
        console.log("Getting links for " + website.link);
        await page.goto(website.link,  {waitUntil: 'domcontentloaded', timeout: 10000});
        var hrefs = await Promise.all((await page.$x(website.articleXpath)).map(async item => await (await item.getProperty('href')).jsonValue()));
        console.log(hrefs);
        urls = urls.concat(hrefs);
    }
    await browser.close();
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
    const browser = await puppeteer.launch({
		headless: false,
		args: [`--window-size=${1400},${900}`], // new option
		defaultViewport: {
			width:1400,
			height:900
		}
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
