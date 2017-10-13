import gulp from 'gulp'
import minimist from 'minimist'
import path from 'path'
import del from 'del'
import {taskCss} from './tasks/css'
import {taskPhpLint} from './tasks/phplint'
import {taskImages} from './tasks/images'

const argv = minimist(process.argv.slice(2))

const settings = {
    // general
    assetDistFolder: path.join(__dirname, 'theme', 'build'),

    // css
    cssGlob: 'css/**/*.css',
    cssEntry: path.join(__dirname, 'css', 'main.css'),
    cssDistDir: path.join(__dirname, 'theme', 'build', 'css'),

    // php
    phpGlob: ['theme/**/*.php', '!vendor/**'],

    // images
    imagesSourceGlob: 'assets/images/**/*',
    imagesDestDir: path.join(__dirname, 'theme', 'build', 'images'),
}

const enabled = {
    // disable maps with --production
    maps: !argv.production,
}

gulp.task('clean', () => del([settings.assetDistFolder]))

gulp.task('css', taskCss(settings.cssEntry, settings.cssDistDir, enabled.maps))
gulp.task('images', taskImages(settings.imagesSourceGlob, settings.imagesDestDir))
gulp.task('phplint', taskPhpLint(settings.phpGlob))

gulp.task('watch', ['css', 'images', 'phplint'], () => {
    gulp.watch(settings.cssGlob, ['css'])
    gulp.watch(settings.imagesSourceGlob, ['images'])
    gulp.watch(settings.phpGlob, ['phplint'])
})

gulp.task('default', ['css', 'images'])
