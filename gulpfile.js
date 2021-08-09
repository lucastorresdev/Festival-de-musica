


const { src, dest, watch } = require('gulp');
const gulpSass = require("gulp-sass");
const nodeSass = require("node-sass");

const sass = gulpSass(nodeSass);

sass.compiler = require('node-sass');

function css() {
    return src('./src/scss/*.scss')
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(dest('./build/css'));
}

function minificarcss() {
    return src('./src/scss/*.scss')
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(dest('./build/css'));
}

function watchArchivos() {
    watch('./src/scss/**/*.scss', css);
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.watchArchivos = watchArchivos;