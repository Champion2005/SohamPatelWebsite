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
2. Delete any default code in the editor, and paste the complete script below (includes both `doGet` and `doPost` handlers):

```javascript
/**
 * Soham Patel Campaign 2026 - Automatic Google Sheets Webhook
 * Handles Lawn Sign requests and Volunteer sign-ups into separate sheet tabs.
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "online", message: "Soham Patel Campaign Webhook API is active." }))
    .setMimeType(ContentService.MimeType.JSON);
}

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

### Step 3: Deploy / Re-Deploy as a Web App
1. In the top right of the Apps Script editor, click **Deploy** $\rightarrow$ **Manage deployments** (or **New deployment** if first time).
2. Click the **Pencil icon (Edit)**.
3. Under **Version**, select **`New version`** *(Crucial step so Google applies your changes!)*.
4. Set **Execute as**: `Me (your email)`.
5. Set **Who has access**: `Anyone` *(Crucial: allows website submissions without requiring Google login)*.
6. Click **Deploy**.
7. Copy the **Web App URL** provided (starts with `https://script.google.com/macros/s/.../exec`).

---

### Step 4: Add the URL to your `.env` File & GitHub Secrets

* **For Local Testing (`npm run dev`)**:
  In your project root `.env` file, paste your Web App URL:
  ```env
  VITE_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbx.../exec
  ```

* **For Live GitHub Pages Site**:
  1. Go to your GitHub repository: `https://github.com/Champion2005/SohamPatelWebsite`
  2. Go to **Settings** $\rightarrow$ **Secrets and variables** $\rightarrow$ **Actions**.
  3. Create or update `VITE_GOOGLE_SHEETS_WEBHOOK_URL` with your new Google Web App URL.

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
1. Open your Web App URL in your browser tab directly. It will return:
   `{"status":"online","message":"Soham Patel Campaign Webhook API is active."}`
2. Open your website form, fill it out, and click **Submit**.
3. Check your Google Sheet: the new row will instantly appear in the `Lawn Signs` or `Volunteers` tab!
