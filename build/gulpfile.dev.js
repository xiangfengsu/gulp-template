const gulp = require("gulp");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const Config = require("./gulpfile.config.js");


/**
 * 更多配置 参考 https://browsersync.io/docs/options#option-cors
*/
const browserSyncOption = {
  server: {
    baseDir: Config.dist
  },
  browser: "google chrome",
  notify: false
};

function dev() {
  /**
   * HTML处理
   */

  gulp.task("html:dev", function() {
    return gulp
      .src(Config.html.src)
      .pipe(gulp.dest(Config.html.dist))
      .pipe(
        reload({
          stream: true
        })
      );
  });

  /**
   * CSS样式处理
   */
  gulp.task("css:dev", function() {
    return gulp
      .src(Config.css.src)
      .pipe(gulp.dest(Config.css.dist))
      .pipe(
        reload({
          stream: true
        })
      );
  });

  /**
   * SASS样式处理
   */
  gulp.task("sass:dev", function() {
    return gulp
      .src(Config.sass.src)
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest(Config.sass.dist))
      .pipe(
        reload({
          stream: true
        })
      );
  });

  /**
   * js 处理
   */
  gulp.task("js:dev", function() {
    return gulp
      .src(Config.js.src)
      .pipe(
        babel({
          presets: ["@babel/env"],
          minified: true
        })
      )
      .on("error", function(err) {
        console.log("[Compilation Error]");
        console.log(
          err.fileName +
            (err.loc ? `( ${err.loc.line}, ${err.loc.column} ): ` : ": ")
        );
        console.log("error Babel: " + err.message + "\n");
        console.log(err.codeFrame);

        this.emit("end");
      })
      .pipe(gulp.dest(Config.js.dist))
      .pipe(
        reload({
          stream: true
        })
      );
  });

  /**
   * libs文件夹下的所有文件处理 
  */
  gulp.task("libs:dev", function() {
    return gulp
      .src(Config.libs.src)
      .pipe(gulp.dest(Config.libs.dist))
      .pipe(
        reload({
          stream: true
        })
      );
  });

  gulp.task("dev", ["html:dev", "libs:dev", "sass:dev", "css:dev", "js:dev"], function() {
    browserSync.init(browserSyncOption);
    // Watch .html files
    gulp.watch(Config.html.src, ["html:dev"]);
    // Watch .css files
    gulp.watch(Config.css.src, ["css:dev"]);
    // Watch .scss files
    gulp.watch(Config.sass.src, ["sass:dev"]);
    // Watch .js files
    gulp.watch(Config.js.src, ["js:dev"]);
    // Watch libs files  
    gulp.watch(Config.libs.src, ['libs:dev']);
  });
}

module.exports = dev;
