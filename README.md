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
- User Profile
- User Change Password
  
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

1. สร้าง AWS EC2 ตามที่ตั้งค่าไว้ และ Connect to EC2 Instance
```bash
ssh -i <your-key.pem> ec2-user@<your-ec2-instance-ip>
```
2. ติดตั้ง Node.js และ npm
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
3. ติดตั้ง Git
```bash
sudo yum install -y git
...
git --version
```
4. การนำเข้า Project จาก GitHub
```bash
git clone https://github.com/techit6509650419/CS360_Project.git
...
cd CS360_Project
```
5. สร้างไฟล์ `.env` ในโฟลเดอร์ `backend`
```bash
cd backend
nano .env
```
- สุ่มค่าต่อไปนี้ใน Terminal เพื่อใช้ในไฟล์ `.env`:
```bash
#GenerateKeys1
openssl rand -base64 32
#GenerateKeys2
openssl rand -base64 32
#GenerateKeys3
openssl rand -base64 32
#GenerateKeys4
openssl rand -base64 32
```
- คำดลอกค่าที่สุ่มขึ้นมาและวางลงในไฟล์ `.env` ของคุณ:
```
APP_KEYS=GenerateKeys1
API_TOKEN_SALT=GenerateKeys2
ADMIN_JWT_SECRET=GenerateKeys3
JWT_SECRET=GenerateKeys4
NODE_ENV=production
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```
6. สร้างไฟล์ `.env` ในโฟลเดอร์ `client`
```bash
cd ../client
nano .env
```
- สุ่มค่าต่อไปนี้ใน Terminal เพื่อใช้ในไฟล์ `.env`:
```bash
#GenerateKeys1
openssl rand -base64 32
#GenerateKeys2
openssl rand -base64 32
```
- คำดลอกค่าที่สุ่มขึ้นมาและวางลงในไฟล์ `.env` ของคุณ:
```
REACT_APP_API_URL=http://<YOUR_IP_ADDRESS>:1337
REACT_APP_AUTH_TOKEN=GenerateKeys1
REACT_APP_CLIENT_SECRET=GenerateKeys2
```

7. ติดตั้ง dependencies ของไฟล์ backend
```bash
cd backend
...
npm install
```
8. ติดตั้ง dependencies ของไฟล์ client
```bash
cd ..
...
cd client
...
npm install
```
9. เริ่มต้นเซิร์ฟเวอร์ของ backend
```bash
cd ../backend
npm run develop
```
10. เริ่มต้นเซิร์ฟเวอร์ของ client
เปิด Terminal ใหม่อีกอันหนึ่ง
```bash
cd CS360_Project/client
npm start
```
  
## How to deploy and run the project using the provided bash script

1.สร้าง AWS EC2 ตามที่ตั้งค่าไว้ และ Connect to EC2 Instance
```bash
ssh -i <your-key.pem> ec2-user@<your-ec2-instance-ip>
```
2.นำเข้า Project จาก GitHub
```bash
git clone https://github.com/techit6509650419/CS360_Project.git
cd CS360_Project
```
3.รันสคริปต์ `setup.sh` เพื่อทำการติดตั้งและตั้งค่าทั้งหมด
```bash
chmod +x setup.sh
./setup.sh
```
4. รันเซิร์ฟเวอร์ของ backend และ client ใน Terminal ใหม่
```bash
# รัน backend
cd backend
npm run develop 
```
เปิด Terminal ใหม่อีกอันหนึ่ง
```bash
ssh -i <your-key.pem> ec2-user@<your-ec2-instance-ip>
```
```bash
# รัน client
cd cd CS360_Project/client
npm start
```
  
[ภาพ screen capture ของหน้าเว็บแอปพลิเคชันซึ่ง deploy ไว้บน EC2]
![image](https://github.com/user-attachments/assets/9ecca414-cedc-40fc-b622-29b7ff8e3ba7)

## Unit and Integration Testing Overview
For the tools that our group uses for testing

  -  Jest: A testing framework designed to make it easy and fast to work with projects that use JavaScript and TypeScript, especially in projects involving React. Jest also supports testing in Node.js and JavaScript in general. too
  
  -  Supertest: It's a library that helps you test HTTP requests for Node.js, especially API tests using Express or Koa. It's often used in conjunction with other testing tools like Jest or Mocha to make it easier to test APIs without needing to run a server. TRUE
  
  -  React: A user interface (UI) library developed and maintained by Facebook, often used for building interactive and responsive web applications. React is very popular for developing Single Page Applications (SPA) and is used in small to large scale projects.
  
  -  Babel: It's a tool that helps convert newer JavaScript code (ES6+ and other features) to run in browsers or environments that do not support the latest version of JavaScript. Babel acts as a JavaScript compiler or transpiler that translates new JavaScript features. It is a version supported by older browsers or systems such as ES5.
  
  -  GitHub Actions: It's a feature available on GitHub that allows you to automate tasks within the project development process such as testing, build, deployment, and All other DevOps-related tasks by GitHub Actions is a CI/CD platform (Continuous Integration / Continuous Deployment) developed to work seamlessly with GitHub.(e.g., windows-latest-18, ubuntu-latest-18)

  1. For Unit Testing

Testing was done using the Register system. There were a total of 10 test cases.

which verifies that the membership application Is it correct according to the specified format?

If information is entered incorrectly according to the specified format,
there will be a warning message indicating the format is incorrect.

  2. For Integration Testing

Testing was completed using the Register system with a total of 8 test cases.

It can verify that the account can be created, updated, searched, and deleted.

Able to pull all data in the database system and display it. and notify errors when problems occur.


## Setting Up Tests
set up environment:
1. Install team project
```bash
git clone -b develop https://github.com/techit6509650419/CS360_Project
cd CS360_Project
```
2. Install npm node.js and rebuild new sqlite.
```bash
npm install --force
npm rebuild sqlite3 --force
```
3. Edit All code in package.json in Folder CS360_Project.
```bash
nano package.json

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

```

- **Front-end (client) past**

4. Enter Folder client
```bash
cd CS360_Project/client
```
5. Edit package.json file in Folder client.
```bash
nano package.json

#เปลี่ยน test เป็น
"test": "jest --coverage"
```
6. Create Folder tests
```bash
mkdir CS360_Project/client/src/tests/
cd CS360_Project/client/src/tests/
```
7. Create the file Register.test.js and add the Automated Test Case code.
```bash
touch Register.test.js

nano Register.test.js

#เพิ่มโค้ด automade test
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import '@testing-library/jest-dom';
import { AuthContext } from '../AuthContext';

# Mock the global fetch function
global.fetch = jest.fn();

const renderRegister = () => {
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );
};

const renderLogin = () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
};

const mockFetchResponse = (response) => {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => response,
    });
};

describe('Register Component - Tests', () => {
    beforeEach(() => {
        fetch.mockClear(); # Clear previous mock calls before each test
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

    test('shows error when username is shorter than 5 characters', async () => {
        renderRegister();
    
        const usernameInput = screen.getByLabelText(/Username/i);
        fireEvent.change(usernameInput, { target: { value: 'usr' } }); # Username less than 5 characters
        fireEvent.blur(usernameInput);
    
        await waitFor(() => {
            expect(screen.getByText(/Username must be at least 5 characters long/i)).toBeInTheDocument();
        });
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

     test('successfully logs and navigates to Home Page', async () => {
        mockFetchResponse({ success: true });
        
        // Mock the login function
        const mockLogin = jest.fn();
        
        render(
            <AuthContext.Provider value={{ login: mockLogin }}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<div>Home Page</div>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // Rest of the test remains the same
        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'user@example.com' } });
        fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: 'Password1!' } });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await waitFor(() => {
            expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
        });
    });
});
```
8. Exit Folder client
```bash
cd ../../../
```
- **backend part**

1. Create Folder tests in Folder backEnd
```bash
mkdir CS360_Project/backend/tests/
cd CS360_Project/backend/tests/
```
2. Create File account.test.js and add the Automated Test Case code.
```bash
touch account.test.js
nano account.test.js

#เพิ่มโค้ด automade test
const request = require('supertest');
const app = require('../../backend/mockConfig/server'); #ปรับเส้นทางให้ตรงกับแอป Express ของคุณ
const Account = require('../models/Account');
const sequelize = require('../../backend/mockConfig/database'); #นำเข้าการตั้งค่า sequelize

describe('Integration Tests for Account API', () => {
    beforeAll(async () => {
        
        await Account.sync({ force: true }); #ตั้งค่าฐานข้อมูลใหม่ก่อนการทดสอบ

        # สร้างบัญชีสำหรับการทดสอบ
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
        # สร้างบัญชีเพื่อทำการอัปเดต
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
            .put(`/api/accounts/${createdAccount.id}`) # อัปเดตบัญชี
            .send(updatedAccount)
            .expect(200);

        expect(response.body.username).toBe(updatedAccount.username);
    });

    it('should retrieve all accounts', async () => {
        const response = await request(app)
            .get('/api/accounts') # ปรับ endpoint สำหรับการดึงบัญชี
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return 400 for missing required fields', async () => {
        const newAccount = {
            # ขาดบางฟิลด์ (เช่น username)
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
            .put('/api/accounts/9999') # ใช้ ID ที่ไม่มีอยู่
            .send(updatedAccount)
            .expect(404);

        expect(response.body.error).toBeDefined();
    });

    it('should retrieve an account by ID', async () => {
        # สร้างบัญชีเพื่อดึงข้อมูล
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

        # ตรวจสอบว่าบัญชีถูกลบออกจากฐานข้อมูลแล้ว
        const account = await Account.findByPk(createdAccount.id);
        expect(account).toBeNull();
    });

    it('should return 404 for a non-existing account', async () => {
        const response = await request(app)
            .get('/api/accounts/9999') # ใช้ ID ที่ไม่มีอยู่
            .expect(404);

        expect(response.body.error).toBeDefined();
    });

    afterAll(async () => {
        await sequelize.close(); # ปิดการเชื่อมต่อฐานข้อมูล
    });
});
```
3. Exit Folder backend
```bash
cd ..

cd ..
```
- **github action flie .yml part
  
  1. create folder .github\workflows and create a test.yml file.
  
  ```bash
    mkdir .github\workflows
    touch test.yml
    nano test.yml
  ```
  
  2. Add code to test.yml file.
  
  ```bash
    name: Test CS360 Project
    run-name: ${{ github.actor }} is testing out GitHub Actions 🚀
    on:
      push:
        branches: 
          - '*'
      pull_request:
        branches:
          - '*'

    jobs:
      Run-npm:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-24.04, windows-latest, macos-latest]  # Add other OS as needed
        node-version: [18, 20]  # Updated to the latest Node.js versions

    steps:
    # Check out the latest code from the repository
    - name: Check Repository
      uses: actions/checkout@v4


    # Setup Node.js environment
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    # Install project dependencies
    - name: Install project dependencies
      run: npm install --force

    # Rebuild sqlite3 (if necessary)
    - name: Rebuild sqlite3
      run: npm rebuild sqlite3 --force

    # Run test suite client
    - name: Run test suite client
      run: npm run test-front

    # Run test suite client coverage
    - name: Run test suite client coverage
      run: npm run test-front -- --coverage

    # Run test suite backend
    - name: Run test suite backend
      run: npm run test-back

    # Run test suite backend coverage
    - name: Run test suite backend coverage
      run: npm run test-back -- --coverage  
    ```
  
  3. Then you can push the code up to github.
  
  ```bash
    git checkout nameBranch
    git add .
    git commit -m "message"
    git push origin nameBranch
  ```
  
## Running Tests
```bash
cd CS360_Project
```

1.Running Tests frontend
```bash
npm run test-front
```

2.Running Tests backend
```bash
npm run test-back
```

## Test File Structure

- **Unit Tests** (Register.test.js) `client/src/tests/Register.test.js` Register Component tests

```bash
√ Renders the registration form
√ Shows error when the username is shorter than 5 characters
√ Shows error message for invalid email format
√ Shows error for password less than 8 characters
√ Shows error for password without uppercase letters
√ Shows error for password without numbers
√ Shows error when passwords do not match
√ Shows error when required fields are missing
√ Successfully registers user and navigates to the login page
√ Successfully registers and navigates to the home page
```
- **Integration Tests** (account.test.js) `backend/tests/account.test.js` Tests for Account API

```bash
√ Creates a new account
√ Updates an existing account
√ Retrieves all accounts
√ Returns a 400 error for missing required fields
√ Returns a 404 error for updating a non-existing account
√ Retrieves an account by ID
√ Deletes an existing account
√ Returns a 404 error for a non-existing account
```
- **CI Configuration**

The `test.yml` file utilized for Continuous Integration (CI) in GitHub Actions is located in the `.github/workflows` directory. This file is set up to manage the CI process for our testing pipeline.

## Test Coverage

This project uses Jest for code coverage testing

1. **Change Directory into Project**

```bash
cd CS360_Project
```

2. **Install Jest**

```bash
npm install --save-dev jest --force
```

3. Run Tests with Coverage Checking
   
  -  Run test suite frontend coverage

```bash
npm run test-front -- --coverage
```

  -  Run test suite backend coverage

```bash
npm run test-back -- --coverage
```
4. Check Results

- Statement Coverage: Percentage of statements that have been tested
- Branch Coverage: Percentage of conditions that have been tested
- Function Coverage: Percentage of functions that have been called during testing
- Line Coverage: Percentage of lines in the code that have been tested

## Viewing Test Results

You can view test results on both GitHub and in your terminal.

1.view test results on GitHub

- **Go to the Repository Page**: Open the repository page and go to branch sprint2-test
- **Navigate to the Actions Tab**: At the top of the repository page, click on "Actions"
- **Select the Desired Workflow**: You’ll see a list of workflows that have run. Select the workflow you want to review
- **View Test Results**: After choosing a workflow, click on specific jobs to open their logs. The logs will display detailed test results

2.view test results on terminal

- Run `npm run test-front -- --coverage` to view feature Register test result output:

```bash
> test-front
> jest client/src/tests/Register --coverage

  console.log
    Login successful: { success: true }

      at log (client/src/components/Login/Login.jsx:36:21)

 PASS  client/src/tests/Register.test.js
  Register Component - Tests
    √ renders the register form (75 ms)                                                                                                                                                                           
    √ shows error when username is shorter than 5 characters (17 ms)                                                                                                                                              
    √ shows error message for invalid email format (14 ms)                                                                                                                                                        
    √ shows error for password less than 8 characters (17 ms)                                                                                                                                                     
    √ shows error for password without uppercase letter (9 ms)                                                                                                                                                    
    √ shows error for password without a number (22 ms)                                                                                                                                                           
    √ shows error when passwords do not match (15 ms)                                                                                                                                                             
    √ shows error when required fields are missing (16 ms)                                                                                                                                                        
    √ successfully registers user and navigates to login (47 ms)                                                                                                                                                  
    √ successfully logs and navigates to Home Page (48 ms)                                                                                                                                                        
                                                                                                                                                                                                                  
-------------------------|---------|----------|---------|---------|--------------------------------                                                                                                               
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                                                                                             
-------------------------|---------|----------|---------|---------|--------------------------------
All files                |    81.9 |    70.37 |      85 |   81.25 | 
 src                     |      25 |      100 |       0 |      25 | 
  AuthContext.js         |      25 |      100 |       0 |      25 | 7-17
 src/components/Login    |      95 |    33.33 |     100 |      95 | 
  Login.jsx              |      95 |    33.33 |     100 |      95 | 32
 src/components/Register |   84.41 |       75 |     100 |   83.82 | 
  Register.jsx           |   84.41 |       75 |     100 |   83.82 | 61-62,67-68,72-74,87-88,93,154
-------------------------|---------|----------|---------|---------|--------------------------------
Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        1.999 s, estimated 3 s
Ran all test suites matching /client\\src\\tests\\Register/i.
```
- Run `npm run test-back -- --coverage` to view feature Account test result output:

```bash
> test-back
> jest backend/tests/account.test.js --coverage

 PASS  backend/tests/account.test.js
  Integration Tests for Account API
    √ should create a new account (44 ms)
    √ should update an existing account (23 ms)
    √ should retrieve all accounts (5 ms)
    √ should return 400 for missing required fields (7 ms)
    √ should return 404 for updating a non-existing account (6 ms)
    √ should retrieve an account by ID (13 ms)
    √ should delete an existing account (21 ms)
    √ should return 404 for a non-existing account (6 ms)

--------------------|---------|----------|---------|---------|-------------------
File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------|---------|----------|---------|---------|-------------------
All files           |   75.36 |     37.5 |   45.45 |   76.47 |                   
 mockConfig         |   57.14 |       10 |       0 |   59.25 |                   
  database.js       |    62.5 |        0 |       0 |    62.5 | 4-85              
  server.js         |      55 |       25 |       0 |   57.89 | 27-28,33-42       
 models             |     100 |      100 |     100 |     100 |                   
  Account.js        |     100 |      100 |     100 |     100 |                   
 routes             |   86.48 |    83.33 |     100 |   86.48 |                   
  account.routes.js |   86.48 |    83.33 |     100 |   86.48 | 21,34,48,57,62    
--------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        2.881 s
Ran all test suites matching /backend\\tests\\account.test.js/i.
```
## Adding New Tests

Add new test files about feature Register in `client/src/tests/Register` and feature account in `backend/src/tests/account`

1.Unit tests
```bash
describe('Register Component - Unit Tests', () => {
    beforeEach(() => {
        fetch.mockClear(); # Clear previous mock calls before each test
    });

test('New test name', async () => {
        # Insert code for the new test here
    });
});
```
2.Integration tests
```bash
describe('Register Component - Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks(); # Clear previous mock calls and implementations before each test
    });

    test('New test name', async () => {
        # Insert code for the new test
    });
});
```
