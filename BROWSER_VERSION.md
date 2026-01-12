# Browser Version of PaperHunter

## Overview

This repository includes a browser-based version of PaperHunter (`paperhunter.js` and `index.html`) that allows users to search for papers directly from a web browser through GitHub Pages.

## ✅ Now Using DBLP Official API

### The Solution

The browser version now uses **DBLP's official Search API** which supports CORS natively. This means:

- ✅ **Direct browser access now works!** No need for extensions or third-party proxies
- ✅ Users can search for papers directly from the web interface
- ✅ **No privacy concerns** - Direct connection to DBLP with no intermediaries
- ✅ **No payment required** - Uses free, official DBLP API
- ✅ **More stable** - No dependency on third-party proxy services

### How It Works

The code in `paperhunter.js` uses DBLP's official Search API:

```javascript
// Using DBLP's official Search API
const DBLP_SEARCH_API = 'https://dblp.org/search/publ/api';
```

The Search API:
1. Accepts search queries directly from the browser
2. Returns paper data in JSON format with proper CORS headers
3. Provides structured data that's easier to parse than HTML
4. Is officially supported by DBLP

### Background: Previous CORS Problem

In previous versions, the browser version attempted to scrape HTML pages from DBLP, which:

- ❌ Required third-party CORS proxy services (like corsproxy.io)
- ❌ Raised privacy concerns about data being routed through third parties
- ❌ Required payment for reliable service
- ❌ Was less stable due to proxy dependencies

This has now been resolved by using DBLP's official API instead.

## Alternative Options

### 1. Use the Command-Line Tool (Recommended for Heavy Use)

The Python command-line version of PaperHunter also works perfectly for heavy use:

```bash
# Install the tool
git clone https://github.com/passer12/PaperHunter.git
cd PaperHunter
chmod +x install.sh
./install.sh

# Use it
paperhunter -con ndss -year 2024 -kw vulnerability
```

## Technical Details

### DBLP Search API

The browser version uses DBLP's official Search API endpoint:
- **Endpoint**: `https://dblp.org/search/publ/api`
- **Format**: Returns JSON data with proper CORS headers
- **Query**: Uses `streamid` parameter to target specific conferences and years
- **Example**: `?q=streamid:conf/icml/icml2024:&format=json&h=1000`

### Why This Solution Works

1. **Native CORS Support**: DBLP Search API includes proper CORS headers
2. **Official API**: Maintained and supported by DBLP
3. **No Intermediaries**: Direct browser-to-DBLP connection
4. **Structured Data**: JSON responses are easier to parse than HTML
5. **Free to Use**: No payment or API keys required

### Advantages Over Previous Approach

The API-based approach offers several benefits:
- ✅ **No privacy concerns** - Direct connection to DBLP
- ✅ **No third-party dependencies** - Eliminates proxy service dependencies
- ✅ **More stable** - Official API with better reliability
- ✅ **Better performance** - Structured JSON data, no HTML parsing needed
- ✅ **Free** - No payment required

### Why Python Version Still Better for Production

While the browser version now works well, the Python CLI is still better for heavy use:
- ✅ Better for batch processing large numbers of conferences
- ✅ Can be scripted and automated
- ✅ More flexible for integration into workflows
- ✅ Faster for processing multiple years/conferences

## Recommendation

**For most users:**
- 🌐 **Casual searches**: Use the browser version directly - works out of the box with DBLP API!
- 🚀 **Research work**: Use the command-line version for better reliability and performance

The browser interface is fully functional and great for quick searches, but the CLI tool is still the preferred method for extensive research work.
