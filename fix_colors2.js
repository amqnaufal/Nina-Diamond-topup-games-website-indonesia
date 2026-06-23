import fs from 'fs';

let content = fs.readFileSync('src/MobileLegends.tsx', 'utf8');

const replacements = [
  ['text-black font-extrabold', 'text-white font-extrabold'],
  ['bg-orange-500/10', 'bg-orange-600/10'],
  ['border-orange-500', 'border-orange-600/50'],
  ['bg-orange-500 px-3', 'bg-orange-600 px-3'],
  ['border-orange-400', 'border-orange-600/50'],
  ['text-orange-500 fill-orange-500', 'text-orange-500 fill-orange-500'], // untouched just in case
];

for (const [search, replace] of replacements) {
    content = content.split(search).join(replace);
}

fs.writeFileSync('src/MobileLegends.tsx', content, 'utf8');
console.log('Colors replaced successfully 2');
