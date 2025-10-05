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



