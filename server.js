
const express = require('express');
const app = express();
//const execSync = require('child_process').execSync;   Import execSync
const PORT = process.env.PORT || 3000;


const cron = require('node-cron');


const puppeteer = require('puppeteer-core');
const { execSync } = require('child_process');
const path = require('path');
console.log(puppeteer.executablePath());
async function getExecutablePath() {
  try {
    // Try checking for Chromium or Google Chrome using `which` command
    const possiblePaths = [
      'google-chrome-stable',
      'chromium',
      'chromium-browser'
    ];

    for (const browser of possiblePaths) {
      try {
        // Run the `which` command to locate the browser
        const path = execSync(`which ${browser}`).toString().trim();
        if (path) {
          console.log(`Found browser at: ${path}`);
          return path; // Return the first valid path
        }
      } catch (error) {
        // Continue to the next browser path if `which` fails
        console.log(`Browser not found for: ${browser}`);
      }
    }

    throw new Error('Chromium or Google Chrome not found at known paths');
  } catch (error) {
    console.error('Error finding Chromium executable:', error);
    throw error;
  }
}


async function automateLogin() {
  try {
    const executablePath = await getExecutablePath(); // Get the correct executable path dynamically
    console.log('Using Chrome executable at:', executablePath);

  const browser = await puppeteer.launch({
  executablePath, // Use dynamically detected executable path
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--disable-extensions',
    '--disable-background-networking',
    '--disable-default-apps',
    '--disable-sync',
    '--hide-scrollbars',
    '--mute-audio',
    '--no-first-run',
    '--disable-notifications',
    '--window-size=1920,1080',
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





