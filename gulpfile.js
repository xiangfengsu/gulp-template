const dev = require('./build/gulpfile.dev.js');
const prod = require('./build/gulpfile.prod.js');
// const env = process.env.NODE_ENV;
dev();
prod()
// env === 'development' ? dev() : prod();

