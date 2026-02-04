---
description: How to deploy the VinFast VF7 Community Website to Vercel or Netlify
---

# Deployment Guide

This guide explains how to deploy your Vite React application to the public web.

## Option 1: Vercel (Recommended)
Vercel is optimized for frontend frameworks like Vite and offers a generous free tier.

### Prerequisites
1.  **GitHub Account**: You should have your code pushed to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).

### Steps
1.  **Push code to GitHub**:
    -   Create a new repository on GitHub.
    -   Run the following commands in your project root (`d:\Git\demo_VF7`):
        ```bash
        git remote add origin <your-github-repo-url>
        git branch -M main
        git push -u origin main
        ```
2.  **Import to Vercel**:
    -   Go to [vercel.com/new](https://vercel.com/new).
    -   Select your GitHub repository.
    -   **Configure Project**:
        -   **Framework Preset**: Vite
        -   **Root Directory**: `VinFast VF7 Community Website` (Important! Your `package.json` is inside this folder).
        -   **Build Command**: `vite build` (Default)
        -   **Output Directory**: `dist` (Default)
        -   **Install Command**: `npm install` (Default)
    -   Click **Deploy**.

## Option 2: Netlify Drop (No Git required)
If you just want to drag and drop your site:

1.  **Build locally**:
    Run the build command in your terminal:
    ```bash
    cd "VinFast VF7 Community Website"
    npm run build
    ```
    This will create a `dist` folder.

2.  **Deploy**:
    -   Go to [app.netlify.com/drop](https://app.netlify.com/drop).
    -   Drag and drop the `dist` folder from your file explorer into the browser window.
    -   Your site will be live instantly!

## Troubleshooting
-   **Routing Issues**: If refreshing a page gives a 404, you need a rewrite rule.
    -   **Vercel**: Create `vercel.json` in the app root:
        ```json
        {
          "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
        }
        ```
    -   **Netlify**: Create `_redirects` in the `public` folder:
        ```
        /*  /index.html  200
        ```
