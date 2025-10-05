import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Nodemailer configuration with hardcoded credentials
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

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email transporter verification failed:', error);
  } else {
    console.log('✅ Email transporter ready');
  }
});

// Book a call endpoint
router.post('/book-call', async (req, res) => {
  try {
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

    // Validate required fields
    if (!name || !email || !selectedDate || !selectedTime) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, date, and time are required'
      });
    }

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

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', info.messageId);
    
    res.json({
      success: true,
      message: 'Call booking submitted successfully! We\'ll be in touch shortly.',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send booking request. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

export { router as bookCallRoute };
