import json
import csv
from textblob import TextBlob


def main():
    with open('../tmp/articleText.json', 'r') as f:
        data = json.load(f)

    with open('../frontend/my_file.csv', 'r') as userData:
        reader = csv.reader(userData)
        userData = []
        for row in reader:
            userData.append(row)
        userData.pop()

    article_info = {}
    for article in data['articles']:
        # Print the list of "text" values
        text = article['text']
        blob = TextBlob(text)

        # Perform sentiment analysis
        polarity = blob.sentiment.polarity

        # Print sentiment polarity score
        # print("Sentiment polarity score:", polarity)
        article_info[article['link']] = {'text': article['text'], 'polarity': polarity}

    print(article_info)

    # Iterate through users and identify which are watching stocks that have been updated
    for user in userData:

        tickers = user[3]



if __name__ == "__main__":
    main()