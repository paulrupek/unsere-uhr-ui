const gulp = require('gulp'),
	  rollupBabel = require('rollup-plugin-babel'),
	  rollupNodeResolve = require('rollup-plugin-node-resolve'),
	  sourcemaps = require('gulp-sourcemaps'),
	  gulpRollup = require('gulp-better-rollup')

gulp.task('rollup', () => {
	gulp.src([
		'./src/app.js'
	])
	.pipe(sourcemaps.init())
	.pipe(gulpRollup({
		plugins: [rollupBabel()]
	}, {
		format: 'iife'
	}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./dist/'))
})
