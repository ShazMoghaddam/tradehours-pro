# TradeHours Pro — Publishing & Selling Guide

**Complete step-by-step instructions for GitHub, Gumroad, and LemonSqueezy**

---

## OVERVIEW

Your product is a **single HTML file** — this is actually a selling advantage. Your buyers get instant value with zero setup friction. Here's the full flow:

```
Your files (GitHub) → Buyers pay (Gumroad / LemonSqueezy) → They download the ZIP
```

---

## PART 1: PREPARE YOUR FILES

### Step 1 — Organise your folder

Your final folder should contain exactly these files:

```
TradeHours-Pro/
├── TradeHours-Pro.html     ← the main product
├── README.md               ← product description + instructions
├── LICENSE.md              ← usage terms (protects you legally)
└── CHANGELOG.md            ← version history
```

### Step 2 — Create your ZIP file

**On Mac:**
1. Select all 4 files in Finder
2. Right-click → "Compress 4 Items"
3. Rename the output to: `TradeHours-Pro-v2.0.0.zip`

**On Windows:**
1. Select all 4 files in File Explorer
2. Right-click → "Send to" → "Compressed (zipped) folder"
3. Rename to: `TradeHours-Pro-v2.0.0.zip`

**Verify your ZIP:** Open it and confirm all 4 files are at the root level (not inside a subfolder).

---

## PART 2: PUBLISH TO GITHUB

GitHub is your source of truth. Buyers trust products with a visible repo — it signals legitimacy and you can post updates there.

### Step 3 — Create a new GitHub repository

1. Go to **github.com** and sign in
2. Click the **+** button (top right) → **New repository**
3. Fill in:
   - **Repository name:** `tradehours-pro`
   - **Description:** `Live global market hours & trading sessions — single HTML file, works offline`
   - **Visibility:** ✅ **Public** (so people can see your README as a product page)
   - **Add a README file:** ❌ Uncheck this (you already have one)
   - **Add .gitignore:** None
   - **License:** None (you have a custom LICENSE.md)
4. Click **Create repository**

### Step 4 — Upload your files

**Option A — Upload via browser (easiest):**
1. On your new repository page, click **"Add file"** → **"Upload files"**
2. Drag all 4 files from your folder into the upload area
3. At the bottom, under "Commit changes":
   - Commit message: `Initial release v2.0.0`
4. Click **Commit changes**

**Option B — Git command line:**
```bash
git clone https://github.com/YOURUSERNAME/tradehours-pro.git
cd tradehours-pro
# Copy your 4 files into this folder
git add .
git commit -m "Initial release v2.0.0"
git push origin main
```

### Step 5 — Create a Release (for version tracking)

1. On your GitHub repo page, look right-hand sidebar → click **"Releases"**
2. Click **"Create a new release"**
3. Fill in:
   - **Tag version:** `v2.0.0`
   - **Release title:** `TradeHours Pro v2.0.0`
   - **Description:** Paste your CHANGELOG content here
   - **Attach your ZIP:** drag `TradeHours-Pro-v2.0.0.zip` into the file upload area
4. Click **Publish release**

Your GitHub repo URL will be: `https://github.com/YOURUSERNAME/tradehours-pro`

---

## PART 3: SELL ON GUMROAD

Gumroad is the fastest to set up and takes a flat 10% fee.

### Step 6 — Create a Gumroad account

1. Go to **gumroad.com** → Sign up
2. Add your payout method (bank account, PayPal, or Stripe)

### Step 7 — Create your product

1. Click **Products** in the left sidebar
2. Click **+ New product**
3. Choose: **Digital product**

### Step 8 — Fill in product details

**Name:** `TradeHours Pro — Live Global Market Hours`

**Description** (copy and customise this):
```
Know which markets are open right now — in a single browser file.

TradeHours Pro is a self-contained HTML app for traders and 
investors who need real-time market hours, session countdowns, 
and holiday alerts without subscriptions or signups.

✅ 25+ global markets (NYSE, LSE, TSE, HKEX, FSE, ASX, SGX + more)
✅ Live countdown to open/close, updated every second
✅ 2025 holiday calendar pre-loaded for all major exchanges
✅ Offline-capable — works without internet after first load
✅ Dark & light theme, drag-to-reorder, grid & list views
✅ Installs as a home screen app on iPhone, Android & desktop
✅ One-time payment — no subscription ever

HOW IT WORKS:
1. Download the ZIP
2. Open TradeHours-Pro.html in any browser
3. Done — no setup, no account, no tracking

Works on Mac, Windows, Linux, iPhone, iPad, and Android.
```

**Price:** Set your price (suggested: $9–$19 for a solo tool)

**File:** Upload your `TradeHours-Pro-v2.0.0.zip`

**Cover image:** Create a screenshot of the app (dark mode, showing 3–4 market cards with one open). Size: 1280×720px or larger.

### Step 9 — Configure settings

Under **"Customise"**:
- **Receipt subject:** `Your TradeHours Pro download is ready`
- **Receipt body:** 
```
Thank you for your purchase!

Download instructions:
1. Unzip the file you received
2. Open TradeHours-Pro.html in Chrome, Firefox, Safari, or Edge
3. Optional: install as an app via your browser's "Add to Home Screen" option

For future updates, check: https://github.com/YOURUSERNAME/tradehours-pro

Questions? Reply to this email.
```

### Step 10 — Publish

Click **"Publish"**. Your product will be live at:  
`https://YOURNAME.gumroad.com/l/tradehours-pro`

---

## PART 4: SELL ON LEMONSQUEEZY

LemonSqueezy charges 5% + 50¢ per transaction and is better for EU VAT compliance.

### Step 11 — Create a LemonSqueezy account

1. Go to **lemonsqueezy.com** → Sign up
2. Complete your store setup (store name, currency, payout method)

### Step 12 — Create your product

1. Dashboard → **Products** → **+ New product**
2. Product type: **Digital**

### Step 13 — Fill in details

**Name:** `TradeHours Pro`  
**Description:** Same as Gumroad above  
**Price:** Your chosen price  

Under **"Files"**:
- Upload `TradeHours-Pro-v2.0.0.zip`

### Step 14 — Configure checkout

1. Go to **Checkout** tab on your product
2. Set **"Checkout button text"** to: `Buy now — $XX`
3. Under **"Receipt"** → customise with the same receipt text as Gumroad

### Step 15 — Add your product URL to variant

1. Click **"Variants"** tab
2. Your default variant should show the file — make sure it's attached

### Step 16 — Publish

Toggle your product to **"Published"**. Your store link will be:  
`https://YOURSTORE.lemonsqueezy.com/buy/PRODUCT-ID`

---

## PART 5: PRICING STRATEGY

| Tier | Price | Notes |
|------|-------|-------|
| Launch price | $9 | First 50 buyers — creates urgency |
| Regular price | $14 | Sweet spot for a niche tool |
| Premium | $19 | If you add a demo video and detailed docs |

**Suggested:** Start at $9 for the first 2 weeks, then raise to $14. Mention this on your listing.

---

## PART 6: MARKETING QUICK-START

### Where to post (free)

1. **Reddit:**
   - r/Daytrading — "Built a market hours tracker that lives in one HTML file"
   - r/algotrading
   - r/financialindependence
   - r/webdev (show the technical side)

2. **X / Twitter:**
   - Post a GIF/video of the live countdowns
   - Tag #trading #daytrading #tools

3. **Product Hunt:**
   - Submit as a new product on a Tuesday/Wednesday morning (ET)
   - Get 5 friends to upvote it within the first hour — critical for ranking

4. **Hacker News:**
   - Post as "Show HN: TradeHours Pro – global market hours in a single HTML file"
   - Lead with the technical angle (single file, PWA, zero deps)

5. **IndieHackers:**
   - Post in the "Products" section

### Screenshot / demo tips

- Record a short GIF (5–8 seconds) showing the live countdown ticking
- Capture with at least one market OPEN (green glow visible)
- Use dark mode — it photographs better

---

## PART 7: UPDATING YOUR PRODUCT

When you release a new version (e.g. v2.1.0 with 2026 holidays):

1. Update `TradeHours-Pro.html` (edit the `STATIC_HOLIDAYS` array)
2. Update `CHANGELOG.md`
3. Create new ZIP: `TradeHours-Pro-v2.1.0.zip`
4. Push to GitHub + create new Release
5. On Gumroad: Products → Edit → update the attached file
6. On LemonSqueezy: Products → Edit → update the file in the Variants tab

**Email your existing buyers** — both platforms have a "send update email" feature. Keeping buyers informed builds goodwill and referrals.

---

## PART 8: LEGAL CHECKLIST

- [x] LICENSE.md included — defines what buyers can/cannot do
- [x] README.md — sets clear expectations
- [ ] Add your name/contact to LICENSE.md (replace "TradeHours Pro" with your business name)
- [ ] Add a disclaimer to your Gumroad/LemonSqueezy description: *"Market hours are for reference only and do not constitute financial advice."*
- [ ] Collect buyer emails — both platforms do this automatically — you own this list

---

## QUICK REFERENCE LINKS

| Platform | Sign Up | Fee |
|----------|---------|-----|
| Gumroad | gumroad.com | 10% flat |
| LemonSqueezy | lemonsqueezy.com | 5% + $0.50 |
| GitHub | github.com | Free for public repos |

---

*Good luck with your launch. The product is solid — now it's about getting it in front of the right people.*
