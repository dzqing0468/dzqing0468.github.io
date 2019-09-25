let gulp = require("gulp");
let app = {
    src:"./src",
    dist:"./dist"
}

// html压缩
let htmlmin =require("gulp-htmlmin");
gulp.task("htmlmin",function(done){
    gulp.src(`${app.src}/**/*.{htm,html}`)
        .pipe(htmlmin({
            removeComments:true,
            collapseWhitespace:true,
            collapseBooleanAttributes:true,
        }))
        .pipe(gulp.dest(app.dist));
    done();
})

// css压缩
let cssmin=require("gulp-cssmin");
gulp.task("cssmin",function(done){
    gulp.src(`${app.src}/**/*.css`)
        .pipe(cssmin())
        .pipe(gulp.dest(app.dist));
    done();
});

// js压缩混淆
// let jsmin = require("gulp-uglify-es");
// gulp.task("jsmin",function(done){
//     gulp.src(`${app.src}/**/*.js`)
//         .pipe(jsmin.default())
//         .pipe(gulp.dest(app.dist))

//     done();
// });

let {default:jsmin} = require("gulp-uglify-es");
gulp.task("jsmin",function(done){
    gulp.src(`${app.src}/**/*.js`)
        .pipe(jsmin())
        .pipe(gulp.dest(app.dist))

    done();
});

// 文件重命名（实现src拷贝到bak目录下，所有文件后缀名都附加一个.bak）

let rename = require("gulp-rename");
gulp.task("bak",function(done){
    gulp.src(`${app.src}/**`)
        .pipe(rename(function(target,info){
            console.log(target,typeof info);
            if(target.extname){
                target.extname+=".bak";
            }
                
        }))
        .pipe(gulp.dest(app.dist));
    done();
});

// 文件合并