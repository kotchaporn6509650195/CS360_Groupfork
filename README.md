# CS360 1/2567 Term Project: Ecomify

## Group Information

- **Group Name:** หมูกรอบหมด
  
## Members

- Kotchaporn Meenarong 6509650195
- Korakrit Pongpanjasil 6509650203
- Jiratya Thangchun 6509650278
- Techit Chanlee 6509650419


## Project Goal

Ecomify is an e-commerce web application designed for businesses that want to easily create and manage their online stores. The purpose of this app is to allow business owners to efficiently and conveniently manage their online stores. Ecomify solves the problem of the complexity of managing online stores and the high costs associated with using large e-commerce platforms. The concept of Ecomify is to make e-commerce simple and accessible for everyone.

### Features

- User Register
- User Login
- User Reset Password
- Product Search
- Shopping Cart
- Categories
  
### Technologies Used

- **Backend:** Strapi V4
- **Frontend:** React.js
- **Hosting/Deployment:** AWS EC2
- **Database:** SQLite
  
## How to deploy and run the project manually

1.สร้าง AWS EC2

**SSH**:
   - **Type**: SSH
   - **Protocol**: TCP
   - **Port Range**: 22
   - **Source**: `0.0.0.0/0` 

   **Custom TCP**:
   - **Type**: Custom TCP Rule
   - **Protocol**: TCP
   - **Port Range**: 1337
   - **Source**: `0.0.0.0/0`

   **Custom TCP**:
   - **Type**: Custom TCP Rule
   - **Protocol**: TCP
   - **Port Range**: 3000
   - **Source**: `0.0.0.0/0`
2.ติดตั้ง Node.js และ npm
```bash
cd ~
sudo yum update -y
...
sudo yum groupinstall 'Development Tools' -y
...
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nsolid
...
node -v && npm -v
```
3.ติดตั้ง Git
```bash
sudo yum install -y git
...
git --version
```
4.การนำเข้า Project จาก GitHub
```bash
git clone https://github.com/techit6509650419/CS360_Project.git
...
cd CS360_Project
```
5.ติดตั้ง dependencies ของไฟล์ backend
```bash
cd backend
...
npm install
```
5.ติดตั้ง dependencies ของไฟล์ client
```bash
cd client
...
npm install
```
6.ติดตั้ง PM2 Runtime
```bash
cd ~
...
npm install pm2@latest -g
```
7.แก้ไข ecosystem.config.js
```bash
pm2 init
...
sudo nano ecosystem.config.js
...
#เพิ่มข้อมูล
module.exports = {
  apps: [
    {
      name: 'ชื่อโปรเจกต์', 
      cwd: '/home/ec2-user/เส้นทางไปยังโปรเจกต์', 
      script: 'yarn', 
      args: 'start', 
      env: {
        APP_KEYS: 'Key จาก .env ในโปรเจกต์ที่รันบนเครื่องของเรา',
        API_TOKEN_SALT: 'Salt จาก .env ในโปรเจกต์ที่รันบนเครื่องของเรา',
        ADMIN_JWT_SECRET: 'Admin Secret จาก .env ในโปรเจกต์ที่รันบนเครื่องของเรา',
        JWT_SECRET: 'Secret จาก .env ในโปรเจกต์ที่รันบนเครื่องของเรา',
        NODE_ENV: 'production',
        DATABASE_CLIENT: 'sqlite',
        DATABASE_FILENAME: '.tmp/data.db'
      },
    },
  ],
};
```
8. Start PM2 ให้ Strapi ทำงาน 
```bash
pm2 start ecosystem.config.js
```
9. Start Client
```bash
cd client
...
npm start
```

  
## How to deploy and run the project using the provided bash script [Specify the bash script path in the repo]

1.การนำเข้า Bash Script จาก GitHub
2.ตั้งค่าสิทธิ์ให้กับไฟล์สคริปต์
```bash
chmod +x setup-node-server.sh
```
3.รันสคริปต์
```bash
./Deploy.sh
```
  
[ภาพ screen capture ของหน้าเว็บแอปพลิเคชันซึ่ง deploy ไว้บน EC2]
