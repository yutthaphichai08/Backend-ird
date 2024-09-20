# ใช้ Node.js เป็นฐาน
FROM node:16

# ตั้งค่า working directory
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ที่เหลือไปยัง container
COPY . .

# เปิดพอร์ตที่ใช้
EXPOSE 3000

# รันแอป
CMD ["node", "app.js"]
