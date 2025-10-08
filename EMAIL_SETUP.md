# Email Contact Form Setup

## 🚀 Quick Start

To use the email contact form, you need to run **both** the frontend and backend servers.

### Option 1: Run Both Servers Together (Recommended)
```bash
npm run dev:full
```
This command runs both the Vite dev server and the email server concurrently.

### Option 2: Run Servers Separately
**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run server
```

## 📧 Email Configuration

The email service is configured to send emails using:
- **Sender Email**: arvaradodotcom@gmail.com
- **Recipient Email**: elmahboubimehdi@gmail.com (notification emails)
- **Public Email**: contact@studioeyn.com (visible on website)
- **SMTP Service**: Gmail
- **App Password**: iwar xzav utnb bxyw

## 🔍 Troubleshooting

### Error: "There was an error sending your message"

**Cause**: The backend server is not running.

**Solution**: 
1. Open a new terminal
2. Navigate to the project directory
3. Run `npm run server`
4. You should see:
   ```
   🚀 Server running on port 3001
   📧 Email service ready
   ✅ Email transporter ready
   ```

### CORS Errors

If you see CORS errors in the console, make sure:
1. The server is running on port 3001
2. The frontend is accessing `http://localhost:3001`
3. Both are running locally

### Gmail Authentication Issues

If emails aren't sending:
1. Verify the Gmail account credentials are correct
2. Ensure "Less secure app access" is enabled (if using regular password)
3. The current setup uses an App Password which should work

## 📍 Email Form Location

The email contact form is accessible from:
- **Direct URL**: `http://localhost:5173/email`
- **Navigation**: "Send a message" button (navbar)
- **Contact Section**: "Email Us" button
- **About Page**: "Email Us" button
- **Services Section**: "Email Us" button

## 🧪 Testing

1. Start both servers: `npm run dev:full`
2. Navigate to: `http://localhost:5173/email`
3. Fill out the form:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Message
   - Message: Testing the email form
4. Click "Send Message"
5. Check the console for confirmation
6. Check elmahboubimehdi@gmail.com for the email

## 📊 Server Endpoints

- **Health Check**: `GET http://localhost:3001/api/health`
- **Book Call**: `POST http://localhost:3001/api/book-call`
- **Send Email**: `POST http://localhost:3001/api/send-email`

## 🔧 Development

### Update Recipient Email
Edit `server/routes/email.js`:
```javascript
to: 'your-email@example.com',  // Line 216
```

### Update Sender Credentials
Edit `server/routes/email.js`:
```javascript
user: 'your-sender@gmail.com',
pass: 'your-app-password'
```

## ⚠️ Important Notes

1. **Server Must Be Running**: The email form will not work if the backend server (`npm run server`) is not running.
2. **Port 3001**: Ensure port 3001 is not being used by another application.
3. **Environment Variables**: For production, use environment variables instead of hardcoded credentials.
4. **Gmail App Password**: Never commit real credentials to version control.

## 🎯 Success Indicators

When everything is working correctly, you'll see:
- ✅ Server running on port 3001
- ✅ Email transporter ready
- ✅ No CORS errors in browser console
- ✅ Form submits successfully
- ✅ Success message displayed
- ✅ Email received in inbox

