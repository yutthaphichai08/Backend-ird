# ใช้ Node.js official image เป็น base image (ในตัวอย่างนี้ใช้เวอร์ชัน 18)
FROM node:18

# ตั้ง working directory ภายใน container
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และ package-lock.json (ถ้ามี) ไปยัง working directory
COPY package*.json ./

# ติดตั้ง dependencies จาก package.json รวมถึง express
RUN npm install

# คัดลอกไฟล์ทั้งหมดจาก local ไปยัง container
COPY . .

# เปิดพอร์ตที่แอปพลิเคชันจะรัน (3000 หรือพอร์ตที่คุณตั้งใน .env)
EXPOSE 3001

# รันคำสั่งเพื่อเริ่มต้นแอป
CMD ["node", "app.js"]
