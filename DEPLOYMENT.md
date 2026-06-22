# 🚀 Finance Tracker - Deployment Guide

This guide covers deploying the Finance Tracker to production using free and paid services.

## Quick Start: Deploy to GitHub

### 1. Create Repository on GitHub
Go to [GitHub](https://github.com/new) and create a new repository:
- **Repository name**: `finance-tracker`
- **Description**: Full-stack expense tracker with React, Express, MongoDB
- **Visibility**: Public
- **Don't initialize** with README, .gitignore, or license (we have them)

### 2. Push to GitHub
```bash
cd C:\Users\blitz\finance-tracker
git remote add origin https://github.com/YOUR_USERNAME/finance-tracker.git
git branch -M main
git push -u origin main
```

---

## Option A: Deploy Frontend Only (Recommended for Quick Demo)

### Deploy React Frontend to Vercel (Free)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy from `client` folder**:
   ```bash
   cd client
   vercel --prod
   ```

3. **Configure Vercel**:
   - Project name: `finance-tracker-client`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install dependencies: Yes

4. **Your frontend is live at**: `https://finance-tracker-client.vercel.app`

**Note**: Frontend will work in **demo mode** (localStorage) without backend. Perfect for testing UI/UX.

---

## Option B: Deploy Both Frontend & Backend (Full Stack)

### Backend: Deploy Express to Render (Free)

1. **Go to [Render.com](https://render.com)** and sign up with GitHub

2. **Create New Web Service**:
   - Connect your GitHub repository
   - Select repository: `finance-tracker`
   - Build command: `cd server && npm install`
   - Start command: `cd server && npm start`
   - Environment: Node
   - Instance type: Free

3. **Add Environment Variables** in Render dashboard:
   ```
   PORT=10000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/finance_tracker
   JWT_SECRET=your_random_secret_min_32_chars
   ```

4. **Get MongoDB Atlas Connection String**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster
   - Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/finance_tracker`
   - Replace `user:pass` with actual credentials

5. **Your backend URL**: `https://finance-tracker-server.onrender.com` (or similar)

### Frontend: Update API URL for Backend

Edit `client/src/api.js`:
```javascript
const API_BASE_URL = 'https://finance-tracker-server.onrender.com/api';
```

Then deploy to Vercel:
```bash
cd client
vercel --prod
```

---

## Option C: Deploy with Docker (Advanced)

### Deploy to Railway (Free with GitHub)

1. **Go to [Railway.app](https://railway.app)** and sign up with GitHub

2. **Click "New Project" → "Deploy from GitHub repo"**

3. **Select your `finance-tracker` repository**

4. **Add MongoDB Service**:
   - Click "Add" → Select "MongoDB"
   - Railway generates connection string automatically

5. **Add Backend Service**:
   - Source: Your GitHub repo
   - Dockerfile path: `server/Dockerfile`
   - Environment variables:
     - `MONGO_URI`: Auto-generated from MongoDB service
     - `JWT_SECRET`: Random 32-char string

6. **Add Frontend Service**:
   - Build command: `npm run build`
   - Start command: `npm start`
   - Root directory: `client`

---

## Option D: Deploy to Heroku (Paid)

*Note: Heroku free tier ended, but paid dynos start at $7/month*

```bash
heroku login
heroku create finance-tracker
git push heroku main
```

---

## Production Checklist

- [ ] Set strong `JWT_SECRET` (min 32 chars)
- [ ] Update `MONGO_URI` to production MongoDB
- [ ] Update API base URL in frontend for backend domain
- [ ] Enable CORS for production frontend domain
- [ ] Add rate limiting to API routes
- [ ] Use HTTPS only
- [ ] Set `NODE_ENV=production`
- [ ] Review security in `server/routes/auth.js`

---

## Environment Variables

### Frontend (.env in `client/`)
```
VITE_API_URL=https://your-backend-domain.com/api
```

### Backend (.env in `server/`)
```
PORT=4000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_random_secret_key_min_32_characters
NODE_ENV=production
```

---

## Post-Deployment Testing

1. **Test Frontend**: Open deployed URL
2. **Add Expense**: Create a test expense
3. **Verify localStorage**: Check browser DevTools → Application → Local Storage
4. **Test Backend** (if deployed):
   ```bash
   curl -X POST https://your-backend.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123","name":"Test"}'
   ```

---

## Troubleshooting

### "MONGO_URI not found"
- Verify environment variables are set in platform dashboard
- Restart deployment after adding env vars

### "CORS Error"
- Add frontend domain to server `cors()` in `server/index.js`
- Redeploy backend

### "Port already in use"
- Check if port 4000/3000 is available
- Use environment variable for dynamic port

### Build failing
- Check build logs in deployment platform
- Ensure `npm install` completes without errors

---

## Support

For issues:
1. Check deployment platform logs
2. Verify environment variables
3. Test locally with `npm run dev`
4. Check GitHub Issues

Happy deploying! 🚀
