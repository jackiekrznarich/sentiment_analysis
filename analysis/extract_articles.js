const axios = require("axios");
const config = require('../config');

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

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

// Starting point
(async () => {
    console.log("Parsing articles");
    var fs = require('fs');
    var links = fs.readFileSync('../tmp/urls.txt').toString().split("\n");
    var text = [];
    for (var link of links) {
        text.push(getText(link));
    }
    console.log(text);
})();