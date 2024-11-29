# ใช้ Node.js เป็น base image
FROM node:20

# ตั้งค่า working directory
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install --force

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# สร้างไฟล์ .env โดยสุ่มค่าต่าง ๆ
RUN echo "HOST=0.0.0.0" >> .env && \
    echo "PORT=1337" >> .env && \
    echo "APP_KEYS=$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32)" >> .env && \
    echo "API_TOKEN_SALT=$(openssl rand -base64 16)" >> .env && \
    echo "ADMIN_JWT_SECRET=$(openssl rand -base64 32)" >> .env && \
    echo "TRANSFER_TOKEN_SALT=$(openssl rand -base64 16)" >> .env && \
    echo "# Database" >> .env && \
    echo "DATABASE_CLIENT=sqlite" >> .env && \
    echo "DATABASE_FILENAME=.tmp/data.db" >> .env && \
    echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env

# เปิด port ที่ต้องการ
EXPOSE 1337

# รันแอปพลิเคชัน
CMD ["npm", "run", "develop"]
