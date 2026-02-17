# Information Architecture & Recommended Site Map
## Pillars of Change Media — pillarsofchange.com

---

## 1. Current State Assessment

### What the Site Likely Has (Based on Launch Stage)
Pillars of Change Media launched on January 28, 2026. As a newly launched content studio, the current site likely has:
- A single-page or minimal multi-page marketing site
- Basic company information and mission statement
- Links to podcast platforms (if live)
- Contact information

### What's Missing
- **No search engine indexation** — `site:pillarsofchange.com` returns zero Google results
- **Bot-blocking behavior** — The server returns 403 errors to crawlers
- **No discoverable sitemap.xml or robots.txt**
- **Limited content depth** — No blog, no dedicated show pages, no impact reporting
- **No content taxonomy** — No way to browse by pillar, show, or content type
- **No user journeys** — No clear paths for different audience segments (listeners, partners, donors, press)

---

## 2. Recommended Site Map

```
pillarsofchange.com/
│
├── / (Homepage)
│
├── /about/
│   ├── /about/team/
│   └── /about/partners/
│
├── /pillars/
│   ├── /pillars/human-rights/
│   ├── /pillars/social-justice/
│   ├── /pillars/education/
│   ├── /pillars/health-and-wellness/
│   └── /pillars/food-insecurity/
│
├── /shows/
│   ├── /shows/pride-this-way/
│   │   ├── /shows/pride-this-way/episodes/
│   │   ├── /shows/pride-this-way/episodes/{episode-slug}/
│   │   ├── /shows/pride-this-way/cities/
│   │   └── /shows/pride-this-way/about/
│   ├── /shows/court-on-trial/
│   │   ├── /shows/court-on-trial/episodes/
│   │   ├── /shows/court-on-trial/episodes/{episode-slug}/
│   │   └── /shows/court-on-trial/about/
│   └── /shows/{future-show-slug}/
│
├── /impact/
│   ├── /impact/model/
│   ├── /impact/reports/
│   ├── /impact/reports/{year}/
│   └── /impact/stories/
│
├── /blog/
│   ├── /blog/{post-slug}/
│   ├── /blog/category/{pillar-slug}/
│   └── /blog/category/{content-type}/
│
├── /press/
│   ├── /press/releases/
│   ├── /press/media-kit/
│   └── /press/in-the-news/
│
├── /contact/
│   ├── /contact/partnerships/
│   ├── /contact/press/
│   └── /contact/pitch/
│
├── /privacy-policy/
├── /terms-of-service/
├── /sitemap.xml
└── /robots.txt
```

---

## 3. Navigation Structure

### Primary Navigation (Desktop)
```
[Logo: PILLARS of Change]   Shows ▼   Pillars ▼   Impact   About   Contact   [Listen Now →]
                              │          │
                              │          ├── Human Rights
                              │          ├── Social Justice
                              │          ├── Education
                              │          ├── Health & Wellness
                              │          └── Food Insecurity
                              │
                              ├── All Shows
                              ├── Pride This Way
                              └── Court on Trial
```

### Mobile Navigation
```
[Logo]                                                          [☰ Hamburger]
                                                                    │
                                                                    ├── Shows
                                                                    │   ├── All Shows
                                                                    │   ├── Pride This Way
                                                                    │   └── Court on Trial
                                                                    ├── Pillars
                                                                    │   ├── Human Rights
                                                                    │   ├── Social Justice
                                                                    │   ├── Education
                                                                    │   ├── Health & Wellness
                                                                    │   └── Food Insecurity
                                                                    ├── Impact
                                                                    ├── About
                                                                    │   ├── Our Story
                                                                    │   ├── Team
                                                                    │   └── Partners
                                                                    ├── Contact
                                                                    ├── Press
                                                                    └── [Listen Now →]
```

### Footer Navigation
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  PILLARS of Change              Shows              Company        Connect   │
│  Purpose-driven content         Pride This Way      About          Contact  │
│  studio turning storytelling    Court on Trial      Team           Press    │
│  into measurable social         All Shows           Partners       Pitch    │
│  impact.                                            Impact                  │
│                                 Pillars             Blog           Social   │
│  [IG] [YT] [X] [LI] [TT]      Human Rights        Press          IG / YT  │
│                                 Social Justice      Privacy        X / LI   │
│                                 Education           Terms          TT       │
│                                 Health & Wellness                           │
│                                 Food Insecurity                             │
│                                                                             │
│  ──────────────────────────────────────────────────────────────────────────  │
│  © 2026 Pillars of Change, LLC         Privacy Policy  |  Terms of Service  │
│                                                                             │
│  Newsletter: [Your email _______________] [Subscribe]                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Page Inventory

### 4.1 Homepage — `/`
| Attribute | Detail |
|---|---|
| **Purpose** | Introduce POC's mission, showcase programming, and drive engagement |
| **Target Audience** | All visitors — first impression |
| **User Intent** | "What is Pillars of Change?" |
| **SEO Keywords** | pillars of change media, purpose-driven content studio, storytelling social impact |
| **Key Content Elements** | Hero with mission + CTA, Five Pillars visual showcase, Featured Shows (Pride This Way, Court on Trial), Impact metrics ticker, Latest episodes feed, Partners section, Newsletter signup |
| **Primary CTA** | "Listen Now" / "Watch Our Shows" |
| **Secondary CTA** | "Learn About Our Impact" |

### 4.2 About — `/about/`
| Attribute | Detail |
|---|---|
| **Purpose** | Tell the POC origin story, explain the model, build trust |
| **Target Audience** | Potential partners, press, curious visitors |
| **User Intent** | "Who is behind this and why should I trust them?" |
| **SEO Keywords** | about pillars of change, H.J. Taylor producer, purpose-driven media company |
| **Key Content Elements** | Founder story (H.J. Taylor), Mission & vision statements, The five pillars explained, Business model (how storytelling funds change), Timeline/milestones, UPI Loan Fund partnership |
| **Primary CTA** | "Partner With Us" |

### 4.3 Team — `/about/team/`
| Attribute | Detail |
|---|---|
| **Purpose** | Humanize the brand, showcase expertise |
| **Target Audience** | Press, partners, industry professionals |
| **User Intent** | "Who works here?" |
| **SEO Keywords** | pillars of change team, H.J. Taylor, Mandy Goldberg producer |
| **Key Content Elements** | H.J. Taylor (Founder & CEO), Mandy Goldberg (Producer), Soraya Vivian (Host, Pride This Way), Cris Wright (Host, Court on Trial), Jack Horlock (Horlock House), Advisory board (if applicable) |

### 4.4 Partners — `/about/partners/`
| Attribute | Detail |
|---|---|
| **Purpose** | Showcase the partner ecosystem and build credibility |
| **Target Audience** | Potential sponsors, nonprofits, brand partners |
| **User Intent** | "Who do they work with?" |
| **SEO Keywords** | pillars of change partners, UPI Loan Fund, Horlock House |
| **Key Content Elements** | UPI Loan Fund (CDFI) partnership detail, Horlock House (Pride partnerships), Nonprofit partners, Brand sponsors, How to become a partner CTA |

### 4.5 Pillars Overview — `/pillars/`
| Attribute | Detail |
|---|---|
| **Purpose** | Explain the five-pillar framework that drives all content |
| **Target Audience** | All visitors wanting to understand the mission |
| **User Intent** | "What are the five pillars and how do they guide the work?" |
| **SEO Keywords** | five pillars of change, human rights media, social justice content, content with purpose |
| **Key Content Elements** | Visual overview of all five pillars, Brief description of each with link to detail page, Related shows per pillar, Impact data per pillar |

### 4.6 Individual Pillar Pages — `/pillars/{pillar-slug}/`
| Attribute | Detail |
|---|---|
| **Purpose** | Deep dive into each pillar's focus, related content, and impact |
| **Target Audience** | Cause-aligned visitors, nonprofit partners, donors |
| **SEO Keywords** | (varies per pillar — see below) |
| **Key Content Elements** | Pillar definition and why it matters, Related shows and episodes, Impact metrics for this pillar, Beneficiary stories, Nonprofit partners in this space, Related blog posts |

**Pillar-Specific Keywords:**
| Pillar | Target Keywords |
|---|---|
| Human Rights | human rights podcast, human rights storytelling, LGBTQ+ media, pride podcast |
| Social Justice | social justice podcast, racial justice content, equity media |
| Education | education podcast, educational media, learning content |
| Health & Wellness | health and wellness podcast, mental health media, wellness content |
| Food Insecurity | food insecurity awareness, hunger podcast, food justice media |

### 4.7 Shows Listing — `/shows/`
| Attribute | Detail |
|---|---|
| **Purpose** | Browse all POC programming |
| **Target Audience** | Podcast/vodcast listeners, content consumers |
| **User Intent** | "What shows do they produce?" |
| **SEO Keywords** | pillars of change shows, purpose-driven podcasts, social impact podcasts |
| **Key Content Elements** | Featured show spotlight, Show grid/cards with filtering by pillar, Each card: artwork, title, host, pillar tag, format (podcast/vodcast), description, CTA |
| **Filters** | By pillar, by format (podcast, vodcast, digital experience), by status (live, upcoming) |

### 4.8 Show Detail — `/shows/{show-slug}/`
| Attribute | Detail |
|---|---|
| **Purpose** | Deep dive into a specific show, drive subscriptions and listens |
| **Target Audience** | Podcast listeners, potential subscribers |
| **User Intent** | "Tell me about this show and let me listen" |
| **SEO Keywords** | (varies per show — see below) |
| **Key Content Elements** | Show artwork + hero, Description, Host bio + photo, Episode list with player, Subscribe links (Apple, Spotify, YouTube, RSS), Season/schedule info, Related pillar info, Social sharing |

**Show-Specific Keywords:**
| Show | Target Keywords |
|---|---|
| Pride This Way | pride this way podcast, Soraya Vivian, LGBTQ+ travel podcast, pride events podcast, globe-trotting pride |
| Court on Trial | court on trial podcast, Cris Wright, justice podcast, legal system podcast |

### 4.9 Episode Detail — `/shows/{show-slug}/episodes/{episode-slug}/`
| Attribute | Detail |
|---|---|
| **Purpose** | Individual episode page for SEO and deep linking |
| **Target Audience** | Search visitors, social media referrals |
| **User Intent** | "I want to listen to this specific episode" |
| **SEO Keywords** | episode title + show name, guest names, topic keywords |
| **Key Content Elements** | Embedded player, Episode description, Show notes, Transcript (for SEO and accessibility), Guest bios, Related episodes, Subscribe CTA |

### 4.10 Impact — `/impact/`
| Attribute | Detail |
|---|---|
| **Purpose** | Demonstrate measurable social impact, build donor/partner trust |
| **Target Audience** | Potential donors, nonprofit partners, CSR professionals |
| **User Intent** | "What real impact are they making?" |
| **SEO Keywords** | pillars of change impact, storytelling social impact, content philanthropy, media for good |
| **Key Content Elements** | How the model works (visual flow diagram), Total impact metrics, Impact breakdown by pillar, UPI Loan Fund partnership detail, Beneficiary stories, Quarterly donation reports, "Get Involved" CTAs |

### 4.11 Impact Reports — `/impact/reports/`
| Attribute | Detail |
|---|---|
| **Purpose** | Transparency and accountability |
| **Target Audience** | Partners, donors, press |
| **Key Content Elements** | Quarterly/annual reports (PDF + web), Financial breakdowns, Community stories, Partner acknowledgments |

### 4.12 Blog — `/blog/`
| Attribute | Detail |
|---|---|
| **Purpose** | SEO content hub, thought leadership, audience engagement |
| **Target Audience** | Organic search visitors, newsletter subscribers |
| **User Intent** | Informational queries related to the five pillars |
| **SEO Keywords** | Long-tail keywords across all five pillars |
| **Key Content Elements** | Article feed with featured post, Category filtering (by pillar), Author attribution, Related episodes/shows, Social sharing, Newsletter CTA |
| **Content Types** | Behind-the-scenes, Pillar deep-dives, Guest op-eds, Impact stories, Industry thought pieces |

### 4.13 Press — `/press/`
| Attribute | Detail |
|---|---|
| **Purpose** | Serve journalists and media professionals |
| **Target Audience** | Journalists, bloggers, media outlets |
| **User Intent** | "I need information about POC for a story" |
| **SEO Keywords** | pillars of change press, pillars of change media news |
| **Key Content Elements** | Press releases (chronological), Media kit download (logos, bios, photos), Press coverage / "In the News", Media contact information, Key facts & figures |

### 4.14 Contact — `/contact/`
| Attribute | Detail |
|---|---|
| **Purpose** | Enable inquiries from all audience segments |
| **Target Audience** | Everyone — partners, press, listeners, nonprofits |
| **User Intent** | "I want to reach out" |
| **SEO Keywords** | contact pillars of change, pillars of change partnerships |
| **Key Content Elements** | General contact form with inquiry type dropdown, Specific pathways: Partnership, Press, Content Pitch, Office location (New York), Social media links, FAQ section |

### 4.15 Legal Pages
- **`/privacy-policy/`** — Standard privacy policy
- **`/terms-of-service/`** — Terms of use

---

## 5. User Journey Maps

### Journey 1: New Visitor / General Discovery
```
Search/Social/PR Link
    → Homepage (/)
        → Reads mission, sees five pillars
        → Clicks "Learn More" on a pillar
            → Pillar page (/pillars/social-justice/)
                → Sees related shows
                → Clicks show
                    → Show page (/shows/pride-this-way/)
                        → Listens to episode
                        → Subscribes on Spotify/Apple
        OR
        → Scrolls to shows section
            → Clicks "Pride This Way"
                → Show detail → Episode → Subscribe
```

### Journey 2: Potential Partner / Sponsor
```
Direct URL / Referral / LinkedIn
    → Homepage (/)
        → About (/about/)
            → Reads mission + business model
            → Team (/about/team/) — evaluates credibility
            → Partners (/about/partners/) — sees existing partnerships
        → Impact (/impact/)
            → Reviews metrics and reports
            → Downloads impact report
        → Contact (/contact/partnerships/)
            → Submits partnership inquiry form
```

### Journey 3: Podcast Listener (Referred)
```
Podcast App / Social Media / Word of Mouth
    → Show Detail (/shows/pride-this-way/)
        → Browses episodes
        → Clicks specific episode
            → Episode page (/shows/pride-this-way/episodes/ep-01-yorkshire/)
                → Listens via embedded player
                → Reads transcript/show notes
                → Subscribes via platform links
        → Explores other shows
            → Shows listing (/shows/)
        → Learns about mission
            → Impact (/impact/) or About (/about/)
```

### Journey 4: Nonprofit / Community Organization
```
Search / Referral / PR Coverage
    → Homepage (/)
        → Impact (/impact/)
            → Reads how the model works
            → Reads beneficiary stories
            → Reviews UPI Loan Fund partnership
        → Relevant Pillar page (/pillars/food-insecurity/)
            → Sees funding going to this cause area
        → Contact (/contact/)
            → Submits inquiry about receiving support
```

### Journey 5: Journalist / Press
```
PR Coverage Link / Direct Search
    → Press (/press/)
        → Downloads media kit
        → Reads press releases
        → Finds media contact
    → About (/about/) — background research
    → Impact (/impact/) — story angles on impact
    → Show Detail — for show-specific coverage
    → Contact (/contact/press/) — submits press inquiry
```

### Journey 6: Content Creator / Pitch Submission
```
Industry Network / Social Media
    → Homepage (/) or Shows (/shows/)
        → Understands what POC produces
        → About (/about/) — reads about mission alignment
        → Contact (/contact/pitch/)
            → Submits content pitch with show concept
```

---

## 6. Content Hierarchy by Page

### Homepage Content Priority (Top → Bottom)
1. **Hero** — Mission statement + primary CTA ("Watch Now" / "Listen Now")
2. **Five Pillars** — Visual showcase, immediate brand understanding
3. **Featured Shows** — Pride This Way and Court on Trial cards
4. **Impact Stats** — Key metrics (donations, partners, communities served)
5. **Latest Content** — 3 most recent episodes/posts
6. **Partners** — UPI Loan Fund + key logos
7. **Newsletter** — Email capture
8. **Footer** — Full navigation + social links

### Show Detail Content Priority
1. **Show Hero** — Artwork, title, host, format, CTA to listen
2. **Subscribe Bar** — Platform links (Apple, Spotify, YouTube, RSS)
3. **Latest Episode** — Featured/most recent with embedded player
4. **Episode List** — Full chronological list with thumbnails
5. **Schedule/Cities** — (for Pride This Way) upcoming filming locations
6. **Host Bio** — Photo, bio, social links
7. **Related Pillar** — Connection to the mission
8. **Related Shows** — Cross-promotion

### Impact Page Content Priority
1. **How It Works** — Visual flow diagram (Create → Engage → Revenue → Give → Impact)
2. **Headline Metrics** — Total donated, nonprofits supported, communities reached
3. **Pillar Breakdown** — Impact by each of the five pillars
4. **UPI Loan Fund** — Partnership detail and credibility
5. **Beneficiary Stories** — Real community voices
6. **Reports** — Links to quarterly/annual reports
7. **Get Involved** — CTAs for different audience segments

---

## 7. Taxonomy & Tagging System

### Primary Taxonomies

#### 1. Pillar (Category)
Every piece of content is tagged to one or more pillars:
| Slug | Display Name | Color (suggested) |
|---|---|---|
| `human-rights` | Human Rights | Purple |
| `social-justice` | Social Justice | Red/Orange |
| `education` | Education | Blue |
| `health-and-wellness` | Health & Wellness | Green |
| `food-insecurity` | Food Insecurity | Yellow/Gold |

#### 2. Show (Category)
| Slug | Display Name | Status |
|---|---|---|
| `pride-this-way` | Pride This Way | Live |
| `court-on-trial` | Court on Trial | Live |
| `{future-show}` | (Scalable for new shows) | — |

#### 3. Content Type (Category)
| Slug | Display Name |
|---|---|
| `podcast` | Podcast |
| `vodcast` | Vodcast |
| `article` | Article |
| `press-release` | Press Release |
| `impact-report` | Impact Report |
| `digital-experience` | Digital Experience |

### Secondary Taxonomies (Tags)

#### Topics / Themes
Free-form tags for granular content discovery:
- `lgbtq+`, `pride-events`, `travel`, `music`, `activism`, `legal-system`, `criminal-justice`, `mental-health`, `nutrition`, `food-access`, `education-equity`, `storytelling`, `philanthropy`

#### People
Tag content by people featured:
- `soraya-vivian`, `cris-wright`, `hj-taylor`, `jack-horlock`, `mandy-goldberg`

#### Location
For location-based content (especially Pride This Way):
- Cities: `new-york`, `london`, `miami-beach`, `berlin`, `amsterdam`, `ibiza`, etc.
- Regions: `us`, `uk`, `europe`

### Filter Matrix

Users should be able to filter/browse content through combinations:

| Filter | Available On |
|---|---|
| By Pillar | Shows listing, Blog, Impact, Pillar pages |
| By Show | Episodes, Blog |
| By Content Type | Blog, Press |
| By Location | Pride This Way episodes/schedule |
| By Person/Host | Shows, Team |

### URL Pattern for Taxonomy Pages
```
/blog/category/{pillar-slug}/        → All blog posts for a pillar
/blog/category/{content-type}/       → All blog posts by type
/shows/?pillar={pillar-slug}         → Shows filtered by pillar
/pillars/{pillar-slug}/              → All content for a pillar
```

---

## 8. Technical Recommendations

### URL Structure Rules
- All lowercase, hyphenated slugs
- No trailing slashes (or enforce consistent trailing slashes)
- Maximum 3 levels of depth
- Canonical URLs on every page
- Breadcrumb navigation reflecting hierarchy

### Structured Data (JSON-LD)
Implement on every page:
- `Organization` — sitewide
- `WebSite` with `SearchAction` — homepage
- `BreadcrumbList` — all inner pages
- `PodcastSeries` — show pages
- `PodcastEpisode` — episode pages
- `Article` — blog posts
- `Person` — team/host pages
- `FAQPage` — contact page FAQ section

### Internal Linking Strategy
- Every show page links to its pillar
- Every pillar page links to related shows and blog posts
- Every episode links to its show, pillar, and related episodes
- Blog posts link to relevant shows and pillars
- Impact page links to pillar pages with per-pillar metrics
- Breadcrumbs on every page for crawlability

### Pagination & Scalability
- Episode lists: paginated (10 per page) with "Load More"
- Blog: paginated (12 per page) with category filtering
- RSS feeds: per show and sitewide blog

---

## 9. Content Governance

### Content Calendar Alignment
| Pillar | Content Frequency | Tied To |
|---|---|---|
| Human Rights | Weekly during Pride season, biweekly otherwise | Pride This Way episodes, UN dates |
| Social Justice | Biweekly | Court on Trial episodes, awareness months |
| Education | Monthly | Blog series, partner spotlights |
| Health & Wellness | Monthly | Blog series, awareness months |
| Food Insecurity | Monthly | Blog series, seasonal drives |

### Ownership
| Content Area | Owner |
|---|---|
| Show pages & episodes | Production team (Mandy Goldberg) |
| Blog | Content/editorial team |
| Impact reports | Operations / Finance |
| Press releases | Communications |
| Site pages (About, Pillars) | Marketing / Founder |

---

## 10. Migration & Implementation Priority

### Phase 1 — Launch Critical (Weeks 1-2)
1. Homepage (`/`)
2. About (`/about/`)
3. Shows listing (`/shows/`)
4. Show detail pages (Pride This Way, Court on Trial)
5. Contact (`/contact/`)
6. Privacy Policy & Terms
7. robots.txt & sitemap.xml
8. Google Search Console setup

### Phase 2 — Growth Foundation (Weeks 3-6)
1. Five pillar pages (`/pillars/*`)
2. Impact page (`/impact/`)
3. Episode detail pages with transcripts
4. Press page (`/press/`)
5. Blog launch with first 5 posts
6. Newsletter integration

### Phase 3 — Scale & Optimize (Months 2-6)
1. Team page (`/about/team/`)
2. Partners page (`/about/partners/`)
3. Impact reports section
4. Blog content ramp-up (2-4 posts/month)
5. Beneficiary stories
6. Advanced filtering and search
7. A/B testing on CTAs and conversion paths
