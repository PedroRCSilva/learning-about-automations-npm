import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulp from "gulp"
import autoPrefixer from 'gulp-autoprefixer';

const sass = gulpSass(dartSass);

// Criando compilador SASS para  o meu projeot
const compileSass=()=>{
    return gulp
    .src("./css/*.scss")
    .pipe(sass({
        style:"compressed"
    })) // Informamos a função que ira executar no pipe
    .pipe(autoPrefixer({
        cascade:false,
        overrideBrowserslist:['last 4 versions', 'ie 11']
        
    })) // Adicionar retrocompatibilidade de propriedades com navegadores
    .pipe(gulp.dest("css/")) // Destino a onde esse CSS deve ficar
}

gulp.task('sass',compileSass)