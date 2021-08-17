const { series,src, dest, watch, parallel } = require('gulp');
const gulpSass = require("gulp-sass");
const nodeSass = require("node-sass");
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require ('gulp-concat');

const sass = gulpSass(nodeSass);

const paths={
    imagenes: 'src/img/**/*',
    js: 'src/js/**/*.js'
}

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

function javascript(){
    return src(paths.js)
    .pipe(concat('bundle.js'))
    .pipe(dest('./build/js'))
}

function imagenes(){
    return src(paths.imagenes)
    .pipe(imagemin())
    .pipe(dest('./build/img'))
    .pipe(notify({ message: 'Imagen Minificada'}))
}

function versionWebp(){
    return src(paths.imagenes)
    .pipe(webp())
    .pipe(dest('./build/img'))
    .pipe(notify({message: 'Versión WebP lista'}))
}

function watchArchivos() {
    watch('./src/scss/**/*.scss', css);
    watch(paths.js, javascript);
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes=imagenes;
exports.watchArchivos = watchArchivos;
exports.default = series(css,javascript, watchArchivos );
exports.javascript = javascript;