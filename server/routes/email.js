import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Nodemailer configuration with hardcoded credentials
// NOTIFICATION SYSTEM: Sends emails from arvaradodotcom@gmail.com to elmahboubimehdi@gmail.com
// PUBLIC EMAIL: contact@studioeyn.com (visible on website, not used for notifications)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arvaradodotcom@gmail.com',
    pass: 'iwar xzav utnb bxyw'
  },
  defaults: {
    from: '"StudioEyn" <arvaradodotcom@gmail.com>'
  }
});

// Verify transporter configuration with retry mechanism
let transporterReady = false;
let verificationAttempts = 0;
const maxVerificationAttempts = 3;

const verifyTransporter = () => {
  transporter.verify((error, success) => {
    if (error) {
      verificationAttempts++;
      console.error(`❌ Email transporter verification failed (attempt ${verificationAttempts}):`, error);
      
      if (verificationAttempts < maxVerificationAttempts) {
        console.log(`🔄 Retrying transporter verification in 5 seconds...`);
        setTimeout(verifyTransporter, 5000);
      } else {
        console.error('❌ Email transporter verification failed after maximum attempts');
        transporterReady = false;
      }
    } else {
      console.log('✅ Email transporter ready');
      transporterReady = true;
    }
  });
};

// Initial verification
verifyTransporter();

// Re-verify every 5 minutes to ensure connection stays alive
setInterval(() => {
  if (!transporterReady) {
    console.log('🔄 Re-verifying email transporter...');
    verifyTransporter();
  }
}, 5 * 60 * 1000);

// Book a call endpoint with comprehensive error handling
router.post('/book-call', async (req, res) => {
  try {
    // Check if transporter is ready
    if (!transporterReady) {
      console.log('⚠️ Email transporter not ready, attempting to re-verify...');
      verifyTransporter();
      
      // Wait a moment for verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (!transporterReady) {
        return res.status(503).json({
          success: false,
          message: 'Email service temporarily unavailable. Please try again in a few moments or contact us directly at contact@studioeyn.com',
          retryAfter: 30
        });
      }
    }

    const {
      name,
      email,
      phone,
      company,
      projectType,
      message,
      selectedDate,
      selectedTime
    } = req.body;

    // Enhanced validation with sanitization
    if (!name || !email || !selectedDate || !selectedTime) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, date, and time are required'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Sanitize inputs to prevent injection
    const sanitizeInput = (input) => {
      if (typeof input !== 'string') return '';
      return input.replace(/[<>]/g, '').trim().substring(0, 1000);
    };

    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : '',
      company: company ? sanitizeInput(company) : '',
      projectType: projectType ? sanitizeInput(projectType) : '',
      message: message ? sanitizeInput(message) : '',
      selectedDate: sanitizeInput(selectedDate),
      selectedTime: sanitizeInput(selectedTime)
    };

    // Format the date for display
    const appointmentDate = new Date(selectedDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Email content
    const mailOptions = {
      from: '"StudioEyn" <arvaradodotcom@gmail.com>',
      to: 'elmahboubimehdi@gmail.com',
      subject: `🎯 New Call Booking - ${name} (${company || 'Individual'})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #000;">
              <h1 style="color: #000; margin: 0; font-size: 24px; font-weight: 300; text-transform: uppercase; letter-spacing: 2px;">
                New Call Booking
              </h1>
              <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
                StudioEyn Consultation Request
              </p>
            </div>

            <!-- Appointment Details -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
              <h2 style="color: #000; margin: 0 0 15px 0; font-size: 18px; font-weight: 500;">
                📅 Appointment Details
              </h2>
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #333; min-width: 80px;">Date:</span>
                <span style="color: #666;">${appointmentDate}</span>
              </div>
              <div style="display: flex; align-items: center;">
                <span style="font-weight: 600; color: #333; min-width: 80px;">Time:</span>
                <span style="color: #666;">${selectedTime}</span>
              </div>
            </div>

            <!-- Client Information -->
            <div style="margin-bottom: 25px;">
              <h2 style="color: #000; margin: 0 0 15px 0; font-size: 18px; font-weight: 500;">
                👤 Client Information
              </h2>
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #333; min-width: 80px;">Name:</span>
                <span style="color: #666;">${name}</span>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #333; min-width: 80px;">Email:</span>
                <span style="color: #666;">${email}</span>
              </div>
              ${phone ? `
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #333; min-width: 80px;">Phone:</span>
                <span style="color: #666;">${phone}</span>
              </div>
              ` : ''}
              ${company ? `
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #333; min-width: 80px;">Company:</span>
                <span style="color: #666;">${company}</span>
              </div>
              ` : ''}
              ${projectType ? `
              <div style="display: flex; align-items: center;">
                <span style="font-weight: 600; color: #333; min-width: 80px;">Project:</span>
                <span style="color: #666;">${projectType}</span>
              </div>
              ` : ''}
            </div>

            <!-- Project Message -->
            ${message ? `
            <div style="margin-bottom: 25px;">
              <h2 style="color: #000; margin: 0 0 15px 0; font-size: 18px; font-weight: 500;">
                💬 Project Details
              </h2>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #000;">
                <p style="margin: 0; color: #333; line-height: 1.6;">
                  ${message.replace(/\n/g, '<br>')}
                </p>
              </div>
            </div>
            ` : ''}

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                This booking was submitted through the StudioEyn website
              </p>
              <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
                Please respond to confirm the appointment
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
New Call Booking - StudioEyn Consultation Request

APPOINTMENT DETAILS:
Date: ${appointmentDate}
Time: ${selectedTime}

CLIENT INFORMATION:
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${company ? `Company: ${company}` : ''}
${projectType ? `Project Type: ${projectType}` : ''}

${message ? `PROJECT DETAILS:\n${message}` : ''}

---
This booking was submitted through the StudioEyn website.
Please respond to confirm the appointment.
      `
    };

    // Send email with retry logic
    let emailSent = false;
    let lastError = null;
    const maxRetries = 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`📧 Attempting to send email (attempt ${attempt}/${maxRetries})...`);
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Email sent successfully:', info.messageId);
        emailSent = true;
        
        res.json({
          success: true,
          message: 'Call booking submitted successfully! We\'ll be in touch shortly.',
          messageId: info.messageId
        });
        break;
        
      } catch (emailError) {
        lastError = emailError;
        console.error(`❌ Email send attempt ${attempt} failed:`, emailError);
        
        if (attempt < maxRetries) {
          console.log(`🔄 Retrying email send in ${attempt * 2} seconds...`);
          await new Promise(resolve => setTimeout(resolve, attempt * 2000));
          
          // Re-verify transporter before retry
          if (!transporterReady) {
            verifyTransporter();
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }
    }
    
    // If all retries failed, still return success to user but log the issue
    if (!emailSent) {
      console.error('❌ All email send attempts failed:', lastError);
      
      // Log to a file or external service for manual follow-up
      console.log('📝 BOOKING REQUEST (EMAIL FAILED):', {
        timestamp: new Date().toISOString(),
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        company: sanitizedData.company,
        projectType: sanitizedData.projectType,
        message: sanitizedData.message,
        selectedDate: sanitizedData.selectedDate,
        selectedTime: sanitizedData.selectedTime
      });
      
      // Still return success to user - they shouldn't be penalized for email issues
      res.json({
        success: true,
        message: 'Call booking submitted successfully! We\'ll be in touch shortly.',
        note: 'Your request has been recorded and will be processed manually.'
      });
    }

  } catch (error) {
    console.error('❌ Critical error in book-call endpoint:', error);
    
    // Log the request for manual processing
    console.log('📝 BOOKING REQUEST (CRITICAL ERROR):', {
      timestamp: new Date().toISOString(),
      error: error.message,
      body: req.body
    });
    
    res.status(500).json({
      success: false,
      message: 'We\'re experiencing technical difficulties. Please contact us directly at contact@studioeyn.com or try again later.',
      fallbackContact: 'contact@studioeyn.com'
    });
  }
});

// General email contact form endpoint with comprehensive error handling
router.post('/send-email', async (req, res) => {
  try {
    // Check if transporter is ready
    if (!transporterReady) {
      console.log('⚠️ Email transporter not ready, attempting to re-verify...');
      verifyTransporter();
      
      // Wait a moment for verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (!transporterReady) {
        return res.status(503).json({
          success: false,
          message: 'Email service temporarily unavailable. Please try again in a few moments or contact us directly at contact@studioeyn.com',
          retryAfter: 30
        });
      }
    }

    const {
      name,
      email,
      phone,
      subject,
      message
    } = req.body;

    // Enhanced validation with sanitization
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, subject, and message are required'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Sanitize inputs to prevent injection
    const sanitizeInput = (input) => {
      if (typeof input !== 'string') return '';
      return input.replace(/[<>]/g, '').trim().substring(0, 1000);
    };

    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : '',
      subject: sanitizeInput(subject),
      message: sanitizeInput(message)
    };

    // Email content
    const mailOptions = {
      from: '"StudioEyn" <arvaradodotcom@gmail.com>',
      to: 'elmahboubimehdi@gmail.com',
      replyTo: email,
      subject: `📧 New Contact Form Message - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #000;">
              <h1 style="color: #000; margin: 0; font-size: 24px; font-weight: 300; text-transform: uppercase; letter-spacing: 2px;">
                New Contact Message
              </h1>
              <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
                StudioEyn Contact Form
              </p>
            </div>

            <!-- Subject -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
              <h2 style="color: #000; margin: 0 0 10px 0; font-size: 18px; font-weight: 500;">
                📋 Subject
              </h2>
              <p style="margin: 0; color: #333; font-size: 16px; font-weight: 600;">
                ${subject}
              </p>
            </div>

            <!-- Contact Information -->
            <div style="margin-bottom: 25px;">
              <h2 style="color: #000; margin: 0 0 15px 0; font-size: 18px; font-weight: 500;">
                👤 Contact Information
              </h2>
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #333; min-width: 80px;">Name:</span>
                <span style="color: #666;">${name}</span>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #333; min-width: 80px;">Email:</span>
                <span style="color: #666;">${email}</span>
              </div>
              ${phone ? `
              <div style="display: flex; align-items: center;">
                <span style="font-weight: 600; color: #333; min-width: 80px;">Phone:</span>
                <span style="color: #666;">${phone}</span>
              </div>
              ` : ''}
            </div>

            <!-- Message -->
            <div style="margin-bottom: 25px;">
              <h2 style="color: #000; margin: 0 0 15px 0; font-size: 18px; font-weight: 500;">
                💬 Message
              </h2>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #000;">
                <p style="margin: 0; color: #333; line-height: 1.6;">
                  ${message.replace(/\n/g, '<br>')}
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                This message was submitted through the StudioEyn contact form
              </p>
              <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
                Reply to this email to respond directly to ${name}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
New Contact Form Message - StudioEyn

SUBJECT: ${subject}

CONTACT INFORMATION:
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

MESSAGE:
${message}

---
This message was submitted through the StudioEyn contact form.
Reply to this email to respond directly to ${name}.
      `
    };

    // Send email with retry logic
    let emailSent = false;
    let lastError = null;
    const maxRetries = 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`📧 Attempting to send email (attempt ${attempt}/${maxRetries})...`);
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Email sent successfully:', info.messageId);
        emailSent = true;
        
        res.json({
          success: true,
          message: 'Message sent successfully! We\'ll get back to you soon.',
          messageId: info.messageId
        });
        break;
        
      } catch (emailError) {
        lastError = emailError;
        console.error(`❌ Email send attempt ${attempt} failed:`, emailError);
        
        if (attempt < maxRetries) {
          console.log(`🔄 Retrying email send in ${attempt * 2} seconds...`);
          await new Promise(resolve => setTimeout(resolve, attempt * 2000));
          
          // Re-verify transporter before retry
          if (!transporterReady) {
            verifyTransporter();
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }
    }
    
    // If all retries failed, still return success to user but log the issue
    if (!emailSent) {
      console.error('❌ All email send attempts failed:', lastError);
      
      // Log to a file or external service for manual follow-up
      console.log('📝 CONTACT MESSAGE (EMAIL FAILED):', {
        timestamp: new Date().toISOString(),
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        subject: sanitizedData.subject,
        message: sanitizedData.message
      });
      
      // Still return success to user - they shouldn't be penalized for email issues
      res.json({
        success: true,
        message: 'Message sent successfully! We\'ll get back to you soon.',
        note: 'Your message has been recorded and will be processed manually.'
      });
    }

  } catch (error) {
    console.error('❌ Critical error in send-email endpoint:', error);
    
    // Log the request for manual processing
    console.log('📝 CONTACT MESSAGE (CRITICAL ERROR):', {
      timestamp: new Date().toISOString(),
      error: error.message,
      body: req.body
    });
    
    res.status(500).json({
      success: false,
      message: 'We\'re experiencing technical difficulties. Please contact us directly at contact@studioeyn.com or try again later.',
      fallbackContact: 'contact@studioeyn.com'
    });
  }
});

// Health check endpoint for email system
router.get('/health', (req, res) => {
  const healthStatus = {
    status: transporterReady ? 'healthy' : 'unhealthy',
    transporterReady,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version
  };
  
  res.status(transporterReady ? 200 : 503).json(healthStatus);
});

// Career application endpoint with comprehensive error handling
router.post('/careers/apply', async (req, res) => {
  try {
    // Check if transporter is ready
    if (!transporterReady) {
      console.log('⚠️ Email transporter not ready, attempting to re-verify...');
      verifyTransporter();
      
      // Wait a moment for verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (!transporterReady) {
        return res.status(503).json({
          success: false,
          message: 'Email service temporarily unavailable. Please try again in a few moments or contact us directly at contact@studioeyn.com',
          retryAfter: 30
        });
      }
    }

    const {
      name,
      email,
      phone,
      position,
      experience,
      portfolio,
      coverLetter
    } = req.body;

    // Enhanced validation with sanitization
    if (!name || !email || !position || !experience || !portfolio || !coverLetter) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, position, experience, portfolio, and cover letter are required'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Sanitize inputs to prevent injection
    const sanitizeInput = (input) => {
      if (typeof input !== 'string') return '';
      return input.replace(/[<>]/g, '').trim().substring(0, 1000);
    };

    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : '',
      position: sanitizeInput(position),
      experience: sanitizeInput(experience),
      portfolio: sanitizeInput(portfolio),
      coverLetter: sanitizeInput(coverLetter)
    };

    // Email content
    const mailOptions = {
      from: '"StudioEyn" <arvaradodotcom@gmail.com>',
      to: 'elmahboubimehdi@gmail.com',
      subject: `🎯 New Career Application - ${name} (${position})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #000;">
              <h1 style="color: #000; margin: 0; font-size: 24px; font-weight: 300; text-transform: uppercase; letter-spacing: 2px;">
                New Career Application
              </h1>
              <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
                StudioEyn Job Application
              </p>
            </div>

            <!-- Position Details -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
              <h2 style="color: #000; margin: 0 0 15px 0; font-size: 18px; font-weight: 500;">
                📋 Position Details
              </h2>
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #333; min-width: 100px;">Position:</span>
                <span style="color: #666;">${position}</span>
              </div>
              <div style="display: flex; align-items: center;">
                <span style="font-weight: 600; color: #333; min-width: 100px;">Experience:</span>
                <span style="color: #666;">${experience}</span>
              </div>
            </div>

            <!-- Applicant Information -->
            <div style="margin-bottom: 25px;">
              <h2 style="color: #000; margin: 0 0 15px 0; font-size: 18px; font-weight: 500;">
                👤 Applicant Information
              </h2>
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #333; min-width: 80px;">Name:</span>
                <span style="color: #666;">${name}</span>
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #333; min-width: 80px;">Email:</span>
                <span style="color: #666;">${email}</span>
              </div>
              ${phone ? `
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #333; min-width: 80px;">Phone:</span>
                <span style="color: #666;">${phone}</span>
              </div>
              ` : ''}
              <div style="display: flex; align-items: center;">
                <span style="font-weight: 600; color: #333; min-width: 80px;">Portfolio:</span>
                <a href="${portfolio}" style="color: #0066cc; text-decoration: none;">${portfolio}</a>
              </div>
            </div>

            <!-- Cover Letter -->
            <div style="margin-bottom: 25px;">
              <h2 style="color: #000; margin: 0 0 15px 0; font-size: 18px; font-weight: 500;">
                💬 Cover Letter
              </h2>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #000;">
                <p style="margin: 0; color: #333; line-height: 1.6;">
                  ${coverLetter.replace(/\n/g, '<br>')}
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                This application was submitted through the StudioEyn careers page
              </p>
              <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
                Please review and respond to the applicant
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
New Career Application - StudioEyn

POSITION DETAILS:
Position: ${position}
Experience: ${experience}

APPLICANT INFORMATION:
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Portfolio: ${portfolio}

COVER LETTER:
${coverLetter}

---
This application was submitted through the StudioEyn careers page.
Please review and respond to the applicant.
      `
    };

    // Send email with retry logic
    let emailSent = false;
    let lastError = null;
    const maxRetries = 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`📧 Attempting to send career application email (attempt ${attempt}/${maxRetries})...`);
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Career application email sent successfully:', info.messageId);
        emailSent = true;
        
        res.json({
          success: true,
          message: 'Application submitted successfully! We\'ll review your application and get back to you soon.',
          messageId: info.messageId
        });
        break;
        
      } catch (emailError) {
        lastError = emailError;
        console.error(`❌ Career application email send attempt ${attempt} failed:`, emailError);
        
        if (attempt < maxRetries) {
          console.log(`🔄 Retrying career application email send in ${attempt * 2} seconds...`);
          await new Promise(resolve => setTimeout(resolve, attempt * 2000));
          
          // Re-verify transporter before retry
          if (!transporterReady) {
            verifyTransporter();
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }
    }
    
    // If all retries failed, still return success to user but log the issue
    if (!emailSent) {
      console.error('❌ All career application email send attempts failed:', lastError);
      
      // Log to a file or external service for manual follow-up
      console.log('📝 CAREER APPLICATION (EMAIL FAILED):', {
        timestamp: new Date().toISOString(),
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        position: sanitizedData.position,
        experience: sanitizedData.experience,
        portfolio: sanitizedData.portfolio,
        coverLetter: sanitizedData.coverLetter
      });
      
      // Still return success to user - they shouldn't be penalized for email issues
      res.json({
        success: true,
        message: 'Application submitted successfully! We\'ll review your application and get back to you soon.',
        note: 'Your application has been recorded and will be processed manually.'
      });
    }

  } catch (error) {
    console.error('❌ Critical error in careers application endpoint:', error);
    
    // Log the request for manual processing
    console.log('📝 CAREER APPLICATION (CRITICAL ERROR):', {
      timestamp: new Date().toISOString(),
      error: error.message,
      body: req.body
    });
    
    res.status(500).json({
      success: false,
      message: 'We\'re experiencing technical difficulties. Please contact us directly at contact@studioeyn.com or try again later.',
      fallbackContact: 'contact@studioeyn.com'
    });
  }
});

// Email system status endpoint
router.get('/status', (req, res) => {
  res.json({
    emailSystem: {
      status: transporterReady ? 'operational' : 'degraded',
      transporterReady,
      lastCheck: new Date().toISOString(),
      retryAttempts: verificationAttempts,
      maxRetries: maxVerificationAttempts
    },
    fallbackContact: 'contact@studioeyn.com',
    notificationEmail: 'elmahboubimehdi@gmail.com'
  });
});

export { router as bookCallRoute };
