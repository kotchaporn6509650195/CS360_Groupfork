const request = require('supertest');
const app = require('../mockConfig/server');
const Account = require('../models/Account');
const sequelize = require('../mockConfig/database'); // นำเข้าการตั้งค่า sequelize

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
