# Use Node.js as the base image
FROM node:16

# Install Puppeteer dependencies and Chromium
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxcomposite1 \
    libxrandr2 \
    libasound2 \
    fonts-liberation \
    wget \
    ca-certificates \
    --no-install-recommends && \
    # Download and install Chromium
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg -i google-chrome-stable_current_amd64.deb && \
    apt-get install -f -y && \
    rm google-chrome-stable_current_amd64.deb

# Set the working directory
WORKDIR /app

# Copy application files
COPY . .

# Install Node.js dependencies
RUN npm install

# Install Puppeteer browsers
RUN npx puppeteer browsers install chrome

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
