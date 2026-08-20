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

## 📱 Option 2: Interac e-Transfer (100% Free - 0% Fees)

Interac e-Transfer is the most popular, zero-fee method used by Ontario municipal campaigns.

### How It Works:
1. Donors send an e-Transfer from their online banking to:
   **`donate@sohampatel.ca`** (Auto-deposit enabled on the campaign bank account).
2. Donors are instructed on the website to include their **Full Legal Name** and **Residential Address** in the transfer message/memo box to satisfy s. 88.22(1)(g) of the *Municipal Elections Act, 1996*.
3. **100% of every dollar** is deposited directly into the campaign account with zero fee deductions.

---

## ⚙️ Environment Variables Summary

Add these variables to your `.env` file for local development and to **GitHub Settings $\rightarrow$ Secrets and variables $\rightarrow$ Actions** for live deployment:

| Variable | Default / Example Value | Description |
| :--- | :--- | :--- |
| `VITE_STRIPE_DONATION_URL` | `https://buy.stripe.com/...` | Your live Stripe donation link |
| `VITE_INTERAC_DONATION_EMAIL` | `donate@sohampatel.ca` | Campaign e-Transfer email |
