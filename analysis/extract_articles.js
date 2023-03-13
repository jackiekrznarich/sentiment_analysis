const axios = require("axios");
const config = require('../config');
const fs = require('fs');

// Get text from articles

async function getText(link) {
    console.log("Getting article text for " + link);
    const encodedParams = new URLSearchParams();
    encodedParams.append("language", "english");
    encodedParams.append("url", link);

    const options = {
    method: 'POST',
    url: 'https://text-analysis12.p.rapidapi.com/article-extraction/api/v1.3',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': config.api_key,
        'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
    },
    data: encodedParams
    };

    var text = await axios.request(options).then((response) => {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
    return {link: link, text: text.article.text};
}


async function cleanText(text) {
    for (article of text) {
        article.text = article.text.replace(/\n/g, " ");
    }
    return text;
}

// Save to tmp/text
async function saveText(text) {
    console.log("Saving to tmp/articleText.json");
    console.log(text);
    //create tmp directory if does not exist
    fs.mkdirSync("tmp", { recursive: true });
    filename = "tmp/articleText.json";
    var json = JSON.stringify(text);
    fs.writeFile(filename, json, (err) => {
        // In case of a error throw err.
        if (err) console.log(err);
    })
    console.log("Finished writing to " + filename);
}

// Starting point
(async () => {
    console.log("Parsing articles");
    var fs = require('fs');
    var links = fs.readFileSync('tmp/urls.txt').toString().split("\n");
    var text = [];
    for (var link of links) {
        text.push(await getText(link));
    }
    text.push(await getText(links[0]));
    text = await cleanText(text);
    saveText({articles: text});
})();