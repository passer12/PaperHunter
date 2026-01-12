# Browser Version of PaperHunter

## Overview

This repository includes a browser-based version of PaperHunter (`paperhunter.js` and `index.html`) that allows users to search for papers directly from a web browser through GitHub Pages.

## ✅ CORS Issue Resolved

### The Solution

The browser version now uses a **free CORS proxy service** (allorigins.win) to bypass browser cross-origin restrictions. This means:

- ✅ **Direct browser access now works!** No need for extensions or manual configuration
- ✅ Users can search for papers directly from the web interface
- ⚠️ Public CORS proxy may be subject to rate limits or occasional downtime

### How It Works

The code in `paperhunter.js` automatically routes requests through the CORS proxy:

```javascript
// CORS proxy is configured by default
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
```

This proxy service acts as an intermediary that:
1. Receives requests from your browser
2. Fetches data from DBLP on your behalf
3. Returns the data with proper CORS headers

### Background: The CORS Problem

Due to browser security policies, web pages cannot directly access external APIs like DBLP without proper CORS headers. DBLP does not provide CORS headers, which previously meant:

- ❌ Direct browser access to DBLP was blocked by default for security reasons
- ❌ Users would see a CORS error when trying to search

This has now been resolved with the free CORS proxy service.

## Alternative Options

### 1. Use the Command-Line Tool (Recommended for Heavy Use)

The Python command-line version of PaperHunter has **no dependency on third-party proxies** and works perfectly:

```bash
# Install the tool
git clone https://github.com/passer12/PaperHunter.git
cd PaperHunter
chmod +x install.sh
./install.sh

# Use it
paperhunter -con ndss -year 2024 -kw vulnerability
```

### 2. Disable the CORS Proxy (For Self-Hosting)

If you want to disable the CORS proxy and use a browser extension or your own proxy instead, edit `paperhunter.js`:

```javascript
// Set to empty string to disable
const CORS_PROXY = '';
```

Then use browser extensions like:
- **Chrome**: [CORS Unblock](https://chrome.google.com/webstore) or [Allow CORS](https://chrome.google.com/webstore)
- **Firefox**: [CORS Everywhere](https://addons.mozilla.org/en-US/firefox/)

⚠️ **Warning**: Only enable these extensions temporarily for testing, as they reduce browser security.

### 3. Use Your Own CORS Proxy

For better reliability or privacy, you can set up your own CORS proxy:

```javascript
// In paperhunter.js
const CORS_PROXY = 'https://your-own-proxy.com/';
```

Popular self-hosted options include:
- [CORS Anywhere](https://github.com/Rob--W/cors-anywhere)
- Custom Cloudflare Worker
- AWS Lambda with API Gateway

## Technical Details

### Why CORS Exists

CORS (Cross-Origin Resource Sharing) is a security feature that prevents malicious websites from accessing data from other domains without permission. While this is important for security, it limits what browser-based applications can do.

### How the Proxy Solves It

The CORS proxy server:
1. Receives your request from the browser
2. Makes the actual request to DBLP (server-to-server, no CORS restrictions)
3. Adds appropriate CORS headers to the response
4. Returns the data to your browser

### Why Python Version Still Better for Production

While the browser version now works, the Python CLI is still better for production use:
- ✅ No dependency on third-party proxy services
- ✅ Faster (no extra hop through proxy)
- ✅ More reliable (no proxy rate limits)
- ✅ Better for batch processing
- ✅ Can be scripted and automated
- ✅ Better privacy (no data goes through third-party)

## Recommendation

**For most users:**
- 🌐 **Casual searches**: Use the browser version directly - it now works out of the box!
- 🚀 **Research work**: Use the command-line version for better reliability and performance

The browser interface is fully functional and great for quick searches, but the CLI tool is still the preferred method for extensive research work.
