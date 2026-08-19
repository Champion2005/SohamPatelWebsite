# 💳 Campaign Donation Integration Guide & Payment Alternatives

This guide provides a step-by-step walkthrough for setting up **Stripe Donation Payments** for the Soham Patel Campaign website, as well as **cheaper and zero-fee alternatives** tailored for Ontario municipal election campaigns.

---

## ⚖️ Ontario Municipal Campaign Rules to Keep in Mind
Under Ontario's *Municipal Elections Act, 1996*:
1. **Donor Eligibility**: Only individuals who reside in Ontario can contribute. Corporations, trade unions, and foreign donors cannot contribute.
2. **Contribution Limits**: Maximum $1,200 per individual donor to a single council candidate.
3. **Mandatory Donor Records**: You must record the donor's **Full Name** and **Full Residential Address** for campaign audit and disclosure filings.
4. **Dedicated Campaign Account**: All contribution funds must deposit directly into the official campaign bank account opened in the candidate's campaign name.

---

## 🚀 Option 1: Stripe Payment Links (Easiest & Fastest Setup)

Stripe Payment Links require **zero backend code** and can be embedded directly into website buttons (e.g., "$25", "$50", "$100", "Custom Amount").

### Step-by-Step Stripe Setup:

### 1. Create & Verify Your Stripe Account
1. Go to [stripe.com](https://stripe.com) and create an account.
2. Complete business verification using your **Official Campaign Bank Account** (opened under the campaign name).
3. Set your account country to **Canada (CAD)**.

### 2. Create a Donation Payment Link
1. In your Stripe Dashboard, go to **More** $\rightarrow$ **Payment Links** $\rightarrow$ **New**.
2. Under **Type**, choose **"Customers choose what to pay"** (or create preset amounts like $50, $100, $250, $500).
3. Enable **"Collect customers' addresses"** $\rightarrow$ select **"Billing addresses only"** or **"Billing and shipping addresses"** *(Required for Ontario municipal campaign compliance)*.
4. Enable **"Collect phone numbers"** (optional, recommended).
5. In the Confirmation step, set the redirect URL to:
   `https://champion2005.github.io/SohamPatelWebsite/?donation=success`
6. Click **Create Link** and copy the generated URL (`https://buy.stripe.com/...`).

### 3. Embed into Website
We can create a dedicated **"Donate" modal or button** in the website header and footer that opens this link in a popup or new tab.

---

## 💰 Fee Comparison & Cheaper Alternatives

| Platform | Transaction Fees | Payout Speed | Donor Data Collection | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **Interac e-Transfer** | **$0.00 (100% Free)** | Instant | Manual via Form | Direct zero-fee Canadian donations |
| **Zeffy** | **$0.00 (100% Free - 0% Fee)** | 2–3 Days | Automatic full address capture | Zero-fee credit card donations |
| **Stripe** | **2.9% + $0.30 CAD** | 2 Days (Rolling) | Automatic address capture | Fast setup, Apple Pay & Google Pay |
| **Square** | **2.9% + $0.30 CAD** (online) / **2.65%** (in-person tap) | Next Day | Automatic | In-person events + online payment links |
| **PayPal** | **2.9% + $0.30 CAD** | 1–2 Days | Basic | Familiar name, but clunkier checkout |

---

## 🏆 Top Recommended Alternatives

### 1. 🥇 Interac e-Transfer (100% Free, Most Popular in Ontario Campaigns)
* **Cost**: **$0.00 transaction fees**. 100% of every dollar goes directly into the campaign account.
* **How It Works on Website**:
  1. We add a clean **"Donate via e-Transfer"** card.
  2. The website provides the official campaign email: `donate@sohampatel.ca` (or campaign bank auto-deposit email).
  3. Includes a mandatory form or instructions for donors to include their **Full Legal Name and Address** in the e-Transfer message memo for municipal election compliance.

---

### 2. 🥈 Zeffy (100% Free Credit Card Processing - 0% Platform & Processing Fees)
* **Cost**: **0% processing fee** (Funded voluntarily by optional donor tips).
* **Benefits**:
  * Gives you a professional credit card, Apple Pay, and Google Pay checkout page.
  * Captures full municipal compliance data (legal name, address, Ontario residency checkbox).
  * The campaign receives **100% of the donated funds** with zero deductions.
* **Setup**:
  1. Register at [zeffy.com](https://www.zeffy.com).
  2. Create a "Municipal Campaign Donation" form.
  3. Copy the embed link directly into the website.

---

### 3. 🥉 Square (Best for Combined Online + In-Person Campaign Events)
* **Cost**: **2.9% + $0.30 CAD** online / **2.65% flat** on physical tap card reader.
* **Benefits**:
  * You can use the physical Square Tap Reader at door-to-door events, coffee meet-and-greets, and campaign rallies.
  * Square Online Checkout links can be placed on the website just like Stripe.

---

## 🛠️ Next Steps & Implementation Options

When you are ready, we can implement any of the following on the website:
1. **Dedicated "Donate" Navigation Button** in the Navbar & Mobile Drawer (styled in campaign Red `#FF0000`).
2. **Interactive Donation Modal** offering choices:
   - Direct Credit Card / Apple Pay (Stripe or Zeffy)
   - Interac e-Transfer instructions with copyable email address
   - Ontario residency declaration checkbox for compliance.
