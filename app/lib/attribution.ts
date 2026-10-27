export const attributionFields = [
  "traffic_source", "utm_source", "utm_medium", "utm_campaign", "referrer_host",
] as const;

export type Attribution = Record<(typeof attributionFields)[number], string>;

export function detectAttribution(href: string, referrer: string): Attribution {
  const url = new URL(href);
  const param = (key: string) => (url.searchParams.get(key) ?? "").trim().slice(0, 200);
  const source = param("utm_source").toLowerCase();
  const medium = param("utm_medium").toLowerCase();
  let host = "";
  try { host = new URL(referrer).hostname.toLowerCase(); } catch { /* No referrer. */ }
  if (host === url.hostname.toLowerCase()) host = "";
  const matches = (domain: string) => host === domain || host.endsWith(`.${domain}`);
  let trafficSource = "direct_or_unknown";

  if (["gclid", "gbraid", "wbraid"].some((key) => param(key)) ||
      (["google", "googleads", "google_ads"].includes(source) &&
       ["cpc", "ppc", "paid", "paid_search", "paidsearch", "display"].includes(medium))) {
    trafficSource = "google_ads";
  } else if (["facebook", "fb"].includes(source)) {
    trafficSource = "facebook";
  } else if (["instagram", "ig"].includes(source)) {
    trafficSource = "instagram";
  } else if (source === "google") {
    trafficSource = "google";
  } else if (source) {
    trafficSource = "other_campaign";
  } else if (matches("instagram.com")) {
    trafficSource = "instagram";
  } else if (matches("facebook.com") || matches("fb.com")) {
    trafficSource = "facebook";
  } else if (/^(www\.)?google\.(com|[a-z]{2}|com\.[a-z]{2}|co\.[a-z]{2})$/.test(host)) {
    trafficSource = "google";
  } else if (param("fbclid")) {
    // This identifier alone cannot distinguish Facebook from Instagram.
    trafficSource = "meta_unknown";
  } else if (host) {
    trafficSource = "other_referral";
  }

  return {
    traffic_source: trafficSource,
    utm_source: param("utm_source"),
    utm_medium: param("utm_medium"),
    utm_campaign: param("utm_campaign"),
    referrer_host: host.slice(0, 253),
  };
}

let currentVisit: Attribution | undefined;
const storageKey = "desite-attribution-v1";

// First entry in this tab wins, including across reloads and form errors.
export function getVisitAttribution(): Attribution {
  if (currentVisit) return currentVisit;
  try {
    const stored: unknown = JSON.parse(sessionStorage.getItem(storageKey) ?? "null");
    if (stored && typeof stored === "object" && attributionFields.every(
      (key) => typeof (stored as Attribution)[key] === "string" &&
        (stored as Attribution)[key].length <= 253,
    )) currentVisit = stored as Attribution;
  } catch { /* Storage may be disabled. */ }
  currentVisit ??= detectAttribution(window.location.href, document.referrer);
  try { sessionStorage.setItem(storageKey, JSON.stringify(currentVisit)); } catch { /* Keep in memory. */ }
  return currentVisit;
}
