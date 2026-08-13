# 📊 Google Sheets Form Integration & Setup Guide

This guide explains how to connect the **Request a Lawn Sign** and **Volunteer** forms on the Soham Patel Campaign website directly into a **Google Spreadsheet** using a free, secure Google Apps Script webhook.

---

## ⏱️ Quick 2-Minute Setup

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.new) in your browser.
2. Name your spreadsheet (e.g. `Soham Patel Campaign 2026 - Responses`).

---

### Step 2: Add the Google Apps Script
1. In your Google Sheet menu bar, click **Extensions** $\rightarrow$ **Apps Script**.
2. Delete any default code in the editor, and paste the complete script below:

```javascript
/**
 * Soham Patel Campaign 2026 - Automatic Google Sheets Webhook
 * Handles Lawn Sign requests and Volunteer sign-ups into separate sheet tabs.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var formType = data.formType || "General";

    if (formType === "Lawn Sign") {
      var sheet = ss.getSheetByName("Lawn Signs");
      if (!sheet) {
        sheet = ss.insertSheet("Lawn Signs");
        sheet.appendRow(["Timestamp", "First Name", "Last Name", "Email", "Address", "Phone Number", "Email Updates Subscribed"]);
        sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#D1FAE5");
      }
      sheet.appendRow([
        data.submittedAt || new Date().toLocaleString(),
        data.firstName || "",
        data.lastName || "",
        data.email || "", // Blank if optional email was left empty
        data.address || "",
        data.phone || "",
        data.emailUpdates || "No"
      ]);
    } else if (formType === "Volunteer") {
      var sheet = ss.getSheetByName("Volunteers");
      if (!sheet) {
        sheet = ss.insertSheet("Volunteers");
        sheet.appendRow(["Timestamp", "First Name", "Last Name", "Email", "Phone Number", "Best Time to Call", "Comments / Ideas"]);
        sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#E2E8F0");
      }
      sheet.appendRow([
        data.submittedAt || new Date().toLocaleString(),
        data.firstName || "",
        data.lastName || "",
        data.email || "", // Blank if optional email was left empty
        data.phone || "",
        data.bestTimeToCall || "",
        data.comments || ""
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **Save** icon (disk icon) or press `Ctrl + S` / `Cmd + S`.

---

### Step 3: Deploy as a Web App
1. In the top right of the Apps Script editor, click **Deploy** $\rightarrow$ **New deployment**.
2. Click the gear icon (**Select type**) and choose **Web app**.
3. Configure the deployment settings:
   * **Description**: `Campaign Forms Webhook`
   * **Execute as**: `Me (your email)`
   * **Who has access**: `Anyone` *(Important: Select 'Anyone' so the website forms can submit without requiring a Google login)*
4. Click **Deploy**.
5. Copy the **Web App URL** provided (e.g. `https://script.google.com/macros/s/AKfycbx.../exec`).

---

### Step 4: Add the URL to your `.env` File
In your website project root directory, open the `.env` file and paste your URL:

```env
VITE_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbx.../exec
```

---

## 🛡️ Built-In Layer 1 Anti-Spam Protection

Both forms are equipped with a **two-part Layer 1 Spam Filter**:

1. **Invisible Honeypot Field (`_hp_website`)**:
   * A field that is invisible to human users via styling and screen reader tags.
   * Automated spambots automatically fill in every input field they find. If this field contains any data, the form silently stops without sending junk to your Google Sheet.

2. **Time-Trap Bot Detection ($< 1.8$s)**:
   * Automated scrapers submit forms instantaneously within milliseconds.
   * If a submission occurs in under 1.8 seconds from the modal opening, it is automatically discarded as a bot script.

---

## 🧪 Testing Your Integration
1. Run `npm run dev` or open your live site.
2. Click **Request a Lawn Sign** or **Volunteer**.
3. Fill out the form (with or without an email address) and submit.
4. Check your Google Sheet: the row will appear in the `Lawn Signs` or `Volunteers` tab with a blank cell in the Email column if omitted!
