const gulp = require('gulp');
const concat = require('gulp-concat');
const jeditor = require('gulp-json-editor');
const bump = require('gulp-bump');
const run = require('gulp-run');

// dependencies for npm publishing
const npmDeps = {
    "lodash": "^4.17.10",
};
// additional dependencies for expo app
const expoDeps = {
    "expo": "^27.0.1",
    "babel-loader": "^7.1.5",
    "expo": "^27.0.1",
    "gulp": "^3.9.1",
    "gulp-bump": "^3.1.1",
    "gulp-concat": "^2.6.1",
    "gulp-json-editor": "^2.4.2",
    "gulp-run": "^1.7.1",
    "lodash": "^4.17.10",
    "react": "16.3.1",
    "react-native": "~0.55.2"
};

// main for npm publishing
const npmMain = 'index.js';
// main for expo app
const expoMain = "./node_modules/react-native-scripts/build/bin/crna-entry.js";

const paths = {
  src: './src/',
  build: './dist/'
};

/****package.json stuff****/

// read the package.json and update it for npm publishing
gulp.task('forNPM', done => {
  gulp
    .src('./package.json')
    .pipe(bump())
    .pipe(
      jeditor(function(json) {
        json.dependencies = npmDeps;
        json.main = npmMain;
        return json;
      })
    )
    .pipe(concat('package.json'))
    .pipe(gulp.dest('./'));
  done();
});

gulp.task('npm-publish', done => {
  return run('npm publish').exec();
  done();
});

gulp.task('forExpo', done => {
  gulp
    .src('./package.json')
    .pipe(
      jeditor({
        dependencies: expoDeps,
        main: expoMain
      })
    )
    .pipe(concat('package.json'))
    .pipe(gulp.dest('./'));
  done();
});

gulp.task('publish', ['forNPM', 'npm-publish', 'forExpo']);