FROM node:16-slim

# Install Chromium and dependencies
RUN apt-get update && apt-get install -y \
  chromium \
  libnss3 \
  libatk1.0-0 \
  libx11-xcb1 \
  libxcomposite1 \
  libxrandr2 \
  libcups2 \
  libpangocairo-1.0-0 \
  libxdamage1 \
  libxshmfence1 \
  libgbm1 \
  libasound2

# Set Chromium executable path
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Install dependencies
WORKDIR /app
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

# Start the app
CMD ["node", "server.js"]
