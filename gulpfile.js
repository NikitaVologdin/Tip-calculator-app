"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync").create();
const pxToRem = require("gulp-px2rem-converter");

const transpileSassToCss = (done) => {
  return gulp
    .src(`sass/style.sass`)
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(browserSync.stream())
    .pipe(gulp.dest(`css`));
};

const concatCss = () => {
  return gulp
    .src(["css/*.css"])
    .pipe(plumber())
    .pipe(concat("style.css"))
    .pipe(browserSync.stream())
    .pipe(gulp.dest("css"));
};

const convertPixToRem = () => {
  return gulp
    .src(["css/style.css"])
    .pipe(plumber())
    .pipe(pxToRem())
    .pipe(gulp.dest("css"));
};

function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

const watchFiles = () => {
  gulp.watch(
    ["sass/**/*.sass"],
    gulp.series(transpileSassToCss, concatCss, convertPixToRem)
  );
  gulp.watch(["./*.html"]).on("change", browserSync.reload);
};

exports.default = watchFiles;
