# Use Node.js as the base image
FROM node:16

# Install dependencies for Puppeteer and Chromium
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxcomposite1 \
    libxrandr2 \
    libasound2 \
    fonts-liberation \
    libappindicator3-1 \
    libgbm1 \
    && apt-get clean

# Install Google Chrome (to use with Puppeteer)
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb \
    && apt-get install -y -f \
    && rm google-chrome-stable_current_amd64.deb

# Set the working directory
WORKDIR /app

# Copy application files
COPY . .

# Install Node.js dependencies
RUN npm install

# Install Puppeteer browsers (optional if you install Chrome manually)
# RUN npx puppeteer browsers install chrome

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
