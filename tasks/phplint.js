import gulp from 'gulp'
import phplint from 'gulp-phplint'
import gutil from 'gulp-util'

const taskPhpLint = (globs) => () => {
    return gulp.src(globs)
        // silent since we're outputting the message in the reporter
        .pipe(phplint('', {'skipPassedFiles': true, 'silent': true}))
        .pipe(phplint.reporter((atts) => {
            const report = atts.phplintReport || {}
            if(report.error) {
                console.error(gutil.colors.red("Fail") + ": " + gutil.colors.underline(report.filename) + ":" + gutil.colors.yellow(report.line) + " — " + gutil.colors.blue(report.message))
            }
        }))
}

export {taskPhpLint}
