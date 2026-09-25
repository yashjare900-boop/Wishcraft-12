# WishCraft — Google Search Console & SEO Indexing Guide

This guide walks you step-by-step through configuring Google Search Console (GSC) and submitting WishCraft to search engines so they index the website and attribute **Yash Jare** as the creator and developer.

Official Domain: **https://wishcraft-12.netlify.app/**

---

## Step 1: Add WishCraft to Google Search Console

1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Sign in with your primary Google account (`yashjare900@gmail.com` or `yashjare12@gmail.com`).
3. Click **Add Property** in the left-hand dropdown.
4. Choose **URL prefix**:
   ```
   https://wishcraft-12.netlify.app/
   ```
5. Click **Continue**.

---

## Step 2: Verify Site Ownership

WishCraft's `index.html` already contains the HTML verification meta tag:
```html
<meta name="google-site-verification" content="EM4EqOjKtE7AVH1bbz7nG5XYZjmRL-VutiH5mKVqWmI" />
```

1. On the verification popup in Google Search Console, choose the **HTML tag** method.
2. If your Google Search Console verification code matches `EM4EqOjKtE7AVH1bbz7nG5XYZjmRL-VutiH5mKVqWmI`, simply click **Verify**.
3. If Google provides a *different* verification code:
   - Copy the string inside `content="..."`.
   - Update the `content` attribute in `index.html` and `about.html`.
   - Deploy/push to GitHub/Netlify.
   - Click **Verify** in GSC.

---

## Step 3: Submit Your Sitemap

1. In the left sidebar of Google Search Console, select **Sitemaps** (under *Indexing*).
2. Under **Add a new sitemap**, enter:
   ```
   sitemap.xml
   ```
3. Click **Submit**.
4. The status will initially say *Submitted* or *Success*. Googlebot will fetch:
   - `https://wishcraft-12.netlify.app/`
   - `https://wishcraft-12.netlify.app/about`

---

## Step 4: Request Priority Indexing for Key Pages

### 1. Homepage (`https://wishcraft-12.netlify.app/`)
1. In the top search bar ("Inspect any URL in 'https://wishcraft-12.netlify.app/'"), paste:
   ```
   https://wishcraft-12.netlify.app/
   ```
2. Press **Enter**.
3. Wait for Google to retrieve live data from the page.
4. Click **Request Indexing**.

### 2. About & Creator Page (`https://wishcraft-12.netlify.app/about`)
1. In the top search bar, paste:
   ```
   https://wishcraft-12.netlify.app/about
   ```
2. Press **Enter**.
3. Click **Request Indexing**.

---

## Step 5: Verify Structured Data (Rich Results Test)

1. Open Google's official [Rich Results Test](https://search.google.com/test/rich-results).
2. Enter `https://wishcraft-12.netlify.app/` and click **Test URL**.
3. Confirm that the structured data detects:
   - **WebSite**
   - **WebApplication**
   - **Person** (`Yash Jare`)
4. Test `https://wishcraft-12.netlify.app/about` and confirm the `AboutPage` and `Person` schema.

---

## Step 6: Monitor Indexing & Creator Queries

1. In GSC, check the **Pages** report after 3 to 7 days to ensure both URLs are status **Indexed**.
2. In the **Performance** report, monitor queries such as:
   - `wishcraft`
   - `wishcraft yash jare`
   - `who created wishcraft`
   - `wishcraft creator`
   - `wishcraft-12.netlify.app`
3. Note: Search engines take several days to crawl, evaluate, and update Knowledge Graph entries. Do not expect instantaneous entity updates on day one; consistency across the domain, sitemap, structured data, and GitHub builds authority naturally.
