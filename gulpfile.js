const { series,src, dest, watch, parallel } = require('gulp');
const gulpSass = require("gulp-sass");
const nodeSass = require("node-sass");
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');

const sass = gulpSass(nodeSass);

const paths={
    imagenes: 'src/img/**/*',
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
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes=imagenes;
exports.watchArchivos = watchArchivos;
exports.default = series(css, imagenes, versionWebp, watchArchivos);