# 💳 Campaign Donation Integration Guide (Stripe & Interac e-Transfer)

This guide provides a step-by-step walkthrough for accepting **Credit Card / Apple Pay** donations via **Stripe** and **100% Free** donations via **Interac e-Transfer** for the Soham Patel Campaign in compliance with Ontario's *Municipal Elections Act, 1996*.

---

## ⚖️ Ontario Municipal Campaign Contribution Rules (Statutory Requirements)
Under the *Municipal Elections Act, 1996* (S.O. 1996, c. 32, Sched., ss. 88.8, 88.9, 88.16, 88.22):
1. **Contribution Limits (s. 88.9, s. 88.22(1)(r))**:
   * Maximum **$1,200 CAD** from an individual contributor to any one candidate.
   * Maximum **$5,000 CAD** total to two or more candidates for office on the same municipal council.
2. **Eligibility (s. 88.8(3))**: Only individuals who reside in Ontario can contribute.
3. **Prohibited Contributors (s. 88.8(4))**: Corporations, trade unions, federal/provincial parties, and foreign entities cannot contribute.
4. **Traceability & Own Funds (s. 88.8(8), s. 88.16)**: All contributions over $25 must be traceable to the contributor's own funds. Anonymous donations and cash over $25 are prohibited.
5. **Mandatory Donor Records (s. 88.22(1)(g))**: The campaign must record the **Full Name** and **Residential Address** of every contributor for campaign audit and financial filing.
6. **Dedicated Campaign Bank Account (s. 88.22(1)(a))**: All contribution funds must deposit directly into the official campaign bank account opened in the candidate's name.

---

## 💳 Option 1: Stripe Payment Links (Credit Card, Apple Pay, Google Pay)

Stripe directly supports political campaigns and candidates in Canada.

### Step-by-Step Setup:

1. **Create & Verify Your Stripe Account**:
   * Sign up at [stripe.com](https://stripe.com).
   * Link your **Official Campaign Bank Account** (opened under Soham Patel's campaign).
   * Set your account currency to **Canadian Dollars (CAD)**.

2. **Create a Donation Payment Link**:
   * In your Stripe Dashboard, go to **More** $\rightarrow$ **Payment Links** $\rightarrow$ **+ New**.
   * Under **Type**, choose **"Customers choose what to pay"** (or create preset amounts).
   * Under **Advanced Options / Custom Fields**:
     * Enable **"Collect customers' addresses"** $\rightarrow$ select **"Billing addresses only"** *(Essential for Ontario Municipal Elections compliance)*.
     * Enable **"Collect phone numbers"** (optional).
   * Under **Confirmation Page**:
     * Set the redirect URL to: `https://champion2005.github.io/SohamPatelWebsite/`
   * Click **Create Link** and copy your generated URL (e.g. `https://buy.stripe.com/abc123xyz`).

3. **Add Your Link to the Website**:
   * In your `.env` file or GitHub Repository Secrets:
     ```env
     VITE_STRIPE_DONATION_URL=https://buy.stripe.com/your-payment-link
     ```

* **Stripe Processing Fee**: Standard Canadian card rate is `2.9% + $0.30 CAD` per donation.

---

## 🛡️ Enforcing Ontario-Only Residency (Restricting Non-Ontario Donors)

Under **s. 88.8(3)** of the *Municipal Elections Act, 1996*, only individuals who reside in Ontario can contribute to a municipal campaign. Here are 3 ways to stop and block non-Ontario residents from donating through Stripe:

### 1. Stripe Radar Custom Block Rule (No-Code Method in Stripe Dashboard)
If using Stripe Payment Links or Stripe Checkout, you can set up a custom **Stripe Radar Rule** to automatically decline any transaction where the card's billing address is outside Ontario:

1. Log into your **Stripe Dashboard** $\rightarrow$ Search for **Radar** $\rightarrow$ **Rules**.
2. Under **Block rules**, click **+ Add rule**.
3. Add the following rule expression:
   ```text
   Block if :billing_address_country: == 'CA' and :billing_address_state: not in ('ON', 'Ontario', 'ontario', 'On')
   ```
4. Also add a rule to block non-Canadian countries:
   ```text
   Block if :billing_address_country: != 'CA'
   ```
5. Click **Save and test**. Stripe will now automatically block card payments from any non-Ontario billing addresses!

---

### 2. Website Pre-Screening Form (Front-End Gatekeeping)
Before redirecting to Stripe or displaying the e-Transfer details, the website forces the donor to check the mandatory statutory confirmation checkbox:
> *"I confirm that I am an individual normally resident in Ontario, I am contributing my own funds, and my total contributions to this campaign will not exceed $1,200."*

If the user does not check this box, the `Donate` button remains disabled, preventing non-residents from proceeding.

---

### 3. Automatic Webhook Auto-Refund (Server-Side / Back-End Audit)
If using a custom Stripe server integration (Node.js/Python), you can inspect every payment when the `charge.succeeded` webhook fires:

```javascript
// Webhook handler for charge.succeeded
const address = charge.billing_details.address;
const province = address.state ? address.state.toUpperCase().trim() : '';
const country = address.country ? address.country.toUpperCase().trim() : '';

// If donor resides outside Ontario or Canada, issue an immediate full refund
if (country !== 'CA' || (province !== 'ON' && province !== 'ONTARIO')) {
  await stripe.refunds.create({
    charge: charge.id,
    reason: 'requested_by_customer',
    metadata: {
      compliance_reason: 'Non-Ontario resident prohibited under s. 88.8(3) Municipal Elections Act'
    }
  });
  console.log(`Auto-refunded prohibited donation from ${address.city}, ${province}, ${country}`);
}
```

---

## 📱 Option 2: Interac e-Transfer (100% Free - 0% Fees)

Interac e-Transfer is the most popular, zero-fee method used by Ontario municipal campaigns.

### How It Works:
1. Donors send an e-Transfer from their online banking to:
   **`sohamforcouncil@gmail.com`** (Auto-deposit enabled on the campaign bank account).
2. Donors are instructed on the website to include their **Full Legal Name** and **Residential Address** in the transfer message/memo box to satisfy s. 88.22(1)(g) of the *Municipal Elections Act, 1996*.
3. **100% of every dollar** is deposited directly into the campaign account with zero fee deductions.

---

## ⚙️ Environment Variables Summary

Add these variables to your `.env` file for local development and to **GitHub Settings $\rightarrow$ Secrets and variables $\rightarrow$ Actions** for live deployment:

| Variable | Default / Example Value | Description |
| :--- | :--- | :--- |
| `VITE_STRIPE_DONATION_URL` | `https://buy.stripe.com/...` | Your live Stripe donation link |
| `VITE_INTERAC_DONATION_EMAIL` | `sohamforcouncil@gmail.com` | Campaign e-Transfer email |
