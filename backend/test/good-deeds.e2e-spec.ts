// test/good-deeds.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GoodDeed } from '../src/good-deeds/entities/good-deed.entity';
import { User } from '../src/users/entities/user.entity';

describe('GoodDeedsController (e2e)', () => {
    let app: INestApplication;
    let jwtToken: string;

    const mockUser = { id: 1, username: 'testuser', password: 'testpassword' };
    const mockGoodDeed = { id: 1, title: 'Test Deed', description: 'Test Description', user: mockUser };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(getRepositoryToken(User))
            .useValue({
                findOne: jest.fn().mockResolvedValue(mockUser),
            })
            .overrideProvider(getRepositoryToken(GoodDeed))
            .useValue({
                create: jest.fn().mockReturnValue(mockGoodDeed),
                save: jest.fn().mockResolvedValue(mockGoodDeed),
                find: jest.fn().mockResolvedValue([mockGoodDeed]),
                findOne: jest.fn().mockResolvedValue(mockGoodDeed),
                remove: jest.fn().mockResolvedValue(undefined),
            })
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        // Get JWT token
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ username: 'testuser', password: 'testpassword' });
        jwtToken = loginResponse.body.access_token;
    });

    it('/good-deeds (POST)', () => {
        return request(app.getHttpServer())
            .post('/good-deeds')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({ title: 'Test Deed', description: 'Test Description' })
            .expect(201)
            .expect(mockGoodDeed);
    });

    it('/good-deeds (GET)', () => {
        return request(app.getHttpServer())
            .get('/good-deeds')
            .set('Authorization', `Bearer ${jwtToken}`)
            .expect(200)
            .expect([mockGoodDeed]);
    });

    it('/good-deeds/:id (GET)', () => {
        return request(app.getHttpServer())
            .get('/good-deeds/1')
            .set('Authorization', `Bearer ${jwtToken}`)
            .expect(200)
            .expect(mockGoodDeed);
    });

    it('/good-deeds/:id (PATCH)', () => {
        return request(app.getHttpServer())
            .patch('/good-deeds/1')
            .set('Authorization', `Bearer ${jwtToken}`)
            .send({ title: 'Updated Deed' })
            .expect(200)
            .expect({ ...mockGoodDeed, title: 'Updated Deed' });
    });

    it('/good-deeds/:id (DELETE)', () => {
        return request(app.getHttpServer())
            .delete('/good-deeds/1')
            .set('Authorization', `Bearer ${jwtToken}`)
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
