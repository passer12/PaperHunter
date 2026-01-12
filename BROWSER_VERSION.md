# Browser Version of PaperHunter

## Overview

This repository includes a browser-based version of PaperHunter (`paperhunter.js` and `index.html`) that allows users to search for papers directly from a web browser through GitHub Pages.

## Important Limitation: CORS (Cross-Origin Resource Sharing)

### The Problem

Due to browser security policies, web pages cannot directly access external APIs like DBLP without proper CORS headers. DBLP does not provide CORS headers, which means:

- **Direct browser access to DBLP is blocked** by default for security reasons
- Users will see a CORS error when trying to search

### Solutions

#### 1. Use the Command-Line Tool (Recommended)

The Python command-line version of PaperHunter has **no CORS restrictions** and works perfectly:

```bash
# Install the tool
git clone https://github.com/passer12/PaperHunter.git
cd PaperHunter
chmod +x install.sh
./install.sh

# Use it
paperhunter -con ndss -year 2024 -kw vulnerability
```

#### 2. Browser Extensions (For Testing Only)

For testing purposes, you can use browser extensions to disable CORS:

- **Chrome**: [CORS Unblock](https://chrome.google.com/webstore) or [Allow CORS](https://chrome.google.com/webstore)
- **Firefox**: [CORS Everywhere](https://addons.mozilla.org/en-US/firefox/)

⚠️ **Warning**: Only enable these extensions temporarily for testing, as they reduce browser security.

#### 3. CORS Proxy (Advanced Users)

Advanced users can modify `paperhunter.js` to use a CORS proxy:

```javascript
// In paperhunter.js, change this line:
const CORS_PROXY = ''; 

// To something like:
const CORS_PROXY = 'https://your-cors-proxy.com/';
```

**Note**: 
- Public CORS proxies are often unreliable or rate-limited
- Consider setting up your own CORS proxy for production use
- This is only suitable for testing or personal use

## Technical Details

### Why CORS Exists

CORS (Cross-Origin Resource Sharing) is a security feature that prevents malicious websites from accessing data from other domains without permission. While this is important for security, it limits what browser-based applications can do.

### Why Python Version Works

The Python version doesn't run in a browser, so it's not subject to CORS restrictions. It can directly access DBLP's API like any other HTTP client.

### Alternative Architectures

To make a fully functional web version, you would need:

1. **Backend Server**: Create a server that fetches data from DBLP and serves it to your frontend
2. **Serverless Functions**: Use services like AWS Lambda, Netlify Functions, or Vercel Functions
3. **CORS Proxy**: Set up your own CORS proxy server

These approaches require additional infrastructure beyond static GitHub Pages hosting.

## Recommendation

**For most users, we strongly recommend using the command-line version** rather than the browser version. It's:
- ✅ More reliable
- ✅ Faster
- ✅ No CORS issues
- ✅ Better for batch processing
- ✅ Can be scripted and automated

The browser interface is provided as a demonstration and for users who want to experiment, but the CLI tool is the preferred method for actual research work.
