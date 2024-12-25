# Use Node.js as the base image
FROM node:16

# Install necessary dependencies
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
    curl \
    && apt-get clean

# Install Google Chrome
RUN curl -sSL https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o google-chrome.deb \
    && dpkg -i google-chrome.deb \
    && apt-get install -y -f \
    && rm google-chrome.deb

# Check Chrome Installation Path
RUN which google-chrome-stable
RUN google-chrome-stable --version

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
