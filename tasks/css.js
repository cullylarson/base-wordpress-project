import gulp from 'gulp'
import gulpif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import plumber from 'gulp-plumber'
import cssMixins from 'postcss-mixins'
import cssImport from 'postcss-import'
import simpleVars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import nestedAncestors from 'postcss-nested-ancestors'
import customMedia from 'postcss-custom-media'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'

const taskCss = (entryCss, destDir, enableMaps) => () => {
    const processors = [
        cssImport,
        cssMixins,
        simpleVars,
        nestedAncestors,
        nested,
        customMedia,
        cssnext,
        // autoprefixer is included in cssnext, so no need to do it again in nano
        cssnano({zindex: false, autoprefixer: false}),
    ]

    return gulp.src(entryCss)
        .pipe(plumber())
        .pipe(gulpif(enableMaps, sourcemaps.init()))
        .pipe(postcss(processors))
        .pipe(gulpif(enableMaps, sourcemaps.write('.')))
        .pipe(gulp.dest(destDir))
}

export {taskCss}
