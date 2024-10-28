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

## Setting Up an EC2 Instance

**Application and OS Images:** Amazon Linux 2023 AMI

**Instance type :** t2.medium

**Network setting :** create security group

- Type: `SSH`, Protocol: `TCP`, Port Range `22`, Source: `0.0.0.0/0`
- Type: `Custom TCP Rule`, Protocol: `TCP`, Port Range `1337`, Source: `0.0.0.0/0`
- Type: `Custom TCP Rule`, Protocol: `TCP`, Port Range `3000`, Source: `0.0.0.0/0`

**Configure storage:** 8 Gib gp3 Root volume    

## How to deploy and run the project manually

1.สร้าง AWS EC2 ตามที่ตั้งค่าไว้ และ Connect to EC2 Instance
```bash
ssh -i <your-key.pem> ec2-user@<your-ec2-instance-ip>
```
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
cd ..
...
cd client
...
npm install
```
6.ติดตั้ง PM2 Runtime
```bash
cd ~
...
sudo npm install pm2@latest -g
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
      script: 'npm', 
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
cd CS360_Project
...
cd client
...
npm start
```

  
## How to deploy and run the project using the provided bash script [Specify the bash script path in the repo]

1.สร้าง AWS EC2 ตามที่ตั้งค่าไว้ และ Connect to EC2 Instance
```bash
ssh -i <your-key.pem> ec2-user@<your-ec2-instance-ip>
```
2.สร้างไฟล์ Bash Script
```bash
touch namefile.sh
...
nano namefile.sh
...
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
![image](https://github.com/user-attachments/assets/9ecca414-cedc-40fc-b622-29b7ff8e3ba7)

## Unit and Integration Testing Overview
...
## Setting Up Tests
//คำสั่ง

git clone -b develop https://github.com/techit6509650419/CS360_Project

cd CS360_Project

npm install --force

npm rebuild sqlite3 --force

nano package.json

//แก้โค้ด
{
  "devDependencies": {
    "@babel/preset-env": "^7.25.9",
    "@babel/preset-react": "^7.25.9",
    "@babel/preset-typescript": "^7.25.9",
    "@testing-library/jest-dom": "^6.6.2",
    "@testing-library/react": "^16.0.1",
    "@types/jest": "^29.5.14",
    "babel-jest": "^29.7.0",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "supertest": "^7.0.0"
  },
  "scripts": {
    "test": "jest --coverage",
    "test-front": "jest client/src/tests/Register",
    "test-back": "jest backend/tests/account.test.js"
  },
  "jest": {
    "transform": {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    "transformIgnorePatterns": [
      "node_modules/(?!(uuid)/)"
    ],
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": [
      "@testing-library/jest-dom"
    ],
    "moduleNameMapper": {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy"
    }
  },
  "babel": {
    "presets": [
      "@babel/preset-env",
      [
        "@babel/preset-react",
        {
          "runtime": "automatic"
        }
      ],
      "@babel/preset-typescript"
    ]
  },
  "dependencies": {
    "@strapi/plugin-i18n": "^4.15.0",
    "@strapi/plugin-users-permissions": "^4.15.0",
    "@strapi/strapi": "^4.15.0",
    "express": "^4.21.1",
    "react-router-dom": "^6.27.0",
    "sequelize": "^6.37.5",
    "sqlite3": "^5.1.7"
  }
}

cd CS360_Project/client

nano package.json

//เปลี่ยน test เป็น

"test": "jest --coverage"

mkdir CS360_Project/client/src/tests/

cd CS360_Project/client/src/tests/

touch Register.test.js

nano Register.test.js

//เพิ่ม Automade Test Case
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Register from '../components/Register/Register';
import '@testing-library/jest-dom';

// Mock the global fetch function
global.fetch = jest.fn();

const renderRegister = () => {
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );
};

const mockFetchResponse = (response) => {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => response,
    });
};

describe('Register Component - Unit Tests', () => {
    beforeEach(() => {
        fetch.mockClear(); // Clear previous mock calls before each test
    });

    test('renders the register form', () => {
        renderRegister();

        expect(screen.getByRole('heading', { name: /Register/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    });

    test('shows error message for invalid email format', async () => {
        renderRegister();
        const emailInput = screen.getByLabelText(/Email/i);

        fireEvent.change(emailInput, { target: { value: 'invalidEmailFormat' } });
        fireEvent.blur(emailInput); // Trigger the blur event

        await waitFor(() => {
            expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
        });
    });

    test('shows error for password less than 8 characters', async () => {
        renderRegister();
        const passwordInput = screen.getByLabelText('Password');

        fireEvent.change(passwordInput, { target: { value: 'short' } });
        fireEvent.blur(passwordInput);

        await waitFor(() => {
            expect(screen.getByText(/Password must be at least 8 characters long/i)).toBeInTheDocument();
        });
    });

    test('shows error for password without uppercase letter', async () => {
        renderRegister();
        const passwordInput = screen.getByLabelText('Password');

        fireEvent.change(passwordInput, { target: { value: 'lowercasepassword' } });
        fireEvent.blur(passwordInput);

        await waitFor(() => {
            expect(screen.getByText(/Password must contain at least one uppercase letter/i)).toBeInTheDocument();
        });
    });

    test('shows error for password without a number', async () => {
        renderRegister();
        const passwordInput = screen.getByLabelText('Password');

        fireEvent.change(passwordInput, { target: { value: 'Password!' } });
        fireEvent.blur(passwordInput);

        await waitFor(() => {
            expect(screen.getByText(/Password must contain at least one number/i)).toBeInTheDocument();
        });
    });

    test('shows error when passwords do not match', async () => {
        renderRegister();
        const passwordInput = screen.getByLabelText('Password');
        const confirmPasswordInput = screen.getByLabelText('Confirm Password');

        fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Password2!' } });
        fireEvent.blur(confirmPasswordInput);

        await waitFor(() => {
            expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
        });
    });

    test('shows error when required fields are missing', async () => {
        renderRegister();
        fireEvent.submit(screen.getByRole('button', { name: /Register/i }));

        await waitFor(() => {
            expect(screen.getByText(/Please fill in all required fields/i)).toBeInTheDocument();
        });
    });
});

describe('Register Component - Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mock calls and implementations before each test
    });

    test('checks username availability', async () => {
        renderRegister();

        const usernameInput = screen.getByLabelText(/Username/i);
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.blur(usernameInput);

        await waitFor(() => {
            const errorMessage = screen.queryByText(/Username is already taken/i);
            if (errorMessage) {
                expect(errorMessage).toBeInTheDocument(); // Username is taken
            } else {
                expect(errorMessage).not.toBeInTheDocument(); // Username is available
            }
        });
    });

    test('shows error when username is taken', async () => {
        mockFetchResponse({ data: [{ id: 1, username: 'takenUsername' }] });

        renderRegister();

        const usernameInput = screen.getByLabelText(/Username/i);
        fireEvent.change(usernameInput, { target: { value: 'takenUsername' } });
        fireEvent.blur(usernameInput);

        await waitFor(() => {
            expect(screen.getByText(/Username is already taken/i)).toBeInTheDocument();
        });
    });

    test('successfully registers user and navigates to login', async () => {
        mockFetchResponse({ success: true });

        render(
            <MemoryRouter initialEntries={['/register']}>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'newUsername' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'user@example.com' } });
        fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Password1!' } });
        fireEvent.change(screen.getByLabelText(/^Confirm Password$/i), { target: { value: 'Password1!' } });

        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        await waitFor(() => {
            expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
        });
    });
});

cd ..
cd ..
cd ..
npm run test-fort

//ส่วนของ backEnd
mkdir CS360_Project/backend/tests/
cd CS360_Project/backend/tests/
touch account.test.js
nano account.test.js

//เพิ่มโค้ด automade test
const request = require('supertest');
const app = require('../../backend/mockConfig/server'); // ปรับเส้นทางให้ตรงกับแอป Express ของคุณ
const Account = require('../models/Account');
const sequelize = require('../../backend/mockConfig/database'); // นำเข้าการตั้งค่า sequelize

describe('Integration Tests for Account API', () => {
    beforeAll(async () => {
        
        await Account.sync({ force: true }); // ตั้งค่าฐานข้อมูลใหม่ก่อนการทดสอบ

        // สร้างบัญชีสำหรับการทดสอบ
        await Account.create({
            username: 'testuser1',
            password: 'password123',
            email: 'testuser1@example.com',
        });

        await Account.create({
            username: 'testuser2',
            password: 'password456',
            email: 'testuser2@example.com',
        });
    });

    it('should create a new account', async () => {
        try {
            const newAccount = {
                username: 'newuser',
                password: 'newpassword',
                email: 'newuser@example.com',
            };

            const response = await request(app)
                .post('/api/accounts')
                .send(newAccount)
                .expect(201);

            expect(response.body.username).toBe(newAccount.username);
            expect(response.body).toHaveProperty('id');
        } catch (error) {
            console.error('Test error:', error);
            throw error;
        }
    });

    it('should update an existing account', async () => {
        // สร้างบัญชีเพื่อทำการอัปเดต
        const createdAccount = await Account.create({
            username: 'updateuser',
            password: 'password123',
            email: 'updateuser@example.com',
        });

        const updatedAccount = {
            username: 'updateduser',
            email: 'updateduser@example.com',
        };

        const response = await request(app)
            .put(`/api/accounts/${createdAccount.id}`) // อัปเดตบัญชี
            .send(updatedAccount)
            .expect(200);

        expect(response.body.username).toBe(updatedAccount.username);
    });

    it('should retrieve all accounts', async () => {
        const response = await request(app)
            .get('/api/accounts') // ปรับ endpoint สำหรับการดึงบัญชี
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return 400 for missing required fields', async () => {
        const newAccount = {
            // ขาดบางฟิลด์ (เช่น username)
            password: 'password123',
            email: 'missinguser@example.com',
        };

        const response = await request(app)
            .post('/api/accounts')
            .send(newAccount)
            .expect(400);

        expect(response.body.error).toBeDefined();
    });

    it('should return 404 for updating a non-existing account', async () => {
        const updatedAccount = {
            username: 'nonexistentuser',
            email: 'nonexistent@example.com',
        };

        const response = await request(app)
            .put('/api/accounts/9999') // ใช้ ID ที่ไม่มีอยู่
            .send(updatedAccount)
            .expect(404);

        expect(response.body.error).toBeDefined();
    });

    it('should retrieve an account by ID', async () => {
        // สร้างบัญชีเพื่อดึงข้อมูล
        const createdAccount = await Account.create({
            username: 'retrieveduser',
            password: 'password123',
            email: 'retrieveduser@example.com',
        });

        const response = await request(app)
            .get(`/api/accounts/${createdAccount.id}`)
            .expect(200);

        expect(response.body.username).toBe(createdAccount.username);
    });

    it('should delete an existing account', async () => {
        const createdAccount = await Account.create({
            username: 'deleteuser',
            password: 'password123',
            email: 'deleteuser@example.com',
        });

        await request(app)
            .delete(`/api/accounts/${createdAccount.id}`)
            .expect(204);

        // ตรวจสอบว่าบัญชีถูกลบออกจากฐานข้อมูลแล้ว
        const account = await Account.findByPk(createdAccount.id);
        expect(account).toBeNull();
    });

    it('should return 404 for a non-existing account', async () => {
        const response = await request(app)
            .get('/api/accounts/9999') // ใช้ ID ที่ไม่มีอยู่
            .expect(404);

        expect(response.body.error).toBeDefined();
    });

    afterAll(async () => {
        await sequelize.close(); // ปิดการเชื่อมต่อฐานข้อมูล
    });
});

cd ..

nano package.json
//แก้ไขโค้ดเพิ่มเติม
 "backend": "file:",
 "react-scripts": "^5.0.1",

cd ..

npm run test-back

## Running Tests
...
## Test File Structure
...
## Test Coverage
The tests in this repository cover the following functionality:
-
-
-
## Viewing Test Results
...
## Adding New Tests
...
