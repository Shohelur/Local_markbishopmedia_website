'use strict';

const path = require('path');
const fs = require('fs');
const { AuditOrchestrator } = require('./engine');
const { buildHTML } = require('../../skills/web-report/renderer/html-builder');

async function runAudit() {
  console.log('════════════════════════════════════════════════════════════════');
  console.log('       LOCAL BUSINESS AI — NEW BUSINESS AUDIT PIPELINE          ');
  console.log('════════════════════════════════════════════════════════════════');

  const businessInput = {
    report_id: 'mark-bishop-media-audit-001',
    business_name: 'Mark Bishop Media',
    address: '6245 E Broadway Blvd #400',
    city: 'Tucson',
    state: 'AZ',
    zip: '85711',
    phone: '+1 (520) 349-6378',
    website: 'https://markbishopmedia.com/',
    primary_category: 'Marketing Consultant',
    services: [
      'Podcast Production & Distribution',
      'Digital Marketing & Lead Generation',
      'Book Publishing & Author Marketing',
      'Strategic Communications Consulting',
      'Brand Development & Advertising Strategy'
    ],
    google_business_profile_url: 'https://maps.app.goo.gl/djiVs1bgYaLUr45R9',
    business_description: 'Media and digital marketing agency specializing in tra-digital marketing, podcast production (including Tucson Means Business), and author branding.',
    metadata: {
      rating: 5.0,
      reviews_count: 1,
      services_count: 5,
      audit_date: '2026-08-16',
      target_location: 'Tucson, AZ',
      competitor_name: 'Anchor Wave Digital Marketing Agency',
      competitor_reviews: 254,
      competitor_rating: 4.9,
      competitor_services: 18
    }
  };

  const adapters = {
    citation_research: async (ctx, audit) => ({
      status: 'COMPLETED',
      directories_checked: 15,
      directories_present: 5,
      citations: [
        { directory: 'Google Business Profile', status: 'listed', url: 'https://maps.app.goo.gl/djiVs1bgYaLUr45R9' },
        { directory: 'Apple Podcasts / FeedSpot', status: 'listed', url: null },
        { directory: 'VoyagePhoenix', status: 'listed', url: null },
        { directory: 'YouTube', status: 'listed', url: null },
        { directory: 'Clutch', status: 'missing', url: null },
        { directory: 'UpCity', status: 'missing', url: null },
        { directory: 'DesignRush', status: 'missing', url: null },
        { directory: 'Better Business Bureau', status: 'missing', url: null }
      ]
    }),
    review_analysis: async (ctx, audit) => ({
      status: 'COMPLETED',
      reviews_count: 1,
      rating: 5.0,
      sentiment_summary: '100% positive review rating highlighting exceptional podcast production quality, professional media interviews, and clear strategic guidance.',
      themes: [
        'High-quality audio/video podcast production',
        'Exceptional host and interviewer presence',
        'Strong community connection across Tucson'
      ]
    }),
    competitor_analysis: async (ctx, audit) => ({
      status: 'COMPLETED',
      primary_competitor: {
        name: 'Anchor Wave Digital Marketing Agency',
        website: 'https://anchorwave.com/',
        rating: 4.9,
        reviews_count: 254,
        services_count: 18,
        strengths: ['High Google review volume (254 reviews)', 'Broad listed GBP service categories (18 services)'],
        weaknesses: ['Does not offer dedicated broadcast/podcast media production networks']
      }
    }),
    website_audit: async (ctx, audit) => ({
      status: 'COMPLETED',
      url: 'https://markbishopmedia.com/',
      status_code: 200,
      mobile_responsive: true,
      has_ssl: true,
      findings: [
        'Website loads quickly with comprehensive podcast show archives.',
        'Lacks LocalBusiness schema markup and structured PodcastSeries metadata.',
        'Could benefit from dedicated landing pages for core B2B digital marketing services.'
      ]
    }),
    evidence_validation: async (ctx, audit) => ({
      status: 'COMPLETED',
      registry: [
        { id: 'gbp-001', claim: '5.0 rating with 1 verified Google review', source_url: 'https://maps.app.goo.gl/djiVs1bgYaLUr45R9', verified: true },
        { id: 'cit-001', claim: 'Missing major agency directories (Clutch, UpCity, DesignRush)', source_url: 'https://www.clutch.co', verified: true },
        { id: 'comp-001', claim: 'Anchor Wave has 254 reviews and 18 GBP services', source_url: 'https://anchorwave.com/', verified: true },
        { id: 'web-001', claim: 'markbishopmedia.com lacks LocalBusiness JSON-LD schema', source_url: 'https://markbishopmedia.com/', verified: true }
      ]
    }),
    priority_engine: async (ctx, audit) => ({
      status: 'COMPLETED',
      priorities: [
        {
          rank: 1,
          id: 'pri-rev-01',
          category: 'Reputation & Reviews',
          priority_level: 'High Priority',
          title: 'Bridge the Review Volume Gap Behind Top Tucson Marketing Agencies',
          what_we_found: 'Mark Bishop Media holds a perfect 5.0-star rating from 1 verified review on Google Maps. However, primary local marketing benchmark Anchor Wave holds 254 Google reviews, creating a significant volume deficit for local map-pack search authority.',
          why_it_matters: 'In competitive B2B and agency searches, Google prioritizes businesses with established review velocity and high volume in the local 3-pack.',
          recommended_action: 'Deploy an automated post-interview and client milestone review request workflow to steadily scale review count to 25+ over the next 90 days.',
          supporting_details: [
            'Current rating: 5.0 stars with 1 verified Google review',
            'Anchor Wave benchmark: 4.9 stars with 254 Google reviews',
            '100% positive sentiment across client feedback'
          ]
        },
        {
          rank: 2,
          id: 'pri-cit-01',
          category: 'Directory Citations',
          priority_level: 'High Priority',
          title: 'Expand High-Impact Local Marketing & Media Directory Listings',
          what_we_found: 'Mark Bishop Media is indexed on select media platforms (VoyagePhoenix, FeedSpot, YouTube), but lacks structured directory citations on high-authority agency platforms including Clutch, UpCity, and DesignRush.',
          why_it_matters: 'Industry-specific agency directories pass authoritative local backlinks and serve as independent trust verification for B2B buyers searching for Tucson media services.',
          recommended_action: 'Claim and optimize verified agency profiles on Clutch, UpCity, and DesignRush with consistent NAP and portfolio links.',
          supporting_details: [
            'Indexed directories: Google Maps, VoyagePhoenix, FeedSpot, YouTube',
            'Missing authority directories: Clutch, UpCity, DesignRush, BBB',
            'Estimated citation coverage score: Moderate (5/15 tracked sources)'
          ]
        },
        {
          rank: 3,
          id: 'pri-gbp-01',
          category: 'Google Business Profile',
          priority_level: 'Medium Priority',
          title: 'Optimize Google Business Profile Category & Service Spectrum',
          what_we_found: 'Mark Bishop Media lists 5 core service areas on Google Business Profile, whereas top competitor Anchor Wave lists 18 comprehensive agency services.',
          why_it_matters: 'Listing secondary service categories triggers keyword relevancy for long-tail searches such as "podcast studio rental Tucson", "B2B media consulting", and "author marketing Arizona".',
          recommended_action: 'Add comprehensive secondary service offerings to Google Business Profile including Podcast Recording Studio, Media Consultant, and Advertising Agency.',
          supporting_details: [
            'Current listed GBP services: 5 services',
            'Competitor listed GBP services: 18 services',
            'Identified keyword opportunities: Podcast Studio, Media Consultant, B2B Video Production'
          ]
        },
        {
          rank: 4,
          id: 'pri-web-01',
          category: 'Website & Local SEO',
          priority_level: 'Medium Priority',
          title: 'Implement LocalBusiness & Podcast Series Schema on markbishopmedia.com',
          what_we_found: 'The website at markbishopmedia.com hosts extensive podcast show archives but lacks structured LocalBusiness and BroadcastChannel JSON-LD schema markup.',
          why_it_matters: 'Schema markup provides structured machine-readable signals to Google Search, enhancing rich snippet eligibility for podcast episodes and local Tucson service queries.',
          recommended_action: 'Embed structured LocalBusiness schema with geo-coordinates, telephone, and PodcastSeries markup on all show archive pages.',
          supporting_details: [
            'Website responsive and SSL secure (HTTP 200 OK)',
            'Missing JSON-LD schema: LocalBusiness, BroadcastChannel, VideoObject',
            'Opportunity for dedicated service landing pages for Tucson B2B marketing'
          ]
        }
      ]
    }),
    report_writer: async (ctx, audit) => ({
      status: 'COMPLETED',
      report_content: {
        metadata: {
          business_name: 'Mark Bishop Media',
          business_location: 'Tucson, Arizona',
          audit_date: '2026-08-16',
          rating: 5.0,
          reviews_count: 1,
          services_count: 5
        },
        cover: {
          business_name: 'Mark Bishop Media',
          location: 'Tucson, Arizona',
          report_title: 'Local Visibility Audit',
          subtitle: 'We reviewed the public signals that shape how your business is discovered, compared, and trusted locally — and identified the opportunities worth addressing first.'
        },
        executive_snapshot: {
          strengths: [
            { area: 'Flawless Reputation Foundation', observation: 'Perfect 5.0-star rating on Google Maps with verified client testimonial feedback.' },
            { area: 'Media & Podcasting Authority', observation: 'Established leadership in local business broadcasting through flagship programs like Tucson Means Business.' },
            { area: 'Fast & Secure Web Foundation', observation: 'Modern, responsive website foundation with rich multimedia show archives at markbishopmedia.com.' }
          ],
          opportunities: [
            { area: 'Review Volume Velocity', observation: '1 review compared to Anchor Wave with 254 reviews in the Tucson market.' },
            { area: 'Industry Directory Authority', observation: 'Opportunity to claim high-trust B2B agency profiles on Clutch, UpCity, and DesignRush.' },
            { area: 'Structured Schema Architecture', observation: 'Implementing LocalBusiness and PodcastSeries JSON-LD markup to capture rich search snippets.' }
          ],
          scorecard: [
            { pillar: 'Citations & Directories', status: 'opportunity', label: 'Action Recommended', score_text: '5 / 15 Listed (Agency Gap)' },
            { pillar: 'Google Business Profile', status: 'opportunity', label: 'Growth Opportunity', score_text: '5.0 Rating · 5 Services (vs. 18 Competitor)' },
            { pillar: 'Customer Reviews', status: 'opportunity', label: 'Volume Opportunity', score_text: '5.0★ Rating · 1 Verified Review (vs. 254)' },
            { pillar: 'Website Signals & Schema', status: 'strong', label: 'Established Asset', score_text: 'Fast & Secure · Schema Gap' }
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
            score_text: '5 / 15 Listed (Agency Gap)',
            summary: 'Active on select media platforms; missing major B2B agency directories (Clutch, UpCity).',
            meter_fill: 2
          },
          {
            num: '02',
            area: 'Google Business Profile',
            status: 'opportunity',
            label: 'Growth Opportunity',
            confidence: 'high',
            evidence_count: 2,
            score_text: '5.0 Rating · 5 Services (vs. 18 Competitor)',
            summary: 'Verified listing at 6245 E Broadway Blvd #400 with 5 core services; competitor lists 18 services.',
            meter_fill: 3
          },
          {
            num: '03',
            area: 'Customer Reviews & Reputation',
            status: 'opportunity',
            label: 'Volume Opportunity',
            confidence: 'high',
            evidence_count: 1,
            score_text: '5.0★ Rating · 1 Verified Review (vs. 254)',
            summary: 'Perfect 5.0-star rating from 1 verified Google review; significant review volume gap against market benchmark.',
            meter_fill: 2
          },
          {
            num: '04',
            area: 'Website Signals & Schema',
            status: 'strong',
            label: 'Established Asset',
            confidence: 'high',
            evidence_count: 2,
            score_text: 'Fast & Secure · Schema Gap',
            summary: 'Responsive website with rich media archives; opportunity to add structured PodcastSeries schema.',
            meter_fill: 4
          }
        ],
        top_priorities: [
          {
            rank: 1,
            title: 'Bridge the Review Volume Gap Behind Top Tucson Marketing Agencies',
            priority_level: 'High Priority',
            category: 'Reviews',
            what_we_found: 'Mark Bishop Media holds a perfect 5.0-star rating from 1 verified review on Google Maps. However, primary local marketing benchmark Anchor Wave holds 254 Google reviews, creating a significant volume deficit for local map-pack search authority.',
            why_it_matters: 'In competitive B2B and agency searches, Google prioritizes businesses with established review velocity and high volume in the local 3-pack.',
            recommended_action: 'Deploy an automated post-interview and client milestone review request workflow to steadily scale review count to 25+ over the next 90 days.',
            supporting_details: [
              'Current rating: 5.0 stars with 1 verified Google review',
              'Anchor Wave benchmark: 4.9 stars with 254 Google reviews',
              '100% positive sentiment across client feedback'
            ]
          },
          {
            rank: 2,
            title: 'Expand High-Impact Local Marketing & Media Directory Listings',
            priority_level: 'High Priority',
            category: 'Directories',
            what_we_found: 'Mark Bishop Media is indexed on select media platforms (VoyagePhoenix, FeedSpot, YouTube), but lacks structured directory citations on high-authority agency platforms including Clutch, UpCity, and DesignRush.',
            why_it_matters: 'Industry-specific agency directories pass authoritative local backlinks and serve as independent trust verification for B2B buyers searching for Tucson media services.',
            recommended_action: 'Claim and optimize verified agency profiles on Clutch, UpCity, and DesignRush with consistent NAP and portfolio links.',
            supporting_details: [
              'Indexed directories: Google Maps, VoyagePhoenix, FeedSpot, YouTube',
              'Missing authority directories: Clutch, UpCity, DesignRush, BBB',
              'Estimated citation coverage score: Moderate (5/15 tracked sources)'
            ]
          },
          {
            rank: 3,
            title: 'Optimize Google Business Profile Category & Service Spectrum',
            priority_level: 'Medium Priority',
            category: 'Google Business Profile',
            what_we_found: 'Mark Bishop Media lists 5 core service areas on Google Business Profile, whereas top competitor Anchor Wave lists 18 comprehensive agency services.',
            why_it_matters: 'Listing secondary service categories triggers keyword relevancy for long-tail searches such as "podcast studio rental Tucson", "B2B media consulting", and "author marketing Arizona".',
            recommended_action: 'Add comprehensive secondary service offerings to Google Business Profile including Podcast Recording Studio, Media Consultant, and Advertising Agency.',
            supporting_details: [
              'Current listed GBP services: 5 services',
              'Competitor listed GBP services: 18 services',
              'Identified keyword opportunities: Podcast Studio, Media Consultant, B2B Video Production'
            ]
          },
          {
            rank: 4,
            title: 'Implement LocalBusiness & Podcast Series Schema on markbishopmedia.com',
            priority_level: 'Medium Priority',
            category: 'Website',
            what_we_found: 'The website at markbishopmedia.com hosts extensive podcast show archives but lacks structured LocalBusiness and BroadcastChannel JSON-LD schema markup.',
            why_it_matters: 'Schema markup provides structured machine-readable signals to Google Search, enhancing rich snippet eligibility for podcast episodes and local Tucson service queries.',
            recommended_action: 'Embed structured LocalBusiness schema with geo-coordinates, telephone, and PodcastSeries markup on all show archive pages.',
            supporting_details: [
              'Website responsive and SSL secure (HTTP 200 OK)',
              'Missing JSON-LD schema: LocalBusiness, BroadcastChannel, VideoObject',
              'Opportunity for dedicated service landing pages for Tucson B2B marketing'
            ]
          }
        ],
        competitive_snapshot: {
          comparisons: [
            {
              competitor_name: 'Anchor Wave Digital Marketing Agency',
              observation: 'Anchor Wave Digital Marketing Agency has 254 Google reviews (vs. 1 for Mark Bishop Media) and a 4.9 rating (vs. 5.0), with 18 listed GBP services (vs. 5).'
            }
          ],
          competitor_metrics: {
            target: { reviews: 1, rating: 5.0, services: 5 },
            competitor: { name: 'Anchor Wave Digital Marketing Agency', reviews: 254, rating: 4.9, services: 18 }
          }
        },
        action_roadmap: [
          { step: 1, action: 'Deploy post-show and client review request system to steadily build verified Google reviews.' },
          { step: 2, action: 'Claim and optimize verified agency profiles on Clutch, UpCity, and DesignRush.' },
          { step: 3, action: 'Expand Google Business Profile service catalogue with secondary media and studio offerings.' },
          { step: 4, action: 'Embed structured LocalBusiness and PodcastSeries JSON-LD schema markup on markbishopmedia.com.' }
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

  const auditStatePath = path.resolve(__dirname, '../../audit-output/mark-bishop-media-audit-001.json');
  fs.writeFileSync(auditStatePath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`✓ Master Audit State saved: ${auditStatePath}`);

  // Build Final Universal Web Report
  const reportContent = result.outputs.report_content;
  reportContent.evidence_registry = [
    { id: 'gbp-001', claim: '5.0 rating with 1 verified Google review', source_url: 'https://maps.app.goo.gl/djiVs1bgYaLUr45R9' },
    { id: 'comp-001', claim: 'Anchor Wave benchmark 254 reviews', source_url: 'https://anchorwave.com/' },
    { id: 'web-001', claim: 'markbishopmedia.com schema gap', source_url: 'https://markbishopmedia.com/' }
  ];
  reportContent.business_context = result.business_context;

  const webResult = buildHTML(reportContent, {
    brand_name: 'Mark Bishop Media',
    email: 'mark@markbishopmedia.com',
    phone: '+1 (520) 349-6378'
  });

  const reportsDir = path.resolve(__dirname, '../../reports/mark-bishop-media');
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
