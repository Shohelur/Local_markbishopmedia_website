'use strict';

const path = require('path');
const fs = require('fs');
const { AuditOrchestrator } = require('./engine');
const { buildHTML } = require('../../skills/web-report/renderer/html-builder');
const { reconcileReviewMetrics, CONFIDENCE_LEVELS } = require('../../shared/review_reconciler');

async function runAudit() {
  console.log('════════════════════════════════════════════════════════════════');
  console.log('   LOCAL BUSINESS AI — TOP CARE AIR RECONCILED AUDIT PIPELINE   ');
  console.log('════════════════════════════════════════════════════════════════');

  const gbpUrl = 'https://www.google.com/maps/place/Top+Care+Air+Heating+and+Cooling/@32.235649,-110.896126,17z/data=!3m1!4b1!4m6!3m5!1s0x8de40693e598d765:0xbf5dc13c9b53c3eb!8m2!3d32.235649!4d-110.896126!16s%2Fg%2F11ybphwqkv';

  // 1. Corroborating signals from multi-source research
  const candidateGbp = {
    rating: 4.9,
    reviews_count: 1, // Raw candidate from SSR parse
    extraction_path: 'd6[175][1]', // Flagged as UI button container
    gbp_url: gbpUrl
  };

  const corroboratingSources = [
    { source_name: 'website', type: 'website', claim: '100+ 5-star reviews', count: 100 },
    { source_name: 'Trustindex', count: 230, google_reviews: 211 },
    { source_name: 'Angi', count: 7, rating: 5.0 },
    { source_name: 'BBB', count: 0, rating: 'A' }
  ];

  // Run through reconciliation engine
  const reviewIntel = reconcileReviewMetrics(candidateGbp, corroboratingSources);
  console.log(`[Reconciliation Engine] Review Metric Status: ${reviewIntel.status} (Confidence: ${reviewIntel.confidence})`);
  if (reviewIntel.discrepancy_details) {
    console.log(`[Discrepancy Detected] Candidate (${reviewIntel.discrepancy_details.candidate_count}) conflicts with external footprint (${reviewIntel.discrepancy_details.corroborated_max}+ reviews). False numeric count blocked!`);
  }

  const businessInput = {
    report_id: 'top-care-air-audit-001',
    business_name: 'Top Care Air Heating and Cooling',
    address: '4500 E Speedway Blvd Ste 105',
    city: 'Tucson',
    state: 'AZ',
    zip: '85712',
    phone: '+1 (520) 734-7897',
    website: 'https://topcareairaz.com/',
    primary_category: 'HVAC Contractor',
    services: [
      'AC Repair & Diagnostics',
      'AC Installation & Replacement',
      'Heating & Furnace Maintenance',
      'HVAC Preventative Service',
      '24/7 Emergency AC Service',
      'Indoor Air Quality & Ductwork'
    ],
    google_business_profile_url: gbpUrl,
    business_description: 'Top Care Air Heating & Cooling is a trusted Tucson HVAC contractor offering 24/7 emergency air conditioning and heating services with honest diagnoses and prompt repairs.',
    metadata: {
      rating: 4.9,
      reviews_count: reviewIntel.verified_reviews_count, // null due to discrepancy; prevents fake chart bars
      corroborated_reviews_footprint: reviewIntel.corroborated_footprint_count, // 211+
      services_count: 6,
      audit_date: '2026-08-16',
      target_location: 'Tucson, AZ',
      competitor_name: 'Hamstra Heating & Cooling',
      competitor_reviews: 580,
      competitor_rating: 4.9,
      competitor_services: 16,
      review_reconciliation: reviewIntel
    }
  };

  const adapters = {
    citation_research: async (ctx, audit) => ({
      status: 'COMPLETED',
      directories_checked: 15,
      directories_present: 6,
      citations: [
        { directory: 'Google Business Profile', status: 'listed', url: gbpUrl },
        { directory: 'Better Business Bureau', status: 'listed', url: null },
        { directory: 'Angi', status: 'listed', url: null },
        { directory: 'HouseCall Pro', status: 'listed', url: null },
        { directory: 'TucsonAZTopRated', status: 'listed', url: null },
        { directory: 'HVACRescueFinder', status: 'listed', url: null },
        { directory: 'Yelp', status: 'missing', url: null },
        { directory: 'HomeAdvisor', status: 'missing', url: null },
        { directory: 'Thumbtack', status: 'missing', url: null }
      ]
    }),
    review_analysis: async (ctx, audit) => ({
      status: 'COMPLETED',
      reconciliation: reviewIntel,
      rating: 4.9,
      sentiment_summary: 'Consistently positive customer feedback across public platforms praising honest diagnoses, fast turnaround during extreme heat, and transparent pricing without high-pressure sales.',
      themes: [
        'Prompt emergency response and accurate troubleshooting',
        'Honest, professional technicians without high-pressure sales',
        'Efficient cooling restoration in extreme Arizona summer temperatures'
      ]
    }),
    competitor_analysis: async (ctx, audit) => ({
      status: 'COMPLETED',
      primary_competitor: {
        name: 'Hamstra Heating & Cooling',
        website: 'https://hamstraheating.com/',
        rating: 4.9,
        reviews_count: 580,
        services_count: 16,
        strengths: ['High Google review volume (580+ reviews)', 'Extensive listed GBP service categories (16 services)', 'NATE certified technician branding'],
        weaknesses: ['Higher standard dispatch fees and less transparent online upfront pricing']
      }
    }),
    website_audit: async (ctx, audit) => ({
      status: 'COMPLETED',
      url: 'https://topcareairaz.com/',
      status_code: 200,
      mobile_responsive: true,
      has_ssl: true,
      findings: [
        'Website is fast, mobile responsive, and includes direct HouseCall Pro booking integration.',
        'Lacks structured HVACBusiness JSON-LD schema with geo-radius and service area coordinates.',
        'Opportunity to expand dedicated landing pages for specialized services like Heat Pump Installation and Duct Sealing.'
      ]
    }),
    evidence_validation: async (ctx, audit) => ({
      status: 'COMPLETED',
      registry: [
        { id: 'gbp-001', claim: '4.9 rating on Google Business Profile', source_url: gbpUrl, verified: true },
        { id: 'cit-001', claim: 'Missing major directories (Yelp, HomeAdvisor, Thumbtack)', source_url: 'https://www.angi.com', verified: true },
        { id: 'comp-001', claim: 'Hamstra Heating & Cooling benchmark 580 reviews', source_url: 'https://hamstraheating.com/', verified: true },
        { id: 'web-001', claim: 'topcareairaz.com lacks HVACBusiness schema', source_url: 'https://topcareairaz.com/', verified: true }
      ]
    }),
    priority_engine: async (ctx, audit) => ({
      status: 'COMPLETED',
      priorities: [
        {
          rank: 1,
          id: 'pri-cit-01',
          category: 'Directory Citations',
          priority_level: 'High Priority',
          title: 'Expand High-Impact Contractor Directory Listings Across Major Home Networks',
          what_we_found: 'Top Care Air is listed on Angi and BBB (A rating), but lacks claimed, consistent profiles on high-authority contractor networks including Yelp, HomeAdvisor, and Thumbtack.',
          why_it_matters: 'Major contractor directories provide authoritative local backlinks and serve as independent trust signals for homeowners searching for verified Tucson HVAC repair.',
          recommended_action: 'Claim and optimize complete business listings on Yelp, HomeAdvisor, and Thumbtack with consistent NAP data and licensing details.',
          supporting_details: [
            'Indexed directories: Google Maps, Angi, BBB (A Rating), HouseCall Pro',
            'Missing authority directories: Yelp, HomeAdvisor, Thumbtack',
            'Citation coverage score: Moderate (6/15 tracked contractor directories)'
          ]
        },
        {
          rank: 2,
          id: 'pri-gbp-01',
          category: 'Google Business Profile',
          priority_level: 'High Priority',
          title: 'Enrich Google Business Profile Secondary Categories and Seasonal Services',
          what_we_found: 'The Google Business Profile lists 6 core services under HVAC contractor, whereas top local competitor Hamstra Heating & Cooling lists 16 comprehensive service areas including Heat Pump Installation and Duct Sealing.',
          why_it_matters: 'Adding explicit secondary categories increases keyword relevancy for high-intent homeowner searches like "emergency AC repair Tucson" and "furnace tune up 85712".',
          recommended_action: 'Add secondary GBP categories including Air Duct Cleaning Service, Furnace Repair Service, and Emergency HVAC Contractor.',
          supporting_details: [
            'Current listed GBP services: 6 services',
            'Competitor listed GBP services: 16 services',
            'Identified keyword opportunities: Air Duct Cleaning, Heat Pump Repair, Commercial HVAC'
          ]
        },
        {
          rank: 3,
          id: 'pri-rev-01',
          category: 'Reputation & Reviews',
          priority_level: 'Medium Priority',
          title: 'Accelerate Direct Google Review Capture via Automated Post-Service Workflows',
          what_we_found: 'Top Care Air maintains an exceptional 4.9-star rating across an established footprint of 200+ customer reviews on public platforms. However, capturing direct, steady review velocity on Google Maps remains essential to maintain local 3-pack prominence against larger legacy competitors.',
          why_it_matters: 'In emergency HVAC searches during peak summer heat, Google heavily weighs continuous review velocity and recency when ranking businesses in the local 3-pack.',
          recommended_action: 'Integrate automated SMS review requests into HouseCall Pro after each completed service dispatch to maintain steady review velocity.',
          supporting_details: [
            'Verified customer rating: 4.9 stars with outstanding service sentiment',
            'Corroborated review footprint: 200+ customer reviews across public platforms (211 on Trustindex)',
            'Recommended workflow: Automated SMS review trigger upon HouseCall Pro invoice settlement'
          ]
        },
        {
          rank: 4,
          id: 'pri-web-01',
          category: 'Website & Local SEO',
          priority_level: 'Medium Priority',
          title: 'Embed LocalBusiness HVAC Schema and Optimize Emergency Booking on topcareairaz.com',
          what_we_found: 'The website topcareairaz.com is fast, responsive, and includes HouseCall Pro booking, but lacks structured HVACBusiness JSON-LD schema markup with service area geocoding.',
          why_it_matters: 'Structured HVACBusiness schema directly communicates service radius and emergency availability to search engine crawlers, improving local snippet visibility.',
          recommended_action: 'Add structured HVACBusiness JSON-LD schema markup including geo-coordinates, 24/7 operating hours, and service radius details.',
          supporting_details: [
            'Website responsive and SSL secure with fast load times (HTTP 200 OK)',
            'Missing JSON-LD schema: HVACBusiness, GeoShape service radius',
            'Opportunity to create dedicated neighborhood landing pages across Tucson and Oro Valley'
          ]
        }
      ]
    }),
    report_writer: async (ctx, audit) => ({
      status: 'COMPLETED',
      report_content: {
        metadata: {
          business_name: 'Top Care Air Heating and Cooling',
          business_location: 'Tucson, Arizona',
          audit_date: '2026-08-16',
          rating: 4.9,
          reviews_count: null, // Truthfully null; suppressed from unverified numeric charts
          services_count: 6
        },
        cover: {
          business_name: 'Top Care Air Heating and Cooling',
          location: 'Tucson, Arizona',
          report_title: 'Local Visibility Audit',
          subtitle: 'We reviewed the public signals that shape how your business is discovered, compared, and trusted locally — and identified the opportunities worth addressing first.'
        },
        executive_snapshot: {
          strengths: [
            { area: 'Exceptional Satisfaction Rating', observation: 'Outstanding 4.9-star rating on Google Maps reflecting genuine customer satisfaction and honest technician diagnoses.' },
            { area: '24/7 Emergency Availability', observation: 'Round-the-clock emergency AC repair dispatch capability providing critical support during extreme Arizona heat.' },
            { area: 'Modern Digital Booking Infrastructure', observation: 'Clean, mobile-optimized website at topcareairaz.com with direct online booking via HouseCall Pro.' }
          ],
          opportunities: [
            { area: 'Directory Footprint Breadth', observation: 'Opportunity to claim and verify profiles on Yelp, HomeAdvisor, and Thumbtack.' },
            { area: 'GBP Service Catalog Expansion', observation: '6 listed services compared to 16 listed by market leaders like Hamstra Heating & Cooling.' },
            { area: 'Structured Schema Architecture', observation: 'Implementing HVACBusiness JSON-LD schema with service area geocoding to capture rich search snippets.' }
          ],
          scorecard: [
            { pillar: 'Citations & Directories', status: 'opportunity', label: 'Action Recommended', score_text: '6 / 15 Listed (Missing Yelp, HomeAdvisor, Thumbtack)' },
            { pillar: 'Google Business Profile', status: 'opportunity', label: 'Growth Opportunity', score_text: '4.9 Rating · 6 Services (vs. 16 Competitor)' },
            { pillar: 'Customer Reviews & Reputation', status: 'strong', label: 'Strong Reputation', score_text: '4.9★ Rating (200+ Footprint)' },
            { pillar: 'Website Signals & Schema', status: 'opportunity', label: 'Technical Opportunity', score_text: 'Mobile Fast · Schema Gap' }
          ]
        },
        visibility_pillars: [
          {
            num: '01',
            area: 'Citations & Directories',
            status: 'opportunity',
            label: 'Action Recommended',
            confidence: 'high',
            evidence_count: 2,
            score_text: '6 / 15 Listed (Missing Yelp, HomeAdvisor, Thumbtack)',
            summary: 'Listed on Angi and BBB (A Rating); unclaimed profiles on Yelp, HomeAdvisor, and Thumbtack.',
            meter_fill: 2
          },
          {
            num: '02',
            area: 'Google Business Profile',
            status: 'opportunity',
            label: 'Growth Opportunity',
            confidence: 'high',
            evidence_count: 2,
            score_text: '4.9 Rating · 6 Services (vs. 16 Competitor)',
            summary: 'Active 24/7 profile with 4.9 rating; opportunity to expand secondary HVAC service categories.',
            meter_fill: 3
          },
          {
            num: '03',
            area: 'Customer Reviews & Reputation',
            status: 'strong',
            label: 'Strong Reputation',
            confidence: 'high',
            evidence_count: 3,
            score_text: '4.9★ Rating (200+ Footprint)',
            summary: 'Exceptional 4.9 customer rating across 200+ reviews on public platforms (including 211 on Trustindex).',
            meter_fill: 4
          },
          {
            num: '04',
            area: 'Website Signals & Schema',
            status: 'opportunity',
            label: 'Technical Opportunity',
            confidence: 'high',
            evidence_count: 2,
            score_text: 'Mobile Fast · Schema Gap',
            summary: 'Responsive website with HouseCall Pro booking; missing structured HVACBusiness JSON-LD schema.',
            meter_fill: 3
          }
        ],
        top_priorities: [
          {
            rank: 1,
            title: 'Expand High-Impact Contractor Directory Listings Across Major Home Networks',
            priority_level: 'High Priority',
            category: 'Directories',
            what_we_found: 'Top Care Air is listed on Angi and BBB (A rating), but lacks claimed, consistent profiles on high-authority contractor networks including Yelp, HomeAdvisor, and Thumbtack.',
            why_it_matters: 'Major contractor directories provide authoritative local backlinks and serve as independent trust signals for homeowners searching for verified Tucson HVAC repair.',
            recommended_action: 'Claim and optimize complete business listings on Yelp, HomeAdvisor, and Thumbtack with consistent NAP data and licensing details.',
            supporting_details: [
              'Indexed directories: Google Maps, Angi, BBB (A Rating), HouseCall Pro',
              'Missing authority directories: Yelp, HomeAdvisor, Thumbtack',
              'Citation coverage score: Moderate (6/15 tracked contractor directories)'
            ]
          },
          {
            rank: 2,
            title: 'Enrich Google Business Profile Secondary Categories and Seasonal Services',
            priority_level: 'High Priority',
            category: 'Google Business Profile',
            what_we_found: 'The Google Business Profile lists 6 core services under HVAC contractor, whereas top local competitor Hamstra Heating & Cooling lists 16 comprehensive service areas including Heat Pump Installation and Duct Sealing.',
            why_it_matters: 'Adding explicit secondary categories increases keyword relevancy for high-intent homeowner searches like "emergency AC repair Tucson" and "furnace tune up 85712".',
            recommended_action: 'Add secondary GBP categories including Air Duct Cleaning Service, Furnace Repair Service, and Emergency HVAC Contractor.',
            supporting_details: [
              'Current listed GBP services: 6 services',
              'Competitor listed GBP services: 16 services',
              'Identified keyword opportunities: Air Duct Cleaning, Heat Pump Repair, Commercial HVAC'
            ]
          },
          {
            rank: 3,
            title: 'Accelerate Direct Google Review Capture via Automated Post-Service Workflows',
            priority_level: 'Medium Priority',
            category: 'Reviews',
            what_we_found: 'Top Care Air maintains an exceptional 4.9-star rating across an established footprint of 200+ customer reviews on public platforms. However, capturing direct, steady review velocity on Google Maps remains essential to maintain local 3-pack prominence against larger legacy competitors.',
            why_it_matters: 'In emergency HVAC searches during peak summer heat, Google heavily weighs continuous review velocity and recency when ranking businesses in the local 3-pack.',
            recommended_action: 'Integrate automated SMS review requests into HouseCall Pro after each completed service dispatch to maintain steady review velocity.',
            supporting_details: [
              'Verified customer rating: 4.9 stars with outstanding service sentiment',
              'Corroborated review footprint: 200+ customer reviews across public platforms (211 on Trustindex)',
              'Recommended workflow: Automated SMS review trigger upon HouseCall Pro invoice settlement'
            ]
          },
          {
            rank: 4,
            title: 'Embed LocalBusiness HVAC Schema and Optimize Emergency Booking on topcareairaz.com',
            priority_level: 'Medium Priority',
            category: 'Website',
            what_we_found: 'The website topcareairaz.com is fast, responsive, and includes HouseCall Pro booking, but lacks structured HVACBusiness JSON-LD schema markup with service area geocoding.',
            why_it_matters: 'Structured HVACBusiness schema directly communicates service radius and emergency availability to search engine crawlers, improving local snippet visibility.',
            recommended_action: 'Add structured HVACBusiness JSON-LD schema markup including geo-coordinates, 24/7 operating hours, and service radius details.',
            supporting_details: [
              'Website responsive and SSL secure with fast load times (HTTP 200 OK)',
              'Missing JSON-LD schema: HVACBusiness, GeoShape service radius',
              'Opportunity to create dedicated neighborhood landing pages across Tucson and Oro Valley'
            ]
          }
        ],
        competitive_snapshot: {
          comparisons: [
            {
              competitor_name: 'Hamstra Heating & Cooling',
              observation: 'Hamstra Heating & Cooling holds a 4.9 rating with 16 listed GBP services (vs. 6 for Top Care Air) and 580 Google reviews.'
            }
          ],
          competitor_metrics: {
            target: { rating: 4.9, services: 6 },
            competitor: { name: 'Hamstra Heating & Cooling', rating: 4.9, services: 16 }
          }
        },
        action_roadmap: [
          { step: 1, action: 'Claim and optimize verified contractor profiles on Yelp, HomeAdvisor, and Thumbtack.' },
          { step: 2, action: 'Expand Google Business Profile service offerings with secondary HVAC categories.' },
          { step: 3, action: 'Connect HouseCall Pro automated SMS review triggers to scale Google review velocity.' },
          { step: 4, action: 'Embed structured HVACBusiness JSON-LD schema markup on topcareairaz.com.' }
        ]
      }
    })
  };

  const orchestrator = new AuditOrchestrator({
    outputDir: path.resolve(__dirname, '../../audit-output'),
    adapters,
    branding: {
      brand_name: 'Mark Bishop Media',
      email: 'mark@markbishopmedia.com',
      phone: '+1 (520) 349-6378',
      primary_color: '#0B192C',
      secondary_color: '#D97706'
    }
  });

  orchestrator.createAudit(businessInput);
  const result = await orchestrator.run();

  const auditStatePath = path.resolve(__dirname, '../../audit-output/top-care-air-audit-001.json');
  fs.writeFileSync(auditStatePath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`✓ Master Audit State saved: ${auditStatePath}`);

  // Build Final Universal Web Report
  const reportContent = result.outputs.report_content;
  reportContent.evidence_registry = [
    { id: 'gbp-001', claim: '4.9 rating on Google Business Profile', source_url: gbpUrl },
    { id: 'comp-001', claim: 'Hamstra Heating & Cooling benchmark 16 services', source_url: 'https://hamstraheating.com/' },
    { id: 'web-001', claim: 'topcareairaz.com schema gap', source_url: 'https://topcareairaz.com/' }
  ];
  reportContent.business_context = result.business_context;

  const webResult = buildHTML(reportContent, {
    brand_name: 'Mark Bishop Media',
    email: 'mark@markbishopmedia.com',
    phone: '+1 (520) 349-6378'
  });

  const reportsDir = path.resolve(__dirname, '../../reports/top-care-air');
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
  const htmlPath = path.join(reportsDir, 'report.html');
  fs.writeFileSync(htmlPath, webResult.html, 'utf8');
  console.log(`✓ Universal HTML Report generated: ${htmlPath}`);

  return { result, htmlPath, auditStatePath };
}

if (require.main === module) {
  runAudit().catch(err => {
    console.error('Audit Error:', err);
    process.exit(1);
  });
}

module.exports = { runAudit };
