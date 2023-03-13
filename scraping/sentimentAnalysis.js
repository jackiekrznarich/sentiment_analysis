const { execSync } = require('child_process');

// Define the stock name to search for
const stockName = 'AAPL';

// Define the array of strings to analyze
const stringArray = [
    'AAPL is a great stock to buy right now',
    'I sold my AAPL shares today and made a profit',
    'I am considering investing in AAPL',
    'The recent news about AAPL is very positive',
    'I heard that AAPL is facing some challenges in the market'
];

// Function to execute Python code via the child_process module and get the sentiment for a given string using TextBlob
function getSentiment(string) {
    const pythonCode = `
        from textblob import TextBlob
        blob = TextBlob("${string.replace(/"/g, '\\"')}")
        print(blob.sentiment.polarity)
    `.replace(/^\s+/gm, '');
    const output = execSync(`python -c "${pythonCode}"`);
    return parseFloat(output.toString().trim());
}

// Loop through the array and analyze sentiment for each string that contains the stock name
stringArray.forEach((string) => {
    if (string.toLowerCase().includes(stockName.toLowerCase())) {
        const sentiment = getSentiment(`"${string}"`);
        console.log(`Sentiment for "${string}": ${sentiment}`);
    }
});
