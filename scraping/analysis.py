import spacy
# from spacytextblob.spacytextblob import SpacyTextBlob
import pandas as pd
# from bs4 import BeautifulSoup
import requests
import json

nlp = spacy.load('en_core_web_sm')
nlp.add_pipe('spacytextblob')

# df = pd.read_csv("urls.csv")
# print(df)
# urls = df["Address"].tolist()
# url_sent_score = []
# url_sent_label = []
# total_pos = []
# total_neg = []


# for count, x in enumerate(urls):
#     url = x

#     headers = {
#         'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'}
#     res = requests.get(url, headers=headers)
#     html_page = res.text

#     soup = BeautifulSoup(html_page, 'html.parser')
#     for script in soup(["script", "style", "meta", "label", "header", "footer"]):
#         script.decompose()
#     page_text = (soup.get_text()).lower()
#     page_text = page_text.strip().replace("  ", "")
#     page_text = "".join([s for s in page_text.splitlines(True) if s.strip("\r\n")])
#     print(page_text)

with open('../tmp/articleText.json', 'r') as f:
    page_text = f.read()

doc = nlp(page_text)
print(doc)
sentiment = doc._.blob.polarity
sentiment = round(sentiment, 2)

if sentiment > 0:
    sent_label = "Positive"
else:
    sent_label = "Negative"

print(sentiment)



positive_words = []
negative_words = []

for x in doc._.blob.sentiment_assessments.assessments:
    if x[1] > 0:
        positive_words.append(x[0][0])
    elif x[1] < 0:
        negative_words.append(x[0][0])
    else:
        pass


