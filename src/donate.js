// Fundraise Up Donate Link (Elements → Donate Link, campaign "Stephen's Table
// Donation"). The installation script in index.html <head> intercepts clicks
// on it and opens the checkout modal in place; without the script it falls
// back to Fundraise Up's hosted donation page.
//
// Donate buttons use a plain <a href>, not a router <Link>, so the click
// reaches Fundraise Up rather than being swallowed by client-side routing.
// The /donation page still exists; it just isn't linked from these buttons.
export const DONATE_HREF = 'https://akpmuyzq.donorsupport.co/-/XQCJPGLM';
