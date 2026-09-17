import re

# Read master file
with open('d:/Agentic OS/agency-website/final-website-master.html', 'r', encoding='utf-8') as f:
    master_html = f.read()

# Extract the block from <!-- FAQ MODAL OVERLAY --> down to the end of the <style> block before the <script>
# We can use regex to find this block.
modal_block_match = re.search(r'(<!-- FAQ MODAL OVERLAY -->.*?</style>)', master_html, re.DOTALL)
if modal_block_match:
    modal_html = modal_block_match.group(1)
    
    # Read about.html
    with open('d:/Agentic OS/agency-website/about.html', 'r', encoding='utf-8') as f:
        about_html = f.read()
        
    # Check if they are already there
    if '<!-- FAQ MODAL OVERLAY -->' not in about_html:
        # Inject right before <script>\n  function openAuditModal()
        about_html = about_html.replace('<script>\n  function openAuditModal()', modal_html + '\n\n  <script>\n  function openAuditModal()')
        
        with open('d:/Agentic OS/agency-website/about.html', 'w', encoding='utf-8') as f:
            f.write(about_html)
        print('Injected modals into about.html')
    else:
        print('Modals already exist in about.html')
else:
    print('Failed to extract modals from master.')
