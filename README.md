# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/da080b94-ba71-41a0-b439-a45b57c5cb59

## Como fazer deploy no Netlify

1. Acesse [Netlify](https://netlify.com) e faça login
2. Clique em "Add new site" > "Deploy manually"
3. Arraste a pasta do projeto ou clique para fazer upload
4. Importante: Configure as variáveis de ambiente:
   - Vá em "Site settings" > "Environment variables"
   - Adicione STRIPE_SECRET_KEY com sua chave secreta do Stripe

## Configurações de Build
- Build command: npm run build
- Publish directory: dist
- Node version: 18 (ou superior)

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/da080b94-ba71-41a0-b439-a45b57c5cb59) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/da080b94-ba71-41a0-b439-a45b57c5cb59) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
