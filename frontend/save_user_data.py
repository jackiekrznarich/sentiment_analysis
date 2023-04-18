# from flask import Flask, request, redirect, url_for, render_template

# app = Flask(__name__)

# @app.route('/thank_you.html', methods=['POST'])
# def submit_form():
#     print("Listening for form data")
#     # data = request.form.to_dict() # get form data as dictionary
#     # with open('customer_data.csv', 'a') as f:
#     #     f.write(','.join(data.values()) + '\n') # write data to CSV file
#     # return render_template('thank_you.html')

# if __name__ == '__main__':
#     app.run()

import csv

# Create a list of 5 entries
entries = ['entry1', 'entry2', 'entry3', 'entry4', 'entry5']

# Open a new CSV file for writing
with open('my_file.csv', mode='w') as csv_file:
    # Create a CSV writer object
    writer = csv.writer(csv_file)

    # Write each entry to a new row in the CSV file
    for entry in entries:
        writer.writerow([entry])

    # Add a newline character at the end of the file
    csv_file.write('\n')