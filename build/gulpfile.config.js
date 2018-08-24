const SRC_DIR = './src/';     // 源文件目录  
const DIST_DIR = './dist/';   // 文件处理后存放的目录  
const DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件  
const DIST_HASH = './disthash/';

const Config = {
    src: SRC_DIR,
    dist: DIST_DIR,
    dist_files: DIST_FILES,
    dist_hash: DIST_HASH,
    html: {
        src: SRC_DIR + '*.html',  
        dist: DIST_DIR  
    },
    libs: {  
        src: SRC_DIR + 'libs/**/*',            // libs./src/libs  
        dist: DIST_DIR + 'libs'                // libs文件build后存放的目录：./dist/libs  
    },  
    css: {  
        src: SRC_DIR + 'css/**/*.css',           // CSS目录：./src/css/  
        dist: DIST_DIR + 'css'                   // CSS文件build后存放的目录：./dist/css  
    },  
    sass: {  
        src: SRC_DIR + 'sass/**/*.scss',         // SASS目录：./src/sass/  
        dist: DIST_DIR + 'css'                   // SASS文件生成CSS后存放的目录：./dist/css  
    },  
    js: {  
        src: SRC_DIR + 'js/**/*.js',             // JS目录：./src/js/  
        dist: DIST_DIR + 'js',                   // JS文件build后存放的目录：./dist/js  
        build_name: 'build.js'                   // 合并后的js的文件名  
    },  
    img: {  
        src: SRC_DIR + 'images/**/*',            // images目录：./src/images/  
        dist: DIST_DIR + 'images'                // images文件build后存放的目录：./dist/images  
    }  
};
module.exports = Config;

