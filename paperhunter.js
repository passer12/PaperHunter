/**
 * PaperHunter - JavaScript implementation for browser-based paper searching
 * Replicates the functionality of the Python version to work on GitHub Pages
 */

// Configuration constants
const MAX_SUBPAGE = 5;
const DELAY_RANGE = [500, 1500]; // milliseconds

// Known conference list - matches config.py
const KNOWN_CONFS = {
    // Computer Architecture/Parallel & Distributed Computing/Storage Systems - Class A
    "ppopp": ["ACM SIGPLAN Symposium on Principles & Practice of Parallel Programming", "ppopp"],
    "fast": ["USENIX Conference on File and Storage Technologies", "fast"],
    "dac": ["Design Automation Conference", "dac"],
    "hpca": ["IEEE International Symposium on High Performance Computer Architecture", "hpca"],
    "micro": ["IEEE/ACM International Symposium on Microarchitecture", "micro"],
    "sc": ["International Conference for High Performance Computing, Networking, Storage, and Analysis", "sc"],
    "asplos": ["International Conference on Architectural Support for Programming Languages and Operating Systems", "asplos"],
    "isca": ["International Symposium on Computer Architecture", "isca"],
    "usenix": ["USENIX Annual Technical Conference", "usenix"],
    "eurosys": ["European Conference on Computer Systems", "eurosys"],

    // Computer Architecture/Parallel & Distributed Computing/Storage Systems - Class B
    "cloud": ["ACM Symposium on Cloud Computing", "socc"],
    "spaa": ["ACM Symposium on Parallelism in Algorithms and Architectures", "spaa"],
    "podc": ["ACM Symposium on Principles of Distributed Computing", "podc"],
    "fpga": ["ACM/SIGDA International Symposium on Field-Programmable Gate Arrays", "fpga"],
    "cgo": ["The International Symposium on Code Generation and Optimization", "cgo"],
    "date": ["Design, Automation & Test in Europe", "date"],
    "hotchips": ["Hot Chips: A Symposium on High Performance Chips", "hotchips"],
    "cluster": ["IEEE International Conference on Cluster Computing", "cluster"],
    "iccd": ["International Conference on Computer Design", "iccd"],
    "iccad": ["International Conference on Computer-Aided Design", "iccad"],
    "icdcs": ["IEEE International Conference on Distributed Computing Systems", "icdcs"],
    "codesisss": ["International Conference on Hardware/Software Co-design and System Synthesis", "codesisss"],
    "hipc": ["International Conference on High Performance and Embedded Architectures and Compilers", "hipeac"],
    "sigmetrics": ["International Conference on Measurement and Modeling of Computer Systems", "sigmetrics"],
    "ieeepact": ["International Conference on Parallel Architectures and Compilation Techniques", "pact"],
    "icpp": ["International Conference on Parallel Processing", "icpp"],
    "ics": ["International Conference on Supercomputing", "ics"],
    "vee": ["International Conference on Virtual Execution Environments", "vee"],
    "ipps": ["IEEE International Parallel & Distributed Processing Symposium", "ipdps"],
    "performance": ["International Symposium on Computer Performance, Modeling, Measurements and Evaluation", "performance"],
    "hpdc": ["The International ACM Symposium on High-Performance Parallel and Distributed Computing", "hpdc"],
    "itc": ["International Test Conference", "itc"],
    "lisa": ["Large Installation System Administration Conference", "lisa"],
    "mss": ["Mass Storage Systems and Technologies", "msst"],
    "rtas": ["IEEE Real-Time and Embedded Technology and Applications Symposium", "rtas"],
    "europar": ["European Conference on Parallel and Distributed Computing", "europar"],

    // Computer Networks - Class A
    "sigcomm": ["ACM International Conference on Applications, Technologies, Architectures, and Protocols for Computer Communication", "sigcomm"],
    "mobicom": ["ACM International Conference on Mobile Computing and Networking", "mobicom"],
    "infocom": ["IEEE International Conference on Computer Communications", "infocom"],
    "nsdi": ["Symposium on Network System Design and Implementation", "nsdi"],

    // Computer Networks - Class B
    "sensys": ["ACM Conference on Embedded Networked Sensor Systems", "sensys"],
    "conext": ["ACM International Conference on Emerging Networking Experiments and Technologies", "conext"],
    "secon": ["IEEE International Conference on Sensing, Communication, and Networking", "secon"],
    "ipsn": ["International Conference on Information Processing in Sensor Networks", "ipsn"],
    "mobisys": ["ACM International Conference on Mobile Systems, Applications, and Services", "mobisys"],
    "icnp": ["IEEE International Conference on Network Protocols", "icnp"],
    "mobihoc": ["International Symposium on Theory, Algorithmic Foundations, and Protocol Design for Mobile Networks and Mobile Computing", "mobihoc"],
    "nossdav": ["International Workshop on Network and Operating System Support for Digital Audio and Video", "nossdav"],
    "iwqos": ["IEEE/ACM International Workshop on Quality of Service", "iwqos"],
    "imc": ["ACM Internet Measurement Conference", "imc"],

    // Network & Information Security - Class A
    "ccs": ["ACM Conference on Computer and Communications Security", "ccs"],
    "eurocrypt": ["International Conference on the Theory and Applications of Cryptographic Techniques", "eurocrypt"],
    "sp": ["IEEE Symposium on Security and Privacy", "sp"],
    "crypto": ["International Cryptology Conference", "crypto"],
    "uss": ["USENIX Security Symposium", "uss"],
    "ndss": ["Network and Distributed System Security Symposium", "ndss"],

    // Network & Information Security - Class B
    "acsac": ["Annual Computer Security Applications Conference", "acsac"],
    "asiacrypt": ["Annual International Conference on the Theory and Application of Cryptology and Information Security", "asiacrypt"],
    "esorics": ["European Symposium on Research in Computer Security", "esorics"],
    "sigsoft": ["Fast Software Encryption", "fse"],
    "csfw": ["IEEE Computer Security Foundations Workshop", "csf"],
    "srds": ["IEEE International Symposium on Reliable Distributed Systems", "srds"],
    "ches": ["International Conference on Cryptographic Hardware and Embedded Systems", "ches"],
    "dsn": ["International Conference on Dependable Systems and Networks", "dsn"],
    "raid": ["International Symposium on Recent Advances in Intrusion Detection", "raid"],
    "pkc": ["International Workshop on Practice and Theory in Public Key Cryptography", "pkc"],
    "tcc": ["Theory of Cryptography Conference", "tcc"],

    // Software Engineering/System Software/Programming Languages - Class A
    "pldi": ["ACM SIGPLAN Conference on Programming Language Design and Implementation", "pldi"],
    "popl": ["ACM SIGPLAN-SIGACT Symposium on Principles of Programming Languages", "popl"],
    "fse_esec": ["ACM Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering", "sigsoft"],
    "sosp": ["ACM Symposium on Operating Systems Principles", "sosp"],
    "oopsla": ["Conference on Object-Oriented Programming Systems, Languages, and Applications", "oopsla"],
    "kbse": ["International Conference on Automated Software Engineering", "ase"],
    "icse": ["International Conference on Software Engineering", "icse"],
    "issta": ["International Symposium on Software Testing and Analysis", "issta"],
    "osdi": ["USENIX Symposium on Operating Systems Design and Implementation", "osdi"],
    "fm": ["International Symposium on Formal Methods", "fm"],

    // Software Engineering/System Software/Programming Languages - Class B
    "ecoop": ["European Conference on Object-Oriented Programming", "ecoop"],
    "eptcs": ["European Joint Conferences on Theory and Practice of Software", "eptcs"],
    "icpc": ["IEEE International Conference on Program Comprehension", "icpc"],
    "re": ["IEEE International Requirements Engineering Conference", "re"],
    "caise": ["International Conference on Advanced Information Systems Engineering", "caise"],
    "icfp": ["ACM SIGPLAN International Conference on Function Programming", "scheme"],
    "lctrts": ["ACM SIGPLAN/SIGBED International Conference on Languages, Compilers and Tools for Embedded Systems", "lctes"],
    "models": ["ACM/IEEE International Conference on Model Driven Engineering Languages and Systems", "models"],
    "cp": ["International Conference on Principles and Practice of Constraint Programming", "cp"],
    "icsoc": ["International Conference on Service Oriented Computing", "icsoc"],
    "saner": ["IEEE International Conference on Software Analysis, Evolution, and Reengineering", "saner"],
    "icsm": ["International Conference on Software Maintenance and Evolution", "icsme"],
    "vmcai": ["International Conference on Verification, Model Checking, and Abstract Interpretation", "vmcai"],
    "icws": ["IEEE International Conference on Web Services", "icws"],
    "middleware": ["International Middleware Conference", "middleware"],
    "sas": ["International Static Analysis Symposium", "sas"],
    "esem": ["International Symposium on Empirical Software Engineering and Measurement", "esem"],
    "issre": ["IEEE International Symposium on Software Reliability Engineering", "issre"],
    "hotos": ["USENIX Workshop on Hot Topics in Operating Systems", "hotos"],

    // Databases/Data Mining/Content Retrieval - Class A
    "sigmod": ["ACM SIGMOD Conference", "sigmod"],
    "kdd": ["ACM SIGKDD Conference on Knowledge Discovery and Data Mining", "kdd"],
    "icde": ["IEEE International Conference on Data Engineering", "icde"],
    "sigir": ["International ACM SIGIR Conference on Research and Development in Information Retrieval", "sigir"],
    "vldb": ["International Conference on Very Large Data Bases", "vldb"],

    // Databases/Data Mining/Content Retrieval - Class B
    "cikm": ["ACM International Conference on Information and Knowledge Management", "cikm"],
    "wsdm": ["ACM International Conference on Web Search and Data Mining", "wsdm"],
    "pods": ["ACM SIGMOD-SIGACT-SIGAI Symposium on Principles of Database Systems", "pods"],
    "dasfaa": ["International Conference on Database Systems for Advanced Applications", "dasfaa"],
    "pkdd": ["European Conference on Machine Learning and Principles and Practice of Knowledge Discovery in Databases", "pkdd"],
    "semweb": ["IEEE International Semantic Web Conference", "iswc"],
    "icdm": ["IEEE International Conference on Data Mining", "icdm"],
    "icdt": ["International Conference on Database Theory", "icdt"],
    "edbt": ["International Conference on Extending Database Technology", "edbt"],
    "cidr": ["Conference on Innovative Data Systems Research", "cidr"],
    "sdm": ["SIAM International Conference on Data Mining", "sdm"],
    "recsys": ["ACM Conference on Recommender Systems", "recsys"],

    // Computer Science Theory - Class A
    "stoc": ["ACM Symposium on the Theory of Computing", "stoc"],
    "soda": ["ACM-SIAM Symposium on Discrete Algorithms", "soda"],
    "cav": ["International Conference on Computer Aided Verification", "cav"],
    "focs": ["IEEE Annual Symposium on Foundations of Computer Science", "focs"],
    "lics": ["ACM/IEEE Symposium on Logic in Computer Science", "lics"],

    // Computer Graphics & Multimedia - Class A
    "mm": ["ACM International Conference on Multimedia", "mm"],
    "siggraph": ["ACM Special Interest Group on Computer Graphics", "siggraph"],
    "vr": ["IEEE Virtual Reality", "vr"],
    "visualization": ["IEEE Visualization Conference", "visualization"],

    // Computer Graphics & Multimedia - Class B
    "mir": ["ACM SIGMM International Conference on Multimedia Retrieval", "icmr"],
    "si3d": ["ACM SIGGRAPH Symposium on Interactive 3D Graphics and Games", "si3d"],
    "sca": ["ACM SIGGRAPH/Eurographics Symposium on Computer Animation", "sca"],
    "dcc": ["Data Compression Conference", "dcc"],
    "eurographics": ["Annual Conference of the European Association for Computer Graphics", "eg-short"],
    "vissym": ["Eurographics Conference on Visualization", "eurovis"],
    "sgp": ["Eurographics Symposium on Geometry Processing", "sgp"],
    "rt": ["Eurographics Symposium on Rendering", "egsr"],
    "icassp": ["IEEE International Conference on Acoustics, Speech and Signal Processing", "icassp"],
    "icmcs": ["IEEE International Conference on Multimedia & Expo", "icme"],
    "ismar": ["International Symposium on Mixed and Augmented Reality", "ismar"],
    "pg": ["Pacific Conference on Computer Graphics and Applications", "pg"],
    "sma": ["Symposium on Solid and Physical Modeling", "spm"],

    // Artificial Intelligence - Class A
    "aaai": ["AAAI Conference on Artificial Intelligence", "aaai"],
    "nips": ["Conference on Neural Information Processing Systems", "neurips"],
    "acl": ["Annual Meeting of the Association for Computational Linguistics", "acl"],
    "cvpr": ["IEEE/CVF Computer Vision and Pattern Recognition Conference", "cvpr"],
    "iccvw": ["International Conference on Computer Vision", "iccvw"],
    "icml": ["International Conference on Machine Learning", "icml"],
    "ijcai": ["International Joint Conference on Artificial Intelligence", "ijcai"],

    // Artificial Intelligence - Class B
    "colt": ["Annual Conference on Computational Learning Theory", "colt"],
    "emnlp": ["Conference on Empirical Methods in Natural Language Processing", "emnlp"],
    "ecai": ["European Conference on Artificial Intelligence", "ecai"],
    "eccv": ["European Conference on Computer Vision", "eccv"],
    "icra": ["IEEE International Conference on Robotics and Automation", "icra"],
    "icaps": ["International Conference on Automated Planning and Scheduling", "icaps"],
    "iccbr": ["International Conference on Case-Based Reasoning", "iccbr"],
    "coling": ["International Conference on Computational Linguistics", "coling"],
    "kr": ["International Conference on Principles of Knowledge Representation and Reasoning", "kr"],
    "uai": ["Conference on Uncertainty in Artificial Intelligence", "uai"],
    "atal": ["International Joint Conference on Autonomous Agents and Multi-agent Systems", "aamas"],
    "ppsn": ["Parallel Problem Solving from Nature", "ppsn"],
    "naacl": ["North American Chapter of the Association for Computational Linguistics", "naacl"],

    // Human-Computer Interaction & Ubiquitous Computing - Class A
    "huc": ["ACM International Joint Conference on Pervasive and Ubiquitous Computing", "ubicomp"],
    "uist": ["ACM Symposium on User Interface Software and Technology", "uist"],

    // Interdisciplinary/Comprehensive/Emerging - Class A
    "www": ["International World Wide Web Conference", "www"],
    "rtss": ["IEEE Real-Time Systems Symposium", "rtss"],
    "wine": ["Conference on Web and Internet Economics", "wine"]
};

// Common abbreviations to known conference keys
const COMMON_TO_KNOWN = {
    "socc": "cloud",
    "hipeac": "hipc",
    "pact": "ieeepact",
    "ipdps": "ipps",
    "msst": "mss",
    "fse": "sigsoft",
    "atc": "usenix",
    "security": "uss",
    "csf": "csfw",
    "ase": "kbse",
    "scheme": "icfp",
    "lctes": "lctrts",
    "icsme": "icsm",
    "sigsoft": "fse_esec",
    "iswc": "semweb",
    "hscc": "hybrid",
    "neurips": "nips",
    "aamas": "atal",
    "fg": "fgr",
    "ijcb": "icb",
    "iss": "tabletop",
    "iccv": "iccvw",
    "ubicomp": "huc"
};

/**
 * Add random delay to avoid aggressive crawling
 */
function randomDelay() {
    const delay = Math.random() * (DELAY_RANGE[1] - DELAY_RANGE[0]) + DELAY_RANGE[0];
    return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Check and return valid conference pages for a given year from DBLP
 */
async function checkConfPages(short, key, year) {
    const baseUrl = `https://dblp.org/db/conf/${short}/`;
    
    // Special suffix mappings for specific conferences with non-standard URL formats
    const specialSuffix = {
        "vldb": "w",
        "sca": "p",
        "ubicomp": "ap",
        "eurovis": "short",
        "sgp": "p",
        "egsr": "st",
        "pg": "s"
    };

    // 1. Try main conference page (e.g., icml2024.html)
    const mainUrl = `${baseUrl}${key}${year}.html`;
    try {
        const response = await fetch(mainUrl, { method: 'HEAD' });
        if (response.ok) {
            return [mainUrl];
        }
    } catch (e) {
        console.log(`Error checking main page: ${e.message}`);
    }

    // 2. Try sub-pages (e.g., icml2024-1.html)
    const found = [];
    for (let i = 1; i <= MAX_SUBPAGE; i++) {
        const subUrl = `${baseUrl}${key}${year}-${i}.html`;
        try {
            const response = await fetch(subUrl, { method: 'HEAD' });
            if (response.ok) {
                found.push(subUrl);
            } else {
                break; // Stop if non-200 status code encountered
            }
        } catch (e) {
            console.log(`Error checking sub-page ${i}: ${e.message}`);
            break;
        }
        await randomDelay();
    }

    if (found.length > 0) {
        return found;
    }

    // 3. Try special suffix pages for conferences with unique URL patterns
    if (key in specialSuffix) {
        const suffix = specialSuffix[key];
        const specialUrl = `${baseUrl}${key}${year}${suffix}.html`;
        try {
            const response = await fetch(specialUrl, { method: 'HEAD' });
            if (response.ok) {
                return [specialUrl];
            }
        } catch (e) {
            console.log(`Error checking special suffix page: ${e.message}`);
        }
    }

    // No valid pages found
    return [];
}

/**
 * Parse HTML and extract paper titles
 */
function parsePaperTitles(htmlText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const titles = [];
    
    // Find all cite elements with class "data"
    const cites = doc.querySelectorAll('cite.data');
    cites.forEach(cite => {
        const titleElement = cite.querySelector('span.title');
        if (titleElement && titleElement.textContent) {
            titles.push(titleElement.textContent.trim());
        }
    });
    
    return titles;
}

/**
 * Filter titles based on keyword criteria
 */
function filterTitles(titles, keywordsAny, keywordsAll) {
    const matchedTitles = [];
    
    for (const title of titles) {
        // Check if all required keywords (kw_all) are present
        let allMatch = true;
        if (keywordsAll && keywordsAll.length > 0) {
            for (const kw of keywordsAll) {
                const regex = new RegExp(kw, 'i');
                if (!regex.test(title)) {
                    allMatch = false;
                    break;
                }
            }
            if (!allMatch) {
                continue;
            }
        }
        
        // Check if at least one optional keyword (kw) is present
        let anyMatch = true;
        if (keywordsAny && keywordsAny.length > 0) {
            let hasMatchingKw = false;
            for (const kw of keywordsAny) {
                const regex = new RegExp(kw, 'i');
                if (regex.test(title)) {
                    hasMatchingKw = true;
                    break;
                }
            }
            anyMatch = hasMatchingKw;
        }
        
        // Include title if it meets all criteria
        if (allMatch && anyMatch) {
            matchedTitles.push(title);
        }
    }
    
    return matchedTitles;
}

/**
 * Fetch and filter papers from a conference for a specific year
 */
async function fetchPapers(confShort, year, keywordsAny, keywordsAll, progressCallback) {
    const confInfo = KNOWN_CONFS[confShort.toLowerCase()];
    if (!confInfo) {
        throw new Error(`Unknown conference abbreviation: ${confShort}`);
    }
    
    const [fullName, dblpKey] = confInfo;
    if (progressCallback) {
        progressCallback(`Recognized conference: ${fullName}`);
    }
    
    // Get valid conference pages
    const validPages = await checkConfPages(confShort, dblpKey, year);
    
    if (validPages.length === 0) {
        if (progressCallback) {
            progressCallback(`No valid conference pages found for ${fullName} in ${year}`);
        }
        return [];
    }
    
    // Extract all paper titles from valid pages
    const titles = [];
    for (const url of validPages) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                if (progressCallback) {
                    progressCallback(`Failed to retrieve ${url} (Status: ${response.status})`);
                }
                continue;
            }
            
            const htmlText = await response.text();
            const pageTitles = parsePaperTitles(htmlText);
            titles.push(...pageTitles);
            
            await randomDelay();
        } catch (e) {
            if (progressCallback) {
                progressCallback(`Error during content extraction: ${e.message}`);
            }
        }
    }
    
    // Filter titles based on keyword criteria
    const matchedTitles = filterTitles(titles, keywordsAny, keywordsAll);
    
    if (progressCallback) {
        progressCallback(`Crawled ${titles.length} total papers. Found ${matchedTitles.length} matching the criteria.`);
    }
    
    return matchedTitles;
}

/**
 * Normalize conference abbreviation
 */
function normalizeConference(conf) {
    const lower = conf.toLowerCase();
    return COMMON_TO_KNOWN[lower] || lower;
}

/**
 * Main search function
 */
async function searchPapers(conferences, years, keywordsAny, keywordsAll, progressCallback) {
    const allResults = [];
    
    // Normalize conferences
    let normalizedConfs = [];
    if (conferences.length === 1 && conferences[0].toLowerCase() === 'all') {
        normalizedConfs = Object.keys(KNOWN_CONFS);
    } else {
        normalizedConfs = conferences.map(normalizeConference);
    }
    
    // Validate conferences
    const unknownConfs = normalizedConfs.filter(c => !KNOWN_CONFS[c]);
    if (unknownConfs.length > 0) {
        throw new Error(`Unknown conferences: ${unknownConfs.join(', ')}`);
    }
    
    // Search each conference and year
    for (const conf of normalizedConfs) {
        for (const year of years) {
            if (progressCallback) {
                progressCallback(`\n===== Searching ${conf.toUpperCase()} ${year} =====`);
            }
            
            try {
                const matchingPapers = await fetchPapers(conf, year, keywordsAny, keywordsAll, progressCallback);
                for (const title of matchingPapers) {
                    allResults.push({ conf, year, title });
                }
            } catch (e) {
                if (progressCallback) {
                    progressCallback(`Error searching ${conf} ${year}: ${e.message}`);
                }
            }
        }
    }
    
    return allResults;
}

// Export functions for use in HTML
window.PaperHunter = {
    searchPapers,
    KNOWN_CONFS,
    normalizeConference
};
