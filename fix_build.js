const fs = require('fs');
const path = require('path');

// 1. Recreate B2B pages with correct UTF-8 encoding
const routes = ["licenses", "deployments", "telemetry", "billing", "support", "security"];
routes.forEach(r => {
    const dir = path.join(__dirname, 'src/app/admin', r);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const content = `import React from 'react';\n\nexport default function Page() {\n  return (\n    <div className="p-8">\n      <h1 className="text-2xl font-bold mb-4 uppercase tracking-wider text-zinc-800">Módulo ${r}</h1>\n      <p className="text-zinc-500">Este módulo B2B SaaS está en desarrollo.</p>\n    </div>\n  );\n}`;
    fs.writeFileSync(path.join(dir, 'page.tsx'), content, 'utf8');
});
console.log("Recreated B2B pages in UTF-8.");

// 2. Delete broken tailoring routes that are no longer linked in the sidebar
const toDelete = [
    'src/app/admin/pos',
    'src/app/admin/finance',
    'src/app/p',
    'src/app/api/webhooks/mercadopago',
    'src/app/admin/crm/[id]/editar'
];

toDelete.forEach(p => {
    const fullPath = path.join(__dirname, p);
    if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log("Deleted: " + p);
    }
});
