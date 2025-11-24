# Deployment Guide - RBS Website

## 🎯 Current Setup

- **Repository**: https://github.com/r-bsoftware/RBS_website
- **Domain**: redbroomsoftware.com
- **Hosting**: GitHub Pages
- **Build**: SvelteKit Static Adapter

---

## 🚀 Deployment Options

### Option 1: GitHub Pages (Recommended for Static Sites)

#### Setup GitHub Pages

1. **Go to Repository Settings**:
   - Navigate to: https://github.com/r-bsoftware/RBS_website/settings/pages

2. **Configure Source**:
   - Source: Deploy from a branch
   - Branch: `master` or `main`
   - Folder: `/ (root)` or `/build` (depending on your setup)

3. **Custom Domain**:
   - The `CNAME` file already exists with `redbroomsoftware.com`
   - Ensure DNS is configured (see DNS section below)

#### Deploy Process

```bash
# 1. Build the site
npm run build

# 2. The build outputs to ./build directory

# 3. Option A: Commit build directory
git add build/
git commit -m "chore: update build"
git push origin master

# 4. Option B: Use GitHub Actions (see below)
```

---

### Option 2: GitHub Actions (Automated Build & Deploy)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['master']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: 'build/'

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

**Benefits**:
- Automatic builds on every push
- No need to commit build directory
- Clean git history

---

### Option 3: Vercel (Alternative - More Features)

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Update `svelte.config.js`**:
```javascript
import adapter from '@sveltejs/adapter-vercel';
// ... rest of config
adapter: adapter()
```

3. **Deploy**:
```bash
vercel --prod
```

4. **Configure Custom Domain** in Vercel dashboard

---

## 🌐 DNS Configuration

### For redbroomsoftware.com

Configure these DNS records with your domain registrar:

```
Type    Name    Value                       TTL
------------------------------------------------------
A       @       185.199.108.153             3600
A       @       185.199.109.153             3600
A       @       185.199.110.153             3600
A       @       185.199.111.153             3600
CNAME   www     r-bsoftware.github.io       3600
```

**Note**: GitHub Pages IPs may change. Check current IPs at:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

---

## 📋 Deployment Checklist

### Before Deploying

- [ ] Run `npm run build` and verify no errors
- [ ] Test the site locally with `npm run preview`
- [ ] Check all links work (especially Constanza app link)
- [ ] Verify responsive design on mobile
- [ ] Update product statuses if needed
- [ ] Check contact email is correct

### After Deploying

- [ ] Visit https://redbroomsoftware.com and verify site loads
- [ ] Test all navigation links
- [ ] Test "Acceder a Constanza" button
- [ ] Verify mobile responsiveness
- [ ] Check page load speed (should be fast - static site)
- [ ] Test contact section
- [ ] Verify SSL certificate is active (https://)

---

## 🔧 Troubleshooting

### Site Not Updating

1. **Check GitHub Actions** (if using):
   - Go to: https://github.com/r-bsoftware/RBS_website/actions
   - Verify latest workflow succeeded

2. **Clear Browser Cache**:
   ```
   - Chrome: Cmd/Ctrl + Shift + R
   - Or use Incognito mode
   ```

3. **Check GitHub Pages Build**:
   - Settings → Pages
   - Look for build status

### 404 Errors

1. **Verify `svelte.config.js` has correct adapter**:
   ```javascript
   adapter: adapter({
     fallback: 'index.html'  // Important for SPA
   })
   ```

2. **Check build directory exists**: `ls -la build/`

### DNS Issues

1. **Verify DNS propagation**:
   ```bash
   dig redbroomsoftware.com
   ```

2. **DNS propagation takes 24-48 hours** after changes

3. **Check CNAME file** exists in repository root

---

## 🎨 Updating Content

### Update Product Information

Edit `src/routes/+page.svelte`:

```typescript
const products = [
  {
    name: 'Product Name',
    subtitle: 'Short Description',
    description: 'Long description...',
    url: 'https://product-url.com',
    status: 'live' | 'development',  // Changes badge color
    icon: '📊',
    features: ['Feature 1', 'Feature 2', ...]
  },
  // ... more products
];
```

### Update Links

Find and replace Constanza URL throughout `+page.svelte`:
- Current: `https://constanza-oyc4b548x-rbss-projects-204990eb.vercel.app`
- Replace with your production URL when ready

---

## 📊 Performance

### Current Build Stats

```
Build size: ~50KB (gzipped)
Load time: <1s (static site)
Lighthouse score: 95+ expected
```

### Optimization Tips

1. **Images**: Add to `/static/` and optimize before committing
2. **Fonts**: Currently using system fonts (fastest option)
3. **CSS**: Tailwind purges unused styles automatically
4. **JS**: SvelteKit optimizes bundle splitting

---

## 🔒 Security

### GitHub Pages

- Automatic HTTPS (Let's Encrypt)
- DDoS protection by GitHub
- No server-side code (static = secure)

### Recommendations

- [ ] Enable 2FA on GitHub account
- [ ] Limit repository collaborators
- [ ] Review GitHub Actions permissions
- [ ] Monitor repository activity

---

## 📞 Support

**Issues with deployment?**
- Check GitHub Issues: https://github.com/r-bsoftware/RBS_website/issues
- Email: soporte@redbroomsoftware.com

**SvelteKit Docs**: https://kit.svelte.dev/docs
**GitHub Pages Docs**: https://docs.github.com/en/pages

---

## 📝 Version History

### v1.0.0 (November 24, 2025)
- Migrated from static HTML to SvelteKit 4
- Added all 6 ecosystem products
- Responsive Tailwind CSS design
- GitHub Pages ready

---

**Last Updated**: November 24, 2025
**Next Review**: Update Constanza URL when production domain is configured
