# ใช้ Node.js เป็น base image
FROM node:20

# ตั้งค่า working directory
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY client/package*.json ./

# ติดตั้ง dependencies
RUN npm install --force

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY client/public ./public
COPY client/src ./src
COPY client/babel.config.js ./babel.config.js

# สร้างไฟล์ .env 
RUN echo "REACT_APP_DEV_URL=http://localhost:1337" >> .env && \
    echo "REACT_APP_STRIPE_APP_KEY=dummy_key" >> .env && \
    echo "REACT_APP_STRIPE_PUBLISHABLE_KEY=dummy_key" >> .env

# Build the app
RUN npm run build

# ติดตั้ง serve เพื่อ serve static files
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the app using serve
CMD ["serve", "-s", "build", "-l", "3000"]