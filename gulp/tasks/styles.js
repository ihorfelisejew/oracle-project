var gulp = require("gulp");
var cssnano = require("cssnano");
var config = require("../config");
var mode = require("gulp-mode")();
var notify = require("gulp-notify");
var browserSync = require("browser-sync");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var cssimport = require("gulp-cssimport");
var url = require("postcss-url");
var sourcemaps = require("gulp-sourcemaps");
var sass = require("gulp-sass")(require("sass"));

var reload = browserSync.reload;

const sassOptions = {
	outputStyle: "compressed",
	sourceMap: true,
	precision: 3,
	errLogToConsole: true,
};

var processors = [
	autoprefixer({
		overrideBrowserslist: ["last 15 versions"],
		cascade: false,
	}),
	cssnano(),
	url({
		url: function (asset) {
			if (asset.url.indexOf("fonts/") === 0) {
				return asset.url.replace("fonts/", "");
			}
			return asset.url;
		},
	}),
];

gulp.task("styles", (done) => {
	gulp.src([config.src.sass + "**.scss"])
		.pipe(mode.development(sourcemaps.init()))
		.pipe(
			sass(sassOptions).on("error", (error) => {
				notify.onError({
					title: "Sass Error!",
					message: error.message,
				});
			})
		)
		.pipe(cssimport())
		.pipe(postcss(processors))
		.pipe(mode.development(sourcemaps.write("./")))
		.pipe(gulp.dest(config.dest.css))
		.pipe(gulp.dest(config.theme.assets))
		.pipe(browserSync.stream());
	done();
});

gulp.task("styles:watch", () => {
	gulp.watch(
		[config.src.sass + "**/*"],
		gulp.series("styles", (done) => {
			reload();
			done();
		})
	);
});
