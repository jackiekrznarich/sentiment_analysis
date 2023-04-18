import json
from textblob import TextBlob

with open('../tmp/articleText.json', 'r') as f:
    data = json.load(f)

# Extract the "text" field from each article in the "articles" list
text_list = [article['text'] for article in data['articles']]


for text in text_list:
    # Print the list of "text" values
    print(text)

    blob = TextBlob(text)

    # Perform sentiment analysis
    polarity = blob.sentiment.polarity

    # Print sentiment polarity score
    print("Sentiment polarity score:", polarity)


