const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));

const replacements = {
    'â†\u0090': '←',
    'â† ': '← ',
    'Ã¡': 'á',
    'Ã©': 'é',
    'Ã³': 'ó',
    'Ã­': 'í',
    'Ãº': 'ú',
    'Ã±': 'ñ',
    'Ã‘': 'Ñ',
    'Â¿': '¿',
    'Â¡': '¡',
    'Ã ': 'à',
    'Â´': '´',
    'Ã¼': 'ü',
    'â€œ': '“',
    'â€ ': '”',
    'â€™': '’',
    'â€”': '—',
    'â€“': '–',
    'â€¢': '•',
    'Â°': '°',
    'Ã…': 'Å',
    'Ã ': 'á',
    'Ã‚': 'Â',
    'Â ': ' ', // Non-breaking space corruption
    'Â': '',  // leftover A-circumflex
};

let fixedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Special exact replacements first
    content = content.replace(/â†/g, '←');
    
    for (const [bad, good] of Object.entries(replacements)) {
        content = content.split(bad).join(good);
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
        console.log(`Fixed encoding in: ${file}`);
    }
});

console.log(`\nFinished! Fixed ${fixedCount} files.`);
