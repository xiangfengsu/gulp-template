const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const RevAll = require("gulp-rev-all");
const Config = require("./gulpfile.config.js");

function prod() {
  /**
   * HTML处理
   */

  gulp.task("html:prod", function() {
    return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist));
  });

  /**
   * CSS样式处理
   */
  gulp.task("css:prod", function() {
    return gulp.src(Config.css.src).pipe(gulp.dest(Config.css.dist));
  });

  /**
   * SASS样式处理
   */
  gulp.task("sass:prod", function() {
    const plugins = [
      autoprefixer({
        browsers: ["ie 9", "last 2 version", "Firefox < 20"]
      }),
      cssnano()
    ];
    return gulp
      .src(Config.sass.src)
      .pipe(sass().on("error", sass.logError))
      .pipe(postcss(plugins))
      .pipe(gulp.dest(Config.sass.dist));
  });

  /**
   * js 处理
   */
  gulp.task("js:prod", function() {
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
      .pipe(uglify())
      .pipe(gulp.dest(Config.js.dist));
  });

  /**
   *  images 压缩处理
   */

  gulp.task("img:prod", function() {
    return gulp
      .src(Config.img.src)
      .pipe(
        imagemin(
          [
            imagemin.gifsicle({ interlaced: false }),
            imagemin.jpegtran({ progressive: false }),
            imagemin.optipng({ optimizationLevel: 6 })
          ],
          {
            verbose: true
          }
        )
      )
      .pipe(gulp.dest(Config.img.dist));
  });

  /**
   * libs文件夹下的所有文件处理
   */
  gulp.task("libs:prod", function() {
    return gulp.src(Config.libs.src).pipe(gulp.dest(Config.libs.dist));
  });

  /**
   * hash
   */
  gulp.task(
    "hash:prod",
    ["html:prod", "sass:prod", "css:prod", "js:prod", "libs:prod", "img:prod"],
    function() {
      return gulp
        .src(`${Config.dist}**`)
        .pipe(
          RevAll.revision({ dontRenameFile: [/^\/favicon.ico$/g, ".html"] })
        )
        .pipe(gulp.dest(Config.dist_hash));
    }
  );

  gulp.task("prod", ["hash:prod"]);
}

module.exports = prod;
