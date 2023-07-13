const packageJSON = require('./package.json');

const fs = require('fs');
fs.writeFileSync(
    process.cwd() + '/src/version.ts',
    `export const VERSION = "${packageJSON.version}" as const;
    `,
);
