# DeSite-Landing-Page

## Contact attribution

The contact form captures the first entry in each browser tab, persists it in
`sessionStorage`, and submits `traffic_source`, `utm_source`, `utm_medium`,
`utm_campaign`, and `referrer_host` to `/api/contact`. The API forwards these fields
to the existing AWS Lambda separately from `message`. The Lambda email template
displays these fields in its Visit attribution section; `message` contains only
the visitor's message.

Add these query strings to the landing page URL used in campaigns:

| Channel | Query string |
| --- | --- |
| Facebook | `?utm_source=facebook&utm_medium=paid_social&utm_campaign=screeners` |
| Instagram | `?utm_source=instagram&utm_medium=paid_social&utm_campaign=screeners` |
| Google Ads | `?utm_source=google&utm_medium=cpc&utm_campaign=screeners` |

For unpaid social links use `utm_medium=social`. Google Ads click identifiers
(`gclid`, `gbraid`, `wbraid`) also identify Google Ads without UTMs. Click identifiers
are checked but not stored or sent. Explicit campaign parameters take precedence
over the referring hostname; Google Ads identifiers take precedence over UTMs.

Without campaign parameters, known Facebook, Instagram and Google referrers are
recognized. Other referrers are `other_referral`. A `fbclid` alone is
`meta_unknown`, because it does not reliably distinguish Facebook and Instagram.
No available evidence is `direct_or_unknown`; browsers and apps can hide referrers.
Without JavaScript the submitted source is `unknown`. Attribution is informational,
not verified identity, and may be modified by the visitor.

The original attribution persists until the tab session ends, including reloads,
internal navigation and contact errors. Use a fresh tab/session when testing a
different campaign. Storage-disabled browsers retain attribution in memory until
a full page load. No full URLs or referrer query strings are stored.
