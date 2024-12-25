
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;


const cron = require('node-cron');

const puppeteer = require('puppeteer-core');

async function automateLogin() {
  try {
      // Get the correct executable path for Chrome
    const executablePath = execSync('which google-chrome-stable').toString().trim();

    const browser = await puppeteer.launch({
      executablePath: executablePath, // Use the dynamic path of Chrome
      headless: true, // Run in headless mode
      args: [
        '--no-sandbox',  // Disable sandboxing for cloud environments like Render
        '--disable-setuid-sandbox',
        '--disable-gpu', // Disable GPU hardware acceleration
        '--remote-debugging-port=9222', // For debugging if needed
      ],
    });
    const page = await browser.newPage();

    // Navigate to the login page
    await page.goto('https://aekads.greythr.com/uas/portal/auth/', { waitUntil: 'domcontentloaded' });
    console.log('Login page loaded.');

    // Enter login credentials
    await page.waitForSelector('#username');
    await page.type('#username', 'AEK006');

    await page.waitForSelector('#password');
    await page.type('#password', 'dhvanil1403@');

    await page.click('button[type="submit"]');
    console.log('Login form submitted.');

    // Wait for navigation to home page
    await page.waitForFunction(
      () => window.location.href === 'https://aekads.greythr.com/v3/portal/ess/home',
      { timeout: 15000 } // Adjust timeout as needed
    );
    console.log('Home page loaded.');
    // console.log('Home page loaded.');

    // Ensure the "Sign Out" button is visible
await page.waitForSelector('gt-button[shade="primary"].hydrated', { visible: true, timeout: 10000 });
console.log('Sign Out button is visible.');

// Click the "Sign Out" button
await page.click('gt-button[shade="primary"].hydrated');
console.log('Sign Out button clicked.');



    // Wait for navigation after logout
    // await page.waitForNavigation({ waitUntil: 'networkidle0' });
    console.log('Successfully logged out.');

    // Send success email
     //  await sendEmail('Logout Success');

    // Close the browser
    await browser.close();
    console.log('Browser closed successfully.');
  } catch (error) {
    console.error('Error during login automation:', error);

    // Send failure email
    // await sendEmail('Logout Failure');
  }
}

async function sendEmail() {
  // Prepare the email content
  const emailText = `
    <html>
      <body>
        <p>Dear <strong></strong>,</p>
        <p>We data are done.</p>
        <p>Best regards,</p>
        <p>Your Company</p>
      </body>
    </html>
  `;

  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to another provider
    auth: {
      user: 'aekads.otp@gmail.com',  // Your email address
      pass: 'ntkp cloo wjnx atep',   // Your email password or App password
    },
  });

  // Mail options
  const mailOptions = {
    from: 'aekads.otp@gmail.com',
    to: 'dhvanil1403@gmail.com',
    subject: `Notification for dhvanil`,
    html: emailText,  // Send the notification email
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification sent successfully.');
  } catch (error) {
    console.error('Error sending notification:', error);
    throw new Error('Error sending notification');
  }
}

automateLogin();







// Schedule the job for 09:03 IST
cron.schedule('3 9 * * *', () => {
  console.log('Executing login automation at 09:03 IST...');
  automateLogin();
}, {
  timezone: "Asia/Kolkata"
});

// Schedule the job for 18:05 IST
cron.schedule('45 16 * * *', () => {
  console.log('Executing login automation at 18:05 IST...');
  automateLogin();
}, {
  timezone: "Asia/Kolkata"
});
// Sync database and start server

 
    console.log("Server is running on port 3000");
 app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});





