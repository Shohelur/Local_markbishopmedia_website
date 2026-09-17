import re

file_path = r'd:\Agentic OS\agency-website\blog.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the grad-2 placeholder with an img tag for the thumbnail
html = html.replace('<div class="img-placeholder grad-2"></div>', '<img src="./assets/images/post-002-thumbnail.jpg" alt="Why Your Competitor Ranks Higher on Google Maps" style="width: 100%; height: 100%; object-fit: cover;">')

# Update title
html = html.replace('<h2 class="card-title">My Competitor Shows Up on Google But I Don\'t. Here Is Exactly Why.</h2>', '<h2 class="card-title">Why Your Competitor Ranks Higher on Google Maps (With Worse Service)</h2>')

# Update excerpt
html = html.replace('Your competitor has fewer reviews and worse service. Yet they always appear first on Google Maps. This post exposes the exact signals Google uses that you are likely missing.', 'Is a competitor with fewer reviews and worse service outranking you on Google Maps? Here are the 5 exact signals Google uses to rank them over you, and how to fix it.')

# Update link
html = html.replace('<!-- Standard Post 1 — POST 002 -->\n    <article class="blog-card card-standard" data-category="google-maps">\n      <div class="card-media">', '<!-- Standard Post 1 — POST 002 -->\n    <article class="blog-card card-standard" data-category="google-maps">\n      <div class="card-media">')

# Let's just use regex to target the href="#" right after POST 002
# The structure is:
#       <a href="#" style="position: absolute; inset: 0; z-index: 1;" aria-label="Read full article"></a>
#     </article>
#     <!-- Standard Post 2 — POST 003 -->

pattern = re.compile(r'(<h2 class="card-title">Why Your Competitor Ranks Higher.*?</a>\n    </article>)', re.DOTALL)
# wait, there are multiple href="#". I will just do a specific string replace around POST 002.
