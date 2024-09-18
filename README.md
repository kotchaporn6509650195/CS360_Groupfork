# CS360 1/2567 Term Project: Ecomify

## Group Information

- **Group Name:** หมูกรอบหมด
  
## Members

- Kotchaporn Meenarong 6509650195
- Korakrit Pongpanjasil 6509650203
- Jiratya Thangchun 6509650278
- Techit Chanlee 6509650419


## Project Goal

Ecomify เป็นเว็บแอปพลิเคชันอีคอมเมิร์ซสำหรับ ___ วัตถุประสงค์ของแอปนี้คือการ ___ Ecomify แก้ไขปัญหา ___ แนวคิดของ Ecomify คือการ___ <เด่วมาทำ>

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
  
## How to deploy and run the project using the provided bash script [Specify the bash script path in the repo]

1.
2.
3.
  
[ภาพ screen capture ของหน้าเว็บแอปพลิเคชันซึ่ง deploy ไว้บน EC2]
