import fs from 'fs';

let replacement = `<div className="flex items-center gap-1.5 font-black italic tracking-wider text-xl md:text-2xl pt-1 scale-90 md:scale-100 origin-left">
                <span className="text-orange-500" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>NINA</span>
                <span className="text-[#e2e2e2]" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>DIAMOND</span>
             </div>`;

let replacementFooter = `<div className="flex items-center gap-2 font-black italic tracking-wider text-2xl md:text-3xl pt-1">
                        <span className="text-orange-500" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>NINA</span>
                        <span className="text-[#e2e2e2]" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}>DIAMOND</span>
                     </div>`;                     

function replaceLogo(file) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace Nav logo
    const pattern1 = /<div className="flex items-center justify-center bg-gradient-to-b from-\[#ffb800\] to-\[#f47000\] px-4 py-1.5 rounded-sm shadow-md scale-90 md:scale-100 origin-left border border-white\/10">[\s\S]*?<span className="text-\[20px\] font-black text-black italic tracking-\[0.15em\] leading-none pr-1">NINA<\/span>[\s\S]*?<\/div>/;
    
    content = content.replace(pattern1, replacement);
    
    // Replace Footer logo (text-[24px])
    const pattern2 = /<div className="flex items-center justify-center bg-gradient-to-b from-\[#ffb800\] to-\[#f47000\] px-5 py-2.5 rounded-sm shadow-md border border-white\/10">[\s\S]*?<span className="text-\[24px\] font-black text-black italic tracking-\[0.15em\] leading-none pr-1">NINA<\/span>[\s\S]*?<\/div>/;
    
    content = content.replace(pattern2, replacementFooter);

    fs.writeFileSync(file, content, 'utf8');
    console.log('Replaced in', file);
}

replaceLogo('src/Home.tsx');
replaceLogo('src/MobileLegends.tsx');
