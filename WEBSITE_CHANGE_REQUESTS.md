# 📝 Website Copy & Layout Change Requests

This document outlines all requested copy, text, and layout modifications translated directly from `website para.pdf`.

---

## 1. 📞 Contact Section & Form (`src/components/ContactSection.jsx`)

### Section Subtitle / Intro Text
* **Current Text**: *"Have a question about the campaign, an idea for Ward 9, or a neighborhood concern? Send Soham a direct message below or reach out via phone and email."*
* **Change To**: `"Have a question, want to support the campaign, or have a concern to raise? Reach out, I'd love to hear from you."`

### Contact Info Cards
1. **Phone Card**:
   * **Change Header**: From `Phone Hotline` $\rightarrow$ `"Direct Phone"`
   * **Change Number**: From `(519) 990-9999` $\rightarrow$ `"(226) 260-8869"`
   * **Change Subtext**: From `Call or leave a voicemail` $\rightarrow$ `"Call or Text"`
2. **Email Card**:
   * **Email Address**: `"sohamforcouncil@gmail.com"`
   * **Subtext**: `"Direct Campaign Inbox"`
3. **Ward 9 Focus Card**:
   * **Action**: **REMOVE** the `South & East Windsor` location card entirely.

### Contact Form Header & Fields
* **Form Subtitle**:
  * **Current Text**: *"All inquiries are reviewed personally."*
  * **Change To**: `"All inquiries are personally reviewed."`

* **Input Labels & Fields**:
  1. **Full Name Field**:
     * **Change Label**: From `YOUR FULL NAME *` $\rightarrow$ `"FULL NAME *"` (remove `"YOUR"`).
     * **Change Placeholder**: From `First and last name` $\rightarrow$ `"First and Last name"` (capitalize `"Last"`).
  2. **Email Field**:
     * **Change Label**: From `YOUR EMAIL ADDRESS *` $\rightarrow$ `"EMAIL ADDRESS *"` (remove `"YOUR"`).
  3. **Phone Number Field**:
     * **Action**: **CHANGE** the Phone Number input field default example phone number to Sohams phone number (do this for all fields that ask for phone number).
  4. **Question Category / Topic Field**:
     * **Action**: **REMOVE** the Question Category / Topic dropdown select field entirely from the contact form.

---

## 2. 🌐 Social Media Links (Site-wide)

* **Action**: **HIDE (for now)** all social media logos and links (Phone, Twitter/X, Instagram, Facebook) across the Navbar, Footer, and Contact (DO NOT REMOVE PHONE NUMBER HERE JUST OTHER SOCIAL LINKS) section. 

---

## 3. 🗺️ Ward 9 Map Section (`src/components/Ward9MapSection.jsx`)

* **Section Description Text**:
  * **Current Text**: *"Windsor Ward 9 covers vibrant neighborhoods across South & East Windsor. Use the search tool below or click on your house/area to find out if you are in Ward 9."*
  * **Change To**: `"Ward 9 covers a beautiful stretch of South & East Windsor — home to strong neighbourhoods, growing families, and steady new development. Use the search tool below or click on your house/area to find out if you're in Ward 9."`

---

## 4. 📢 Call to Action Banner (`src/App.jsx`)

* **Description Text**:
  * **Current Text**: *"Every conversation, lawn sign, volunteer hour, and contribution brings positive change to our neighborhood."*
  * **Change To**: `"Every conversation, lawn sign, and volunteer hour brings positive change to our neighborhood. Get involved today."`

---

## 5. 🎬 Media Section & Video Reels

* **Media Section (`src/components/MediaSection.jsx`)**:
  * **Action**: **DISABLE / HIDE** the Media page tab and section view for now.
* **Video Reels Carousel (`src/components/VideoReelsCarousel.jsx`)**:
  * **Action**: **DISABLE / HIDE** the video reels carousel on the main home page for now.

---

## 6. 🏠 Hero Section (`src/components/HeroSection.jsx`)

* **Slogan below "Windsor, Ontario"**:
  * **Action**: Will add slogan text under "Windsor, Ontario" (leave blank for now).

* **DONATE BUTTON**: add donate button similar to layout in the CTA, below the 2 buttons (lawn sign and volunteer)

---

## 7. 🎯 Platform Section (`src/components/PlatformSection.jsx`)

* **Section Description Text**:
  * **Current Text**: *"Ward 9 is one of Windsor’s most dynamic and family-focused communities. Here is Soham’s practical roadmap to strengthen our neighborhoods, protect public infrastructure, and represent our residents with integrity at City Hall."*
  * **Change To**: `"Ward 9 is one of Windsor's most dynamic, family-focused communities, and it deserves a councillor who treats it that way. Here's Soham's practical roadmap to protect our neighbourhoods and represent residents with integrity at City Hall."`
* **Card Pill Badges**:
  * **Change Label**: From `MISSION 01`, `MISSION 02`, etc. $\rightarrow$ `"MAIN FOCUS"` (no numbering).
