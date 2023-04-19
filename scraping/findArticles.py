import yfinance as yf
msft = yf.Ticker("MSFT")
msft.info
print(msft.news)
