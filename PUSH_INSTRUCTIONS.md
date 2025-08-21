# How to push this project to your GitHub account (step-by-step)

## 1) Download & unzip
- Download `ecommerce-system.zip` from the link provided by ChatGPT.
- Unzip it to a folder, e.g. `~/projects/ecommerce-system` (macOS / Linux) or `C:\projects\ecommerce-system` (Windows).

macOS / Linux:
```bash
cd ~/Downloads
unzip ecommerce-system.zip -d ~/projects
cd ~/projects/ecommerce-system
```

Windows (PowerShell):
```powershell
Expand-Archive -Path "$env:USERPROFILE\Downloads\ecommerce-system.zip" -DestinationPath "C:\projects"
cd C:\projects\ecommerce-system
```

## 2) Inspect and edit placeholders
Open `REPORT_D1.md` and replace the placeholder GitHub link:
`https://github.com/YOUR_USERNAME/ecommerce-system`
with your actual repo URL after creating the repo.

Open `.env.example` files and update environment values as needed when you run locally.

## 3) Initialize Git and push (Option A — recommended Using GitHub CLI)

### Install prerequisites:
- Git: https://git-scm.com/
- GitHub CLI (gh): https://cli.github.com/

### Authenticate gh
```bash
gh auth login
```
Follow interactive prompts (choose GitHub.com, HTTPS or SSH, authorize in browser).

### Create repo & push
```bash
git init
git add .
git commit -m "Initial commit - ecommerce full-stack project"
gh repo create YOUR_USERNAME/ecommerce-system --public --source=. --remote=origin --push
```
This will create the repo on GitHub and push your code.

## 4) Alternative — Manual via GitHub website

1. Go to https://github.com/new and create a new repo named `ecommerce-system` (do not initialize with README).
2. Then run:
```bash
git init
git add .
git commit -m "Initial commit - ecommerce full-stack project"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/ecommerce-system.git
git push -u origin main
```
If using HTTPS, use the HTTPS remote URL.

## 5) Alternative — Create repo using PAT + curl (non-interactive)
- Create a Personal Access Token (PAT) with `repo` scope: https://github.com/settings/tokens
- Then:
```bash
TOKEN="ghp_xxxYOURTOKENxxx"
curl -H "Authorization: token $TOKEN" -d '{"name":"ecommerce-system","private":false}' https://api.github.com/user/repos
git init
git add .
git commit -m "Initial commit - ecommerce full-stack project"
git remote add origin https://YOUR_USERNAME:$TOKEN@github.com/YOUR_USERNAME/ecommerce-system.git
git push -u origin main
git remote set-url origin https://github.com/YOUR_USERNAME/ecommerce-system.git
```
Remember to remove the token from shell history and environment afterwards.

## 6) After pushing
- Go to your new repo web page and confirm files are present.
- Edit `REPORT_D1.md` to include your GitHub link, then convert to PDF if required:
  - Use Microsoft Word, Google Docs, or a Markdown-to-PDF tool.

## 7) Run locally (dev)
### Backend:
```bash
cd backend
npm install
cp .env.example .env
# adjust values in .env, then:
npm run dev
```
### Frontend:
```bash
cd frontend
npm install
# create .env or set VITE_API_URL to http://localhost:4000
npm run dev
```

If you need one-click deploy instructions (Render, Railway, Vercel), ask and I will provide them.
