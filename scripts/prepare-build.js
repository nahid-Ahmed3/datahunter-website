const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env');

if (!process.env.DATABASE_URL) {
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, 'DATABASE_URL="file:./dev.db"\nPORT=3000\n');
  }
}
