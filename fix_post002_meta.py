import re

file_path = r'd:\Agentic OS\agency-website\blog\post-002-competitor-ranks-higher.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Fix canonical and og URLs
html = html.replace('why-is-my-business-not-showing-on-google-maps', 'competitor-ranks-higher-google-maps')

# Fix og:title
html = html.replace('Why Is My Business Not Showing Up on Google Maps? (7 Real Reasons)', 'Why Your Competitor Ranks Higher on Google Maps (With Worse Service)')

# Fix og:description
html = html.replace('Your business is invisible on Google Maps. Here are the 7 real reasons and exactly how to fix each one.', 'Is a competitor with fewer reviews and worse service outranking you on Google Maps? Here are the 5 exact signals Google uses to rank them over you.')

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)
