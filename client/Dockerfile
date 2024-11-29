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
RUN echo "REACT_APP_DEV_URL=http://$PUBLIC_IP:1337" >> .env && \
    echo "REACT_APP_STRIPE_APP_KEY=$(openssl rand -hex 32)" >> .env && \
    echo "REACT_APP_STRIPE_PUBLISHABLE_KEY=$(openssl rand -hex 32)" >> .env

    
# เปิด port ที่ต้องการ
EXPOSE 3000

# รันแอปพลิเคชัน
CMD ["npm", "start"]
