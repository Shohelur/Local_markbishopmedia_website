const { buildHTML } = require('../renderer/html-builder');

const c = {
  metadata: { business_name: 'T', reviews_count: 21, rating: 4.8, services_count: 8 },
  cover: { business_name: 'T', report_title: 'R' },
  executive_snapshot: { foundation_summary: 'G.', key_observation: 'G.' },
  top_priorities: [
    {
      rank: 1,
      title: 'Small',
      priority_level: 'High',
      what_we_found: 'W.',
      why_it_matters: 'M.',
      recommended_action: 'A.',
      source_finding_ids: ['cit-001'],
      see_more_details: [{ content: 'D1' }, { content: 'D2' }],
    },
    {
      rank: 2,
      title: 'Large',
      priority_level: 'High',
      what_we_found: 'W.',
      why_it_matters: 'M.',
      recommended_action: 'A.',
      source_finding_ids: ['cit-001', 'cit-002'],
      see_more_details: Array.from({ length: 20 }, (_, i) => ({ content: 'Dir ' + i })),
    },
  ],
  competitive_snapshot: {
    comparisons: [{
      competitor_name: 'C',
      observation: 'C has 950 Google reviews (vs. 21) and a 4.7 rating (vs. 4.8), with 22 listed GBP services (vs. 8).',
    }],
  },
};

const r = buildHTML(c, {});
const h = r.html;

const btns = [...h.matchAll(/data-target="(finding-details-\d+)"/g)];
console.log('Buttons found:', btns.map(m => m[1]));
const panels = [...h.matchAll(/id="(finding-details-\d+)"/g)];
console.log('Panels found:', panels.map(m => m[1]));
console.log('Total see-more-btn:', (h.match(/class="see-more-btn"/g) || []).length);
