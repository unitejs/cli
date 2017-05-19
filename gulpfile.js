const gulp = require('gulp');
const tsc = require('gulp-typescript');
const gulpTslint = require("gulp-tslint");
const tslint = require("tslint");
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const mocha = require('gulp-mocha');
const path = require('path');
const merge = require('merge2');

const tsConfigFile = 'tsconfig.json';
const srcFolder = './src/';
const distFolder = './dist/';
const testFolder = 'test/';
const tsSrcGlob = srcFolder + '**/*.ts';
const cleanTestGlob = testFolder + '/**/*.js';
const tsTestGlob = testFolder + '**/*.spec.ts';
const jsTestGlob = testFolder + '**/*.spec.js';

const tsProject = tsc.createProject(tsConfigFile);

gulp.task('clean-build', function (cb) {
  return del(distFolder, cb);
});

gulp.task('lint-build', ['clean-build'], function () {
    var program = tslint.Linter.createProgram(tsConfigFile);

    return gulp.src(tsSrcGlob)
        .pipe(gulpTslint({
            program
        }))
        .pipe(gulpTslint.report());
});

gulp.task('build', ['lint-build'], function () {
    var tsResult = gulp.src(tsSrcGlob)
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest(distFolder)),
        tsResult.js.pipe(sourcemaps.write({
            includeContent: true
        }))
        .pipe(gulp.dest(distFolder))
    ]);
});

gulp.task('clean-test', function (cb) {
  return del(cleanTestGlob, cb);
});

gulp.task('lint-test', ['clean-test'], function () {
    var program = tslint.Linter.createProgram(tsConfigFile);

    return gulp.src(tsTestGlob)
        .pipe(gulpTslint({
            program
        }))
        .pipe(gulpTslint.report());
});

gulp.task('test', ['lint-test'], function () {
    var tsResult = gulp.src(tsTestGlob)
    .pipe(tsProject());

	return tsResult.js
        .pipe(gulp.dest(testFolder))
		.pipe(mocha({
            reporter: 'spec', 
            timeout: '360000'
        }))
        .once('error', () => {
            process.exit(1);
        });
});

gulp.task('clean-all', ['clean-build', 'clean-test']);
