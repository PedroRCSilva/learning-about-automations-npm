# learning-about-automations-npm
Repositorie about automations with npm

## Entendendo Versionamento de semântico

<img width="800" height="500" alt="Untitled-2025-10-04-2200" src="https://github.com/user-attachments/assets/5ef0757f-6090-4054-9567-70ea49b3a70c" />


## Por que o npm cria um diretório ".bin" dentro da *node_modules*?

Dentro do diretório `.bin` ficam os scripts de CLI (Command Line Interface) para que o nosso projeto possa executar comandos no terminal.
Isso foi criado porque as bibliotecas, às vezes, precisam alterar ou listar arquivos — e isso só pode ser feito via terminal. Nesse diretório `.bin` são gerados scripts específicos para cada sistema operacional (Linux, Windows ou macOS).
Essa abordagem garante que o ecossistema Node seja compatível com diferentes ambientes.

Porém, se quiséssemos executar esses scripts manualmente, precisaríamos referenciar o caminho completo do arquivo. Por exemplo:

```bash
./node_modules/.bin/script
```

Agora imagine bibliotecas mais complexas, em que precisamos passar várias *flags* e parâmetros — isso seria bem trabalhoso, certo?

Pensando nisso, o npm criou uma seção no arquivo `package.json` chamada **"scripts"**, onde podemos criar *aliases* (atalhos) para esses comandos. Esses comandos são acessíveis apenas dentro do escopo do projeto.
Isso é possível porque o `package.json` “enxerga” o diretório `.bin` dentro de `node_modules`, então basta usarmos o nome do script, sem precisar escrever o caminho completo.

Vamos a um exemplo.
Usaremos o famoso *linter* de código chamado **ESLint**.

Após instalá-lo, se quiséssemos executá-lo sem o `package.json`, faríamos assim:

```bash
./node_modules/.bin/eslint .
```

Mas, com o script configurado no `package.json`:

```json
{
  "name": "learning-about-automations-npm",
  "version": "1.0.0",
  "description": "Project to learn about npm automations",
  "license": "ISC",
  "author": "PedroRCSilva",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "lint": "eslint ." <---
  },
  "dependencies": {},
  "devDependencies": {
    "eslint": "^9.37.0"
  }
}
```

Podemos simplesmente executar:

```bash
npm run lint
```

Com isso, conseguimos configurar uma infinidade de comandos e automações usando o npm.


## O que é Gulp?

Gulp é um *task runner* (executor de tarefas) usado para automatizar processos de desenvolvimento. Podemos fazer desde simples tarefas, como compilar arquivos **Sass** para **CSS**, até otimizar o processo de build do nosso projeto.

Ele conta com diversos plugins desenvolvidos pela comunidade, que permitem, com apenas um comando, executar tarefas complexas e que normalmente levariam vários minutos em configurações manuais.

---

## O que é Autoprefixer e como usá-lo?

O **Autoprefixer** é um **plugin do PostCSS** que adiciona automaticamente prefixos de compatibilidade às propriedades CSS.

Às vezes usamos propriedades que, em navegadores diferentes, ainda não foram totalmente implementadas ou estão em fase experimental. Quando isso acontece, o Autoprefixer adiciona a sintaxe específica para garantir **retrocompatibilidade**, evitando que o nosso projeto apresente erros de renderização.

Os prefixos mais comuns adicionados são `-moz` (Firefox) e `-webkit` (Chrome/Safari). Ele faz isso automaticamente com base nas regras definidas no **Browserslist**, uma ferramenta que permite configurar o nível de compatibilidade desejado — por exemplo, as últimas 2 versões dos principais navegadores.

O Autoprefixer obtém informações de compatibilidade a partir do serviço [Can I Use](https://caniuse.com/), que mantém dados atualizados sobre o suporte de propriedades CSS em diferentes navegadores.

Para consultar como configurar as *queries* de compatibilidade, acesse:
👉 [https://github.com/browserslist/browserslist](https://github.com/browserslist/browserslist)

---

## Como configurar o Gulp com o Autoprefixer?

Primeiro, instale a dependência do Autoprefixer para o Gulp:

```bash
npm i gulp-autoprefixer
```

Após isso, iremos usar uma função que já faz a compilação de um arquivo **SCSS** para **CSS**:

```javascript
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import gulp from "gulp";
import autoPrefixer from 'gulp-autoprefixer';

const sass = gulpSass(dartSass);

const compileSass = () => {
  return gulp
    .src("./css/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed"
      })
    ) // Compila o Sass para CSS
    .pipe(
      autoPrefixer({
        cascade: false,
        overrideBrowserslist: ['last 4 versions', 'not dead']
      })
    ) // Adiciona retrocompatibilidade com base no Browserslist
    .pipe(gulp.dest("css/")); // Define o destino do CSS compilado
};
```

Na configuração do Gulp, estamos pegando a saída dos arquivos compilados do Sass e aplicando o plugin do Autoprefixer. Podemos fazer isso de duas formas:

* Usando o `overrideBrowserslist`, como no exemplo acima, onde informamos diretamente as *queries* de compatibilidade;
* Ou criando um arquivo de configuração chamado **`.browserslistrc`**, que é o método recomendado atualmente.

Se você tem uma grande quantidade de *queries* para serem configuradas, o ideal é criar esse arquivo.

---

### Exemplo de arquivo `.browserslistrc`

```
last 4 versions
> 1%
not dead
```

> Isso significa que o Autoprefixer garantirá compatibilidade com as 4 últimas versões dos navegadores mais usados, com mais de 1% de uso global, excluindo navegadores obsoletos.

