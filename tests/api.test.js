const request = require('supertest');
const app = require('../index');
describe('Electricity API Endpoints', () => {
// Test Case 1: Total Usage valid
    it('should return valid total electricity usage for all years', async () => {
        const res = await request(app).get('/api/usage/total-by-year');
        expect(res.status).toBe(200);
        expect(typeof res.body).toBe('object');
    });
// Test Case 2: Total Usage invalid
    it('should return invalid total electricity usage for all years', async () => {
        const res = await request(app).get('/api/usages/total-by-year');
        expect(res.status).toBe(404);
    });

// Test Case 3: Total Users valid

    it('should return valid total electricity users for each year', async () => {
        const res = await request(app).get('/api/users/total-by-year');
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toBe('object');
    });

// Test Case 4: Total Users invalid
    it('should return invalid total electricity users for each year', async () => {
        const res = await request(app).get('/api/user/total-by-year');
        expect(res.statusCode).toEqual(404);
    });

// Test Case 5: Specific Province and year Usage valid
    it('should return electricity usage for a specific province and year', async () => {
        const res = await request(app).get('/api/usage/Bangkok/2566');
        expect(res.body.province_name).toBe('Bangkok');
        expect(res.body.year).toBe(2566);
    });

// Test Case 6: Specific Province and year Usage invalid
    it('should return Data not found for electricity usage for a unknown province', async () => {
        const res = await request(app).get('/api/usage/Bankok/2566');
        expect(res.body.message).toBe('Data not found');
    });

// Test Case 7: Specific Province and year Users valid
    it('should return electricity users for a specific province and year', async () => {
        const res = await request(app).get('/api/users/Bangkok/2566');
        expect(res.body.province_name).toBe('Bangkok');
        expect(res.body.year).toBe(2566);
    });

// Test Case 8: Specific Province and year Users invalid
    it('should return Data not found for electricity users for a unknown province', async () => {
        const res = await request(app).get('/api/users/Alberta/2566');
        expect(res.body.message).toBe('Data not found');
    });

// Test Case 9: Usage history for a specific province valid

    it('should return usage history for a specific province', async () => {
        const res = await request(app).get('/api/his_usage/Bangkok');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

// Test Case 10: Usage history for a specific province invalid

    it('should return empty array for usage history for a specific province', async () => {
        const res = await request(app).get('/api/his_usage/Alberta');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
    });

// Test Case 11: User history for a specific province valid

    it('should return user history for a specific province', async () => {
        const res = await request(app).get('/api/his_users/Bangkok');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

// Test Case 12: User history for a specific province invalid

    it('should return empty array for user history for a specific province', async () => {
        const res = await request(app).get('/api/his_users/Alberta');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(0);
    });
});