# 📊 Google Sheets Form Integration & Automatic Email Forwarding Guide

This guide explains how all website forms (**Request a Lawn Sign**, **Volunteer**, and **Ask Me Questions / Contact**) connect directly to a **Google Spreadsheet** and can **automatically send an email to Soham's inbox** whenever a resident asks a question.

---

## 🚀 How the System Works (Under the Hood)

1. **Website Submission (Frontend)**:
   When a resident submits the form on the website, React packages the responses into a structured JSON payload and issues an asynchronous `fetch()` POST request to your Google Apps Script Web App URL.

2. **Google Spreadsheet Logging (Backend)**:
   Google Apps Script receives the payload and automatically organizes it into the correct tab:
   * `Questions & Contact` tab (for resident inquiries)
   * `Lawn Signs` tab (for lawn sign requests)
   * `Volunteers` tab (for campaign volunteers)

3. **Automatic Email Notification to Soham**:
   Google Apps Script triggers `MailApp.sendEmail()`, which immediately sends an email directly to your inbox with the resident's name, email, topic, and message, and sets `replyTo: residentEmail` so you can simply click **"Reply"** in your email client to answer them!

---

## ⏱️ Google Apps Script Code (Copy & Paste)

1. Open your [Google Sheet](https://sheets.new).
2. In the top menu, click **Extensions** $\rightarrow$ **Apps Script**.
3. Replace all code in the script editor with this complete script:

```javascript
/**
 * Soham Patel Campaign 2026 - Master Form Webhook & Email Notification
 */

// 1. Set your campaign notification email address here:
var CAMPAIGN_NOTIFICATION_EMAIL = "sohamforcouncil@gmail.com";

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: "online", 
    message: "Soham Patel Campaign Webhook API is active." 
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var formType = data.formType || "General";
    var optIn = data.periodicUpdates || data.emailUpdates || "No";

    // -------------------------------------------------------------
    // 1. ASK ME QUESTIONS / CONTACT FORM
    // -------------------------------------------------------------
    if (formType === "Question / Contact") {
      var sheet = ss.getSheetByName("Questions & Contact");
      if (!sheet) {
        sheet = ss.insertSheet("Questions & Contact");
        sheet.appendRow(["Timestamp", "Full Name", "Email Address", "Phone Number", "Question / Message", "Periodic Updates Subscribed"]);
        sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#EEF4FC");
      }
      sheet.appendRow([
        data.submittedAt || new Date().toLocaleString(),
        data.name || "",
        data.email || "",
        data.phone || "",
        data.message || "",
        optIn
      ]);

      // AUTOMATIC EMAIL NOTIFICATION TO SOHAM:
      if (CAMPAIGN_NOTIFICATION_EMAIL) {
        var emailSubject = "🗳️ New Ward 9 Question from " + data.name;
        var emailBody = "Hello Soham,\n\n" +
          "You received a new message from your campaign website:\n\n" +
          "--------------------------------------------------\n" +
          "• Name: " + data.name + "\n" +
          "• Email: " + data.email + "\n" +
          "• Phone: " + (data.phone || "Not provided") + "\n" +
          "• Submitted At: " + data.submittedAt + "\n" +
          "• Periodic Updates Subscribed: " + optIn + "\n\n" +
          "Message:\n" + data.message + "\n" +
          "--------------------------------------------------\n\n" +
          "👉 You can reply directly to this email to respond to " + data.name + " (" + data.email + ").";

        MailApp.sendEmail({
          to: CAMPAIGN_NOTIFICATION_EMAIL,
          subject: emailSubject,
          body: emailBody,
          replyTo: data.email // Allows you to click 'Reply' directly in Gmail!
        });
      }
    }

    // -------------------------------------------------------------
    // 2. LAWN SIGN REQUESTS
    // -------------------------------------------------------------
    else if (formType === "Lawn Sign") {
      var sheet = ss.getSheetByName("Lawn Signs");
      if (!sheet) {
        sheet = ss.insertSheet("Lawn Signs");
        sheet.appendRow(["Timestamp", "First Name", "Last Name", "Email", "Address", "Phone Number", "Periodic Updates Subscribed"]);
        sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#FFF0F0");
      }
      sheet.appendRow([
        data.submittedAt || new Date().toLocaleString(),
        data.firstName || "",
        data.lastName || "",
        data.email || "",
        data.address || "",
        data.phone || "",
        optIn
      ]);
    }

    // -------------------------------------------------------------
    // 3. VOLUNTEER SIGN-UPS
    // -------------------------------------------------------------
    else if (formType === "Volunteer") {
      var sheet = ss.getSheetByName("Volunteers");
      if (!sheet) {
        sheet = ss.insertSheet("Volunteers");
        sheet.appendRow(["Timestamp", "First Name", "Last Name", "Email", "Phone Number", "Best Time to Call", "Comments / Ideas", "Periodic Updates Subscribed"]);
        sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#EEF4FC");
      }
      sheet.appendRow([
        data.submittedAt || new Date().toLocaleString(),
        data.firstName || "",
        data.lastName || "",
        data.email || "",
        data.phone || "",
        data.bestTimeToCall || "",
        data.comments || "",
        optIn
      ]);
    }

    // -------------------------------------------------------------
    // 4. DONATE OPT-INS
    // -------------------------------------------------------------
    else if (formType === "Donate Opt-In") {
      var sheet = ss.getSheetByName("Donate Opt-Ins");
      if (!sheet) {
        sheet = ss.insertSheet("Donate Opt-Ins");
        sheet.appendRow(["Timestamp", "Periodic Updates Subscribed"]);
        sheet.getRange(1, 1, 1, 2).setFontWeight("bold").setBackground("#EEF4FC");
      }
      sheet.appendRow([
        data.submittedAt || new Date().toLocaleString(),
        optIn
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

---

## ⚡ Deployment Steps

1. Click **Save** (`Ctrl + S` / `Cmd + S`).
2. In the top right, click **Deploy** $\rightarrow$ **Manage deployments** (or **New deployment**).
3. Click the **Pencil (Edit)** icon.
4. Under **Version**, select **`New version`**.
5. Set **Execute as**: `Me (your email)`.
6. Set **Who has access**: `Anyone`.
7. Click **Deploy** and copy your Web App URL.
8. Add this URL to your `.env` as `VITE_GOOGLE_SHEETS_WEBHOOK_URL` and in your GitHub Repository Secrets for GitHub Actions deployment!
