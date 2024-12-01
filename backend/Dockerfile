# ใช้ Node.js เป็น base image
FROM node:18-alpine AS build

# กำหนด Working Directory
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY backend/package.json backend/package-lock.json ./

# ติดตั้ง dependencies
RUN npm install --force

# คัดลอกไฟล์โค้ดทั้งหมด
COPY backend/ .

# สร้างไฟล์ .env โดยสุ่มค่าต่าง
RUN apk add --no-cache openssl && \
    echo "HOST=0.0.0.0" >> .env && \
    echo "PORT=1337" >> .env && \
    echo "APP_KEYS=$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32)" >> .env && \
    echo "API_TOKEN_SALT=$(openssl rand -base64 16)" >> .env && \
    echo "ADMIN_JWT_SECRET=$(openssl rand -base64 32)" >> .env && \
    echo "TRANSFER_TOKEN_SALT=$(openssl rand -base64 16)" >> .env && \
    echo "# Database" >> .env && \
    echo "DATABASE_CLIENT=sqlite" >> .env && \
    echo "DATABASE_FILENAME=.tmp/data.db" >> .env && \
    echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env

RUN cat .env
# สร้างไฟล์ build (ใช้สำหรับ Production)
RUN npm run build

# ใช้ Alpine Linux เพื่อรันแอปใน Production
FROM node:18-alpine

# กำหนด Working Directory
WORKDIR /usr/src/app

# คัดลอก Dependencies จาก stage build มา
COPY --from=build /usr/src/app/node_modules ./node_modules

# คัดลอกไฟล์โค้ดทั้งหมด (รวมไฟล์ build)
COPY --from=build /usr/src/app ./

# เปิดพอร์ต (Strapi ใช้พอร์ตเริ่มต้น 1337)
EXPOSE 1337

# เริ่มแอป Strapi
CMD ["npm", "start"]