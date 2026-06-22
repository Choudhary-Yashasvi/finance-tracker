#!/usr/bin/env powershell
# Finance Tracker - One-Click Deployment Script
# Run this script to deploy to GitHub and Vercel

Write-Host "🚀 Finance Tracker - Deployment Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Verify Git
Write-Host "✓ Step 1: Checking Git..." -ForegroundColor Yellow
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git not found. Install from https://git-scm.com" -ForegroundColor Red
    exit
}
Write-Host "✓ Git is installed" -ForegroundColor Green

# Step 2: Verify Node
Write-Host ""
Write-Host "✓ Step 2: Checking Node.js..." -ForegroundColor Yellow
$env:Path = "C:\node-portable\node-v20.11.0-win-x64;$env:Path"
$nodeVersion = & node --version
Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green

# Step 3: Get GitHub info
Write-Host ""
Write-Host "✓ Step 3: GitHub Configuration" -ForegroundColor Yellow
$githubUsername = Read-Host "Enter your GitHub username"
$githubRepo = "finance-tracker"
$repoUrl = "https://github.com/$githubUsername/$githubRepo.git"

Write-Host "Your repo will be: $repoUrl" -ForegroundColor Cyan

# Step 4: Add remote and push
Write-Host ""
Write-Host "✓ Step 4: Pushing to GitHub..." -ForegroundColor Yellow
cd C:\Users\blitz\finance-tracker

try {
    git remote remove origin -ErrorAction SilentlyContinue
    git remote add origin $repoUrl
    git branch -M main
    git push -u origin main
    Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "📍 Repository: $repoUrl" -ForegroundColor Green
} catch {
    Write-Host "❌ Git push failed. Make sure you created the repo on GitHub first!" -ForegroundColor Red
    exit
}

# Step 5: Deploy to Vercel
Write-Host ""
Write-Host "✓ Step 5: Deploying Frontend to Vercel..." -ForegroundColor Yellow
Write-Host "Installing Vercel CLI..." -ForegroundColor Cyan
npm install -g vercel

Write-Host ""
Write-Host "Opening Vercel deployment..." -ForegroundColor Cyan
Write-Host "When prompted:" -ForegroundColor Yellow
Write-Host "  - Link to existing project? Answer: No" -ForegroundColor Gray
Write-Host "  - Project name: finance-tracker" -ForegroundColor Gray
Write-Host "  - Use defaults for all other options" -ForegroundColor Gray
Write-Host ""

cd C:\Users\blitz\finance-tracker\client
vercel --prod

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your project is now LIVE:" -ForegroundColor Cyan
Write-Host "  📍 GitHub: $repoUrl" -ForegroundColor Green
Write-Host "  🌐 Website: Check Vercel console for URL" -ForegroundColor Green
Write-Host ""
Write-Host "Share these links with others to show off your project! 🎉" -ForegroundColor Cyan
