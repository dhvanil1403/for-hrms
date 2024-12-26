FROM node:18-slim

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
  libasound2 \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set Chromium executable path
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

# Add a health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl --fail http://localhost:3000 || exit 1

# Run as non-root user
RUN useradd --create-home appuser
USER appuser

# Start the app
CMD ["node", "server.js"]
