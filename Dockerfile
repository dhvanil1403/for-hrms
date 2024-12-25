# Use Node.js as the base image
FROM node:16

# Install dependencies required for Puppeteer and Chromium
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    gnupg \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxcomposite1 \
    libxrandr2 \
    libasound2 \
    fonts-liberation \
    libappindicator3-1 \
    libindicator7 \
    libgnome-keyring0 \
    chromium

# Set the working directory
WORKDIR /app

# Copy application files
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
