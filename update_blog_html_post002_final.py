import re

file_path = r'd:\Agentic OS\agency-website\blog.html'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Target the POST 002 block using regex
# From <!-- Standard Post 1 — POST 002 --> down to </article>
pattern = re.compile(r'(<!-- Standard Post 1 — POST 002 -->.*?)</article>', re.DOTALL)
match = pattern.search(html)

if match:
    block = match.group(1)
    
    # Replace the grad-2 placeholder with the real image
    block = block.replace('<div class="img-placeholder grad-2"></div>', 
                          '<img src="./assets/images/post-002-thumbnail.jpg" alt="Why Your Competitor Ranks Higher on Google Maps" style="width: 100%; height: 100%; object-fit: cover;">')
    
    # Update title
    block = block.replace('My Competitor Shows Up on Google But I Don\'t. Here Is Exactly Why.', 
                          'Why Your Competitor Ranks Higher on Google Maps (With Worse Service)')
    
    # Update excerpt
    block = block.replace('Your competitor has fewer reviews and worse service. Yet they always appear first on Google Maps. This post exposes the exact signals Google uses that you are likely missing.', 
                          'Is a competitor with fewer reviews and worse service outranking you on Google Maps? Here are the 5 exact signals Google uses to rank them over you, and how to fix it.')
    
    # Update href link at the end of the block
    block = block.replace('<a href="#" style="position: absolute; inset: 0; z-index: 1;" aria-label="Read full article"></a>', 
                          '<a href="./blog/post-002-competitor-ranks-higher.html" style="position: absolute; inset: 0; z-index: 1;" aria-label="Read full article"></a>')
    
    # Reconstruct the HTML
    html = html[:match.start()] + block + '</article>' + html[match.end():]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully updated POST 002 card in blog.html")
else:
    print("Could not find POST 002 block")
