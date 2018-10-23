const gulp = require("gulp");
const log = require("fancy-log");
const replace = require("gulp-replace");
const tsc = require("gulp-typescript");
const gulpTslint = require("gulp-tslint");
const tslint = require("tslint");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const mocha = require("gulp-mocha");
const istanbul = require("gulp-istanbul");
const merge = require("merge2");
const remapIstanbul = require("remap-istanbul/lib/gulpRemapIstanbul");
const coveralls = require("gulp-coveralls");
const runSequence = require("run-sequence");
const minimist = require("minimist");

const tsConfigFile = "./tsconfig.json";

const srcFolder = "./src/";
const distFolder = "./dist/";
const srcGlob = `${srcFolder}**/*.ts`;
const distGlob = `${distFolder}**/*`;

const unitFolder = "test/unit/";
const unitSrcFolder = `${unitFolder}src/`;
const unitDistFolder = `${unitFolder}dist/`;
const unitSrcGlob = `${unitSrcFolder}**/`;
const unitDistGlob = `${unitDistFolder}**/`;
const unitReportsFolder = `${unitFolder}reports/`;
const unitReportsFolderGlob = `${unitReportsFolder}/**/*`;

gulp.task("build-clean", (cb) => {
    return del(distGlob, cb);
});

gulp.task("build-lint", () => {
    const program = tslint.Linter.createProgram(tsConfigFile);

    return gulp.src(srcGlob)
        .pipe(gulpTslint({
            "formatter": "verbose",
            program
        }))
        .pipe(gulpTslint.report())
        .on("error", () => {
            process.exit(1);
        });
});

gulp.task("build-transpile", () => {
    const tsProject = tsc.createProject(tsConfigFile);

    let errorCount = 0;

    const tsResult = gulp.src(srcGlob)
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .on("error", () => {
            errorCount++;
        });

    const streams = [];

    streams.push(tsResult.js
        .pipe(sourcemaps.write({"includeContent": true}))
        .pipe(gulp.dest(distFolder))
        .on("end", () => {
            if (errorCount > 0) {
                process.exit(1);
            }
        }));

    if (tsProject.config.compilerOptions.declaration) {
        streams.push(tsResult.dts
            .pipe(gulp.dest(distFolder)));
    }

    return merge(streams);
});

gulp.task("build", (cb) => {
    runSequence("build-clean", "build-transpile", "build-lint", cb);
});

gulp.task("unit-clean", (cb) => {
    return del([`${unitDistGlob}*`, unitReportsFolderGlob], cb);
});

gulp.task("unit-lint", () => {
    const program = tslint.Linter.createProgram(tsConfigFile);

    const knownOptions = {
        "default": {
            "grep": "*"
        },
        "string": [
            "grep"
        ]
    };

    const options = minimist(process.argv.slice(2), knownOptions);

    return gulp.src([`${unitSrcGlob}${options.grep}.spec.ts`, `${unitSrcGlob}*.mock.ts`])
        .pipe(gulpTslint({
            "formatter": "verbose",
            program
        }))
        .pipe(gulpTslint.report())
        .on("error", () => {
            process.exit(1);
        });
});

gulp.task("unit-transpile", () => {
    const tsProject = tsc.createProject(tsConfigFile);

    let errorCount = 0;

    const knownOptions = {
        "default": {
            "grep": "*"
        },
        "string": [
            "grep"
        ]
    };

    const options = minimist(process.argv.slice(2), knownOptions);

    const tsResult = gulp.src([`${unitSrcGlob}${options.grep}.spec.ts`, `${unitSrcGlob}*.mock.ts`])
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .on("error", () => {
            errorCount++;
        });

    return tsResult.js
        .pipe(replace(/(require.*?)(\.\.\/src\/)/g, "$1../dist/"))
        .pipe(sourcemaps.write({"includeContent": true}))
        .pipe(gulp.dest(unitDistFolder))
        .on("end", () => {
            if (errorCount > 0) {
                process.exit(1);
            }
        });
});

gulp.task("unit-pre-coverage", () => {
    const knownOptions = {
        "default": {
            "grep": "!(index|I*)"
        },
        "string": [
            "grep"
        ]
    };

    const options = minimist(process.argv.slice(2), knownOptions);

    return gulp.src(`${distFolder}**/${options.grep}.js`)
        .pipe(istanbul({"includeUntested": true}))
        .pipe(istanbul.hookRequire());
});

gulp.task("unit-runner", () => {
    const knownOptions = {
        "default": {
            "grep": "*"
        },
        "string": [
            "grep"
        ]
    };

    const options = minimist(process.argv.slice(2), knownOptions);

    return gulp.src(`${unitDistGlob}${options.grep}.spec.js`)
        .pipe(mocha({
            "reporter": "spec",
            "timeout": "360000"
        }).on("error", (err) => {
            log.error(err.message);
            log.error(err.stack);
            process.exit(1);
        }))
        .pipe(istanbul.writeReports({
            "dir": unitReportsFolder,
            "reporters": ["json"]
        }));

});

gulp.task("unit-remap", () => {
    return gulp.src(`${unitReportsFolder}coverage-final.json`)
        .pipe(remapIstanbul({
            "reports": {
                "text": "",
                "json": `${unitReportsFolder}coverage.json`,
                "html": `${unitReportsFolder}html-report`,
                "lcovonly": `${unitReportsFolder}lcov.info`
            }
        }));
});


gulp.task("unit-post-remap", () => {
    return gulp.src([`${unitReportsFolder}lcov.info`, `${unitReportsFolder}coverage.json`])
        .pipe(replace(/\/dist\//g, "/src/"))
        .pipe(replace(/\\dist\\/g, "\\src\\"))
        .pipe(gulp.dest(unitReportsFolder));
});


gulp.task("unit", (cb) => {
    runSequence(
        "unit-clean",
        "unit-transpile",
        "unit-lint",
        "unit-pre-coverage",
        "unit-runner",
        "unit-remap",
        "unit-post-remap", cb
    );
});

gulp.task("coveralls", () => {
    return gulp.src(`${unitReportsFolder}lcov.info`)
        .pipe(coveralls());
});

gulp.task("clean-all", ["build-clean", "unit-clean"]);
