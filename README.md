# Tuyishime Martin - Professional Portfolio

Professional portfolio website for Tuyishime Martin - Web Developer & AI/ML Engineer with a robust Node.js/Express backend.

## Features

- **Professional Design**: Modern, unique layout with gradient accents and smooth animations
- **Responsive Layout**: Perfectly optimized for all devices and screen sizes
- **Advanced Contact Form**: With email notifications and validation
- **Comprehensive API**: Rich portfolio data endpoints
- **Social Media Integration**: Seamless connection to your profiles
- **AI-Powered Chatbot**: Intelligent assistant for answering common questions
- **Rate Limiting**: Protected endpoints with security measures
- **Health Checks**: Monitoring and status endpoints
- **Enhanced Error Handling**: Robust error management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone or download this repository to your local machine
2. Navigate to the project directory:

```bash
cd tuyishime-martin-portfolio
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add your environment variables:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=3000
```

## Environment Variables

For the contact form to work, you need to set up Gmail SMTP with an app password:

1. Enable 2-factor authentication on your Google account
2. Generate an app password for "Mail" at [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Add the email and app password to your `.env` file

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The application will run on `http://localhost:3000` by default.

## API Endpoints

- `GET /` - Serves the main portfolio page
- `GET /api/portfolio` - Returns portfolio data (skills, projects, contact info)
- `POST /api/contact` - Handles contact form submissions

## Project Structure

```
├── index.html          # Main portfolio page
├── IMG_20241213_063301.jpg   # Profile photo
├── server.js           # Express server file
├── package.json        # Project dependencies and scripts
├── .env               # Environment variables (not included in repo)
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## Contact Form

The contact form is fully functional and will send emails to the address specified in your environment variables. The form includes validation and provides feedback to the user.

## Customization

To customize this portfolio:

1. Update your personal information in `server.js` (api/portfolio endpoint)
2. Modify the UI in `index.html` as needed
3. Add your own projects to the portfolio data
4. Update your social media links in both `server.js` and `index.html`

## Deployment

To deploy this application:

1. Choose a hosting platform (Heroku, Vercel, AWS, etc.)
2. Set up environment variables for your production environment
3. Deploy the application
4. Ensure all dependencies are included in package.json

## Backend Features

The Node.js/Express backend provides:

- **API Endpoints**:
  - `/api/portfolio` - Comprehensive portfolio data
  - `/api/projects` - Projects-only endpoint
  - `/api/contact` - Secure contact form handling
  - `/api/health` - Server health monitoring

- **Security Measures**:
  - Rate limiting (100 requests per 15 minutes)
  - Input validation and sanitization
  - Error handling and logging

- **Email Integration**:
  - Nodemailer for contact form emails
  - HTML email templates
  - Gmail SMTP configuration

## Chatbot Feature

The portfolio includes an advanced AI-powered chatbot with:

- **Welcome Notification**: Appears for new visitors with a friendly greeting
- **Professional Responses**: Comprehensive answers about Martin's skills, experience, and services
- **Natural Language Processing**: Improved keyword detection for better understanding of user queries
- **Session Tracking**: Remembers conversation history with localStorage
- **Message Clearing**: Ability to clear chat and start fresh
- **Unread Message Indicator**: Shows when messages arrive while chat is closed
- **Smart Greetings**: Different response patterns based on user interaction

The chatbot can answer questions about Martin's skills, projects, experience, education, services, and availability.

## Session Management

The backend implements secure session management with:

- **Express Sessions**: Server-side session tracking
- **MongoDB Storage**: Optional MongoDB session storage for production
- **Security Features**: HTTP-only cookies, secure flags, and session timeouts
- **Rate Limiting**: Protection against abuse with configurable limits

## License

This project is licensed under the MIT License.