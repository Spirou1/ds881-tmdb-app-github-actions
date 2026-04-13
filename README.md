# Atividade Prática: Automação de CI/CD com GitHub Actions

Este repositório contém uma aplicação React Native (Expo) que consome a API de filmes TMDB. O objetivo desta atividade é configurar um pipeline de integração e entrega contínua utilizando GitHub Actions para automatizar os testes, o deploy da versão web e a geração do pacote Android (APK).

## Pré-requisitos Obrigatórios

Antes de iniciar as etapas, você deve garantir que a aplicação tenha acesso aos dados:

1.  **TMDB API Key:** Registre-se em [themoviedb.org](https://www.themoviedb.org/), crie um perfil de desenvolvedor e obtenha sua **API Key (v3 auth)**.
2.  **GitHub Secrets:** No seu repositório (após o Fork), vá em *Settings > Secrets and variables > Actions* e crie um segredo chamado `TMDB_API_KEY` com o valor da sua chave.
3.  **Fork:** Certifique-se de estar trabalhando no seu próprio Fork para ter permissão de execução das Actions.

---

## Etapa 1: Garantia de Qualidade (Testes)

O primeiro passo de qualquer pipeline é garantir que o código novo não quebre funcionalidades existentes.

* Crie o arquivo `.github/workflows/main.yml` no seu repositório.
* Configure o gatilho para disparar apenas em `pushes` na branch `release` ou manualmente via `workflow_dispatch`.
* Crie um Job de teste que utilize o **Node.js 20** (para compatibilidade com os métodos do Expo).
* O job deve instalar as dependências usando `npm ci` (para garantir uma instalação fiel ao lockfile) e executar o script de teste padrão.

---

## Etapa 2: Entrega Web e GitHub Pages

Nesta etapa, você deve transformar o código em um site estático e publicá-lo. 
**Atenção aos detalhes importantes abaixo.**

1.  **Configuração da BaseURL:** Antes de mexer no workflow, edite o arquivo `app.json` no seu projeto. Adicione a propriedade `experiments.baseUrl` apontando para o nome do seu repositório (ex: `/seu-repositorio`). Sem isso, os scripts JS não serão encontrados no deploy.
2.  **Variáveis de Ambiente:** No workflow, garanta que a chave do TMDB seja injetada em um arquivo `.env`. Lembre-se que o Expo exige que variáveis de frontend comecem com o prefixo `EXPO_PUBLIC_`.
3.  **Build e Bypass do Jekyll:**
    * Execute o comando de exportação do Expo para a plataforma web.
    * **Importante:** O GitHub Pages ignora pastas que começam com sublinhado (como a `_expo` gerada pelo build). Crie um arquivo vazio chamado `.nojekyll` na pasta de saída (`dist`) para desativar esse comportamento.
4.  **Deploy:** Utilize as Actions oficiais do GitHub para fazer o upload do artefato da pasta `dist` e realizar o deploy para o ambiente `github-pages`.

---

## Etapa 3: Build Nativo e Release de APK

A última etapa consiste em gerar o binário para instalação em dispositivos Android sem depender de serviços externos pagos.

1.  **Ambiente Nativo:** O job deve configurar o **JDK 17** e o ambiente Node.js.
2.  **Geração de Código Nativo:** Como este é um projeto gerenciado (Managed Workflow), você deve executar o comando `prebuild` do Expo para gerar a pasta `/android` dinamicamente no Runner do GitHub.
3.  **Compilação Gradle:** Garanta permissão de execução para o arquivo `gradlew` e execute o comando para montar o APK de release (`assembleRelease`).
4.  **Publicação da Release:**
    * Faça o upload do arquivo `.apk` gerado como um artefato do workflow.
    * Configure um passo final que dependa dos builds anteriores para criar uma **GitHub Release** oficial.
    * Utilize o número da execução (`github.run_number`) para taguear a versão automaticamente (ex: `v1`, `v2`).
    * Anexe o arquivo APK à Release criada.

---

## Validação da Atividade

A atividade será considerada concluída quando:
* A aba **Actions** mostrar o pipeline finalizado com sucesso (verde).
* O site da aplicação estiver acessível e consumindo dados da TMDB via URL do GitHub Pages.
* Uma **Release** aparecer na página inicial do repositório contendo o arquivo `app-release.apk` disponível para download.

---

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
