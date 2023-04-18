import csv
import random
import datetime

# Define a list of ticker symbols
stocks = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'FB', 'TSLA', 'NVDA', 'JPM', 'WMT', 'BRK-A']

# Define a list of notification options
notifications = ['daily', 'weekly', 'monthly']

# Define a list of investing styles
investing_styles = ['active', 'passive']

# Define the first entry
entry1 = ['Aditya Venkataraman', '08/10/2001', 'AAPL,GOOG', 'weekly', 'passive']

# Create a list of 4 random entries
entries = []
for i in range(4):
    # Generate a random name
    first_name = random.choice(['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank', 'Grace'])
    last_name = random.choice(['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller'])
    name = f"{first_name} {last_name}"

    # Generate a random date of birth
    start_date = datetime.date(1960, 1, 1)
    end_date = datetime.date(2005, 12, 31)
    delta = end_date - start_date
    birth_date = start_date + datetime.timedelta(days=random.randint(0, delta.days))

    # Generate a random list of stocks
    num_stocks = random.randint(1, len(stocks))
    stock_list = random.sample(stocks, num_stocks)
    stock_string = ','.join(stock_list)

    # Generate a random notification frequency
    notification = random.choice(notifications)

    # Generate a random investing style
    investing_style = random.choice(investing_styles)

    # Add the entry to the list
    entries.append([name, birth_date.strftime('%m/%d/%Y'), stock_string, notification, investing_style])

# Combine the entries into a single list
all_entries = [entry1] + entries

# Open a new CSV file for writing
with open('my_file.csv', mode='w') as csv_file:
    # Create a CSV writer object
    writer = csv.writer(csv_file)

    # Write each entry to a new row in the CSV file
    for entry in all_entries:
        writer.writerow(entry)

    # Add a newline character at the end of the file
    csv_file.write('\n')
