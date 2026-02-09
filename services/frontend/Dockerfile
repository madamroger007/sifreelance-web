FROM node:20-alpine

WORKDIR /app

# Copy package files (skip pnpm-workspace.yaml in container)
COPY package.json ./

# Install dependencies using npm (simpler for container builds)
RUN npm install

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run dev server (host flag for Docker access)
CMD ["npm", "run", "dev", "--", "--host"]