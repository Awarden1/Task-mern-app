const request = require('supertest')
const app = require('../app')

describe('Auth Api', () => {
    it('should create a new user', async () => {
        const res = await request(app)
        .post('/api/auth/createUser')
        .send({
            email: 'test@gmail.com',
            title: '123456',
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('msg')
    });

    it('should login a user', async () => {
        const res = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'test@gmail.com',
            title: '123456',
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('email')
    });
});

describe('Task Api', () => {
    it('should create a new task', async () => {
        const res = await request(app)
        .post('/api/task/createTask')
        .set('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkNTRlYjIyYjBmZDg2Nzc4YWQ1YTljIn0sImlhdCI6MTY5MTcwMDk3NH0.joh6aWQSlssf5pCydcGp7kbeRL1ZFXx68o9olxCdlZ4`)
        .send({
            name: 'This is test task',
            department: 'He difficult contented we determine ourselves me am earnestly. Hour no find it park. Eat welcomed any husbands moderate. Led was misery played waited almost cousin living. Of intention contained is by middleton am. Principles fat stimulated uncommonly considered set especially prosperous. Sons at park mr meet as fact like.',
            workingHours: 200
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('title')
    });

    it('should update a task', async () => {
        const res = await request(app)
        .post('/api/task/updateTask')
        .set('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkNTRlYjIyYjBmZDg2Nzc4YWQ1YTljIn0sImlhdCI6MTY5MTcwMDk3NH0.joh6aWQSlssf5pCydcGp7kbeRL1ZFXx68o9olxCdlZ4`)
        .send({
            taskId: '64d5149c7fd57cce9e05110f',
            name: 'This is test task',
            department: 'He difficult contented we determine ourselves me am earnestly. Hour no find it park. Eat welcomed any husbands moderate. Led was misery played waited almost cousin living. Of intention contained is by middleton am. Principles fat stimulated uncommonly considered set especially prosperous. Sons at park mr meet as fact like.',
            workingHours: 200
        })
        expect(res.statusCode).toEqual(500)
    });

    it('should delete a task', async () => {
        const res = await request(app)
        .delete('/api/task/deleteTask')
        .set('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkNTRlYjIyYjBmZDg2Nzc4YWQ1YTljIn0sImlhdCI6MTY5MTcwMDk3NH0.joh6aWQSlssf5pCydcGp7kbeRL1ZFXx68o9olxCdlZ4`)
        .send({
            taskId: '64d5149c7fd57cce9e05110f',
        })
        expect(res.statusCode).toEqual(200)
    });

    it('find a task', async () => {
        const res = await request(app)
        .delete('/api/task/getTask')
        .set('token', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkNTRlYjIyYjBmZDg2Nzc4YWQ1YTljIn0sImlhdCI6MTY5MTcwMDk3NH0.joh6aWQSlssf5pCydcGp7kbeRL1ZFXx68o9olxCdlZ4`)
        expect(res.statusCode).toEqual(200)
    });
});
