import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import plumber from 'gulp-plumber'

const taskImages = (sourceGlob, destDir) => () => {
    return  gulp.src(sourceGlob)
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest(destDir))
}

export {taskImages}
