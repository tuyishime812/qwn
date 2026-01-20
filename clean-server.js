const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Simple CORS setup for Vercel
app.use(cors());

// Static files and middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files with proper caching
app.use(express.static(__dirname, {
  dotfiles: 'allow',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') || filePath.endsWith('.gif') || filePath.endsWith('.svg')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache images for 1 year
    }
  }
}));

// Middleware for logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Main route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for portfolio data
app.get('/api/portfolio', (req, res) => {
  const portfolioData = {
    name: 'Tuyishime Martin',
    title: 'Web Developer & AI/ML Engineer',
    email: 'tuyishimemartin007@gmail.com',
    location: 'Dowa, Malawi',
    bio: 'I\'m a passionate developer with expertise in building modern web applications and implementing cutting-edge AI/ML solutions. With a strong foundation in computer science and years of experience, I bring ideas to life with elegant, efficient code.',
    about: 'My approach combines technical excellence with creative problem-solving. I specialize in developing scalable web solutions and leveraging artificial intelligence to solve complex real-world challenges.',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/tuyishime-martin-04532932a',
      github: 'https://github.com/tuyishime812',
      twitter: 'https://x.com/Tuyishimecrypto',
      facebook: 'https://www.facebook.com/profile.php?id=100086219627900'
    },
    projects: [
      {
        id: 1,
        name: 'Mlimi Smart',
        description: 'An intelligent digital agriculture platform that empowers smallholder farmers with real-time information, advisory services, and market opportunities using AI-driven tools.',
        technologies: ['Python', 'TensorFlow', 'PyTorch', 'TypeScript', 'TailwindCSS'],
        image: '/mlimi-smart.png',
        category: 'AI/ML',
        github: '#',
        live: 'https://mlimi-smart1.vercel.app/'
      },
      {
        id: 2,
        name: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with payment processing and inventory management.',
        technologies: ['JavaScript', 'Node.js', 'MongoDB', 'React'],
        image: 'https://placehold.co/600x400/8b5cf6/white?text=Web+App',
        category: 'Web Development',
        github: '#',
        live: '#'
      },
      {
        id: 3,
        name: 'Virtual Story Generator',
        description: 'An AI-powered platform that creates personalized stories supporting multiple languages including Swahili, Chichewa, Kinyarwanda, Yao, and English.',
        technologies: ['Python', 'JavaScript', 'AI/ML'],
        image: '/Virtula_story.png',
        category: 'AI/ML',
        github: '#',
        live: 'https://virtual-story-generator.vercel.app/'
      }
    ],
    skills: {
      technical: [
        { name: 'Web Development', level: 56, category: 'Frontend/Backend' },
        { name: 'JavaScript/React', level: 60, category: 'Frontend' },
        { name: 'Python/AI/ML', level: 42, category: 'AI/ML' },
        { name: 'Cloud Services', level: 70, category: 'DevOps' },
        { name: 'UI/UX Design', level: 65, category: 'Design' }
      ],
      professional: [
        { name: 'Problem Solving', level: 70 },
        { name: 'Communication', level: 85 },
        { name: 'Innovation', level: 92 },
        { name: 'Leadership', level: 75 }
      ]
    },
    experience: [
      {
        title: 'Senior Web Developer',
        company: 'Tech Solutions Inc.',
        period: '2022 - Present',
        description: 'Led development of scalable web applications for enterprise clients.'
      },
      {
        title: 'AI/ML Engineer',
        company: 'Data Insights Co.',
        period: '2020 - 2022',
        description: 'Developed machine learning models for predictive analytics.'
      },
      {
        title: 'Full Stack Developer',
        company: 'StartUp Ventures',
        period: '2018 - 2020',
        description: 'Built and maintained web applications using modern technologies.'
      }
    ],
    education: [
      {
        degree: 'MSc in Computer Science',
        institution: 'University of Technology',
        year: '2018'
      },
      {
        degree: 'BSc in Software Engineering',
        institution: 'State University',
        year: '2016'
      }
    ],
    services: [
      'Web Development',
      'AI/ML Solutions',
      'Data Analytics',
      'Consulting',
      'UI/UX Design',
      'Technical Writing'
    ]
  };

  res.json(portfolioData);
});

// API endpoint for projects only
app.get('/api/projects', (req, res) => {
  // Return only projects from the portfolio data
  const portfolioData = require('./server').getPortfolioData();
  res.json(portfolioData.projects);
});

// Contact form endpoint (simplified for Vercel)
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      error: 'All fields are required' 
    });
  }

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Please provide a valid email address' 
    });
  }

  // Validate message length
  if (message.length < 10) {
    return res.status(400).json({ 
      error: 'Message should be at least 10 characters long' 
    });
  }

  try {
    // Log the message details (in a real implementation, you would send an email)
    console.log('Contact form submission received:', { name, email, subject, message });
    
    // In Vercel environment, email sending might require additional setup
    // For now, we'll return a success message
    res.status(200).json({ 
      message: 'Message received! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);

    res.status(500).json({ 
      error: 'Failed to process your message. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// CV download endpoint
app.get('/api/cv', (req, res) => {
  // In a real implementation, you would serve an actual CV file
  // For now, we'll send a mock response that would trigger a download

  res.status(200).json({
    message: 'CV download endpoint',
    available: true,
    lastUpdated: new Date().toISOString()
  });
});

// Serve CV file (uncomment and update path when you have an actual CV file)
// app.get('/cv', (req, res) => {
//   res.download(path.join(__dirname, 'CV_Tuyishime_Martin.pdf'), 'Tuyishime_Martin_CV.pdf');
// });

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: 'The requested resource does not exist.'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

const server = app.listen(PORT, () => {
  console.log(`\n martin's Portfolio Server is running on http://localhost:${PORT}`);
  console.log(`✓ Server time: ${new Date().toISOString()}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ Ready to connect!\n`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

// Export for potential use in tests
module.exports = { app, server, getPortfolioData: () => {
  return {
    name: 'Tuyishime Martin',
    title: 'Web Developer & AI/ML Engineer',
    email: 'tuyishimemartin007@gmail.com',
    location: 'Dowa, Malawi',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/tuyishime-martin-04532932a',
      github: 'https://github.com/tuyishime812',
      twitter: 'https://x.com/Tuyishimecrypto',
      facebook: 'https://www.facebook.com/profile.php?id=100086219627900'
    },
    projects: [
      {
        id: 1,
        name: 'Mlimi Smart',
        description: 'An intelligent digital agriculture platform that empowers smallholder farmers with real-time information, advisory services, and market opportunities using AI-driven tools.',
        technologies: ['Python', 'TensorFlow', 'PyTorch', 'TypeScript', 'TailwindCSS'],
        image: '/mlimi-smart.png',
        category: 'AI/ML',
        github: '#',
        live: 'https://mlimi-smart1.vercel.app/'
      },
      {
        id: 2,
        name: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with payment processing and inventory management.',
        technologies: ['JavaScript', 'Node.js', 'MongoDB', 'React'],
        image: 'https://placehold.co/600x400/8b5cf6/white?text=Web+App',
        category: 'Web Development',
        github: '#',
        live: '#'
      },
      {
        id: 3,
        name: 'Virtual Story Generator',
        description: 'An AI-powered platform that creates personalized stories supporting multiple languages including Swahili, Chichewa, Kinyarwanda, Yao, and English.',
        technologies: ['Python', 'JavaScript', 'AI/ML'],
        image: '/Virtula_story.png',
        category: 'AI/ML',
        github: '#',
        live: 'https://virtual-story-generator.vercel.app/'
      }
    ],
    skills: {
      technical: [
        { name: 'Web Development', level: 56, category: 'Frontend/Backend' },
        { name: 'JavaScript/React', level: 60, category: 'Frontend' },
        { name: 'Python/AI/ML', level: 42, category: 'AI/ML' },
        { name: 'Cloud Services', level: 70, category: 'DevOps' },
        { name: 'UI/UX Design', level: 65, category: 'Design' }
      ],
      professional: [
        { name: 'Problem Solving', level: 70 },
        { name: 'Communication', level: 85 },
        { name: 'Innovation', level: 92 },
        { name: 'Leadership', level: 75 }
      ]
    },
    experience: [
      {
        title: 'Senior Web Developer',
        company: 'Tech Solutions Inc.',
        period: '2022 - Present',
        description: 'Led development of scalable web applications for enterprise clients.'
      },
      {
        title: 'AI/ML Engineer',
        company: 'Data Insights Co.',
        period: '2020 - 2022',
        description: 'Developed machine learning models for predictive analytics.'
      },
      {
        title: 'Full Stack Developer',
        company: 'StartUp Ventures',
        period: '2018 - 2020',
        description: 'Built and maintained web applications using modern technologies.'
      }
    ],
    education: [
      {
        degree: 'MSc in Computer Science',
        institution: 'University of Technology',
        year: '2018'
      },
      {
        degree: 'BSc in Software Engineering',
        institution: 'State University',
        year: '2016'
      }
    ],
    services: [
      'Web Development',
      'AI/ML Solutions',
      'Data Analytics',
      'Consulting',
      'UI/UX Design',
      'Technical Writing'
    ]
  };
}};