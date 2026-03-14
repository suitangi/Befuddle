const fs = require('fs');
const path = require('path');

// Get today's date in yyyy.mm.dd format
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const newVersion = `${year}.${month}.${day}`;

console.log(`Updating version to: ${newVersion}`);

// Update scripts/index.js line 3
const jsPath = path.join(__dirname, '..', 'scripts', 'index.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// Find and replace the version line
jsContent = jsContent.replace(
  /const befuddleAppVersion = "\d+\.\d+\.\d+";/,
  `const befuddleAppVersion = "${newVersion}";`
);

fs.writeFileSync(jsPath, jsContent, 'utf8');
console.log('✓ Updated scripts/index.js line 3');

// Update index.html lines 64, 65, 67
const htmlPath = path.join(__dirname, '..', 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Replace all version query parameters
htmlContent = htmlContent.replace(
  /\?v=\d+\.\d+\.\d+/g,
  `?v=${newVersion}`
);

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('✓ Updated index.html version query parameters');

console.log(`\nVersion bump complete! New version: ${newVersion}`);