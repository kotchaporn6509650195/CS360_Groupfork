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

2.สร้างไฟล์ Bash Script
```bash
touch namefile.sh

#เพิ่มข้อมูล
#!/bin/bash

#install Node.js and npm
install_node(){
    echo "Update the System."
    sudo yum update -y

    echo "Install the required build tools."
    sudo yum groupinstall 'Development Tools' -y

    echo "Installing Node.js..."
    curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
    sudo yum install -y nsolid

    echo "Verify Node.js installation."
    node -v && npm -v
}

#Install Git
install_git(){
    echo "Installing Git..."
    sudo yum install -y git
}

#Check for Node.js and npm
check_node(){
    echo "Checking for Node.js..."
    if ! command -v node &> /dev/null
    then
        echo "Node.js not found."
        install_node
    else
        echo "Node.js is already install."
    fi
}

#Check for Git
check_git(){
    echo "Checking for Git..."
    if ! command -v git &> /dev/null
    then
        echo "Git not found."
        install_git
    else
        echo "Git is already install."
    fi
}

#Install PM2 runtime
Install_pm2() {
    echo "Installing PM2..."
    sudo npm install pm2@latest -g

    echo "Configuring ecosystem.config.js file..."
    pm2 init

    echo "Creating ecosystem.config.js..."
    cat <<EOL > ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: '/home/ec2-user/CS360_Project/backend',
      script: 'npm',
      args: 'start',
      env: {
        APP_KEYS: 'WClWO74fuhZx1LJF+lNmFw==,gDcSr2p1bMaENJ82cbN9VA==,2SXED6C6p0RxGQMf/SHH6g==,X+sMy1DzMTVjnZ7SCWJybg==',
        API_TOKEN_SALT: 'gaD8QX66LWUlDD8HGRmhyA==',
        ADMIN_JWT_SECRET: 'N8ACvVAH79tAWYha5My34Q==',
        JWT_SECRET: 'qrjLUGQL3RAb9G/Knhwq6A==',
        NODE_ENV: 'production',
        DATABASE_CLIENT: 'sqlite',
        DATABASE_FILENAME: '.tmp/data.db'
      },
    },
  ],
};
EOL
    echo "PM2 installation and configuration complete."
}


#Setup Project
setup_project(){
    #Configuration Variables
    REPO_URL="https://github.com/techit6509650419/CS360_Project.git"

    #Check for Node.js and npm
    check_node

    #Check for Git
    check_git

    #Clone the project from GitHub
    echo "Cloning the repository form $REPO_URL..."
    git clone $REPO_URL
    cd CS360_Project

    #Install backend project dependencies
    cd backend
    echo "Installing backeend project dependencies..."
    npm install

    #Install client project denpendencies
    cd ..
    cd client
    echo "Installing client project dependencies..."
    npm install

    cd ..
    #install PM2 Runtime
    Install_pm2
    
    echo "Starting backend..."
    pm2 start ecosystem.config.js

    echo "Starting client..."
    cd client
    npm start

    echo "Project setup completed."

}

setup_project
```
3.เปลี่ยนสิทธ์การเข้าถึง
```bash
chmod +x namefile.sh
```
3.รัน Bash Script
```bash
./namefile.sh
```


   
  
[ภาพ screen capture ของหน้าเว็บแอปพลิเคชันซึ่ง deploy ไว้บน EC2]
