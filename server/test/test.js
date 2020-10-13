import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the result endpoints:', () => {

    it('It should create a result', (done) => {
        const result = {
            name: 'test_name',
            score: '3'
        };
        chai.request(app)
            .post('/api/v1/results')
            .set('Accept', 'application/json')
            .send(result)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.data).to.include({
                    id: 1,
                    name: result.name,
                    score: result.score
                });
                done();
            });
    });

    it('It should not create a result with incomplete parameters', (done) => {
        const result = {
            name: 'test_name'
        };
        chai.request(app)
            .post('/api/v1/results')
            .set('Accept', 'application/json')
            .send(result)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });

    it('It should get all results', (done) => {
        chai.request(app)
            .get('/api/v1/results')
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                res.body.data[0].should.have.property('id');
                res.body.data[0].should.have.property('name');
                res.body.data[0].should.have.property('score');
                done();
            });
    });

    it('It should not get a particular result with invalid id', (done) => {
        const resultId = 8888;
        chai.request(app)
            .get(`/api/v1/results/${resultId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(404);
                res.body.should.have.property('message')
                    .eql(`Cannot find result with the id ${resultId}`);
                done();
            });
    });

    it('It should not get a particular result with non-numeric id', (done) => {
        const resultId = 'aaa';
        chai.request(app)
            .get(`/api/v1/results/${resultId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                res.body.should.have.property('message')
                    .eql('Please input a valid numeric value');
                done();
            });
    });

    it('It should update a result', (done) => {
        const resultId = 1;
        
        const updatedResult = {
            id: resultId,
            name: 'test_name_updated',
            score: '3'
        };

        chai.request(app)
            .put(`/api/v1/results/${resultId}`)
            .set('Accept', 'application/json')
            .send(updatedResult)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data.id).equal(updatedResult.id);
                expect(res.body.data.name).equal(updatedResult.name);
                expect(res.body.data.score).equal(updatedResult.score);
                done();
            });
    });

    it('It should not update a result with invalid id', (done) => {
        const resultId = '9999';
        const updatedResult = {
            id: resultId,
            name: 'test_name_updated',
            score: '3'
        };
        chai.request(app)
            .put(`/api/v1/results/${resultId}`)
            .set('Accept', 'application/json')
            .send(updatedResult)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                res.body.should.have.property('message')
                    .eql(`Cannot find Result with the id: ${resultId}`);
                done();
            });
    });

    it('It should not update a result with non-numeric id value', (done) => {
        const resultId = 'ggg';
        const updatedResult = {
            id: resultId,
            name: 'test_name_updated',
            score: '3'
        };
        chai.request(app)
            .put(`/api/v1/results/${resultId}`)
            .set('Accept', 'application/json')
            .send(updatedResult)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                res.body.should.have.property('message')
                    .eql('Please input a valid numeric value');
                done();
            });
    });


    it('It should delete a result', (done) => {
        const resultId = 1;
        chai.request(app)
            .delete(`/api/v1/results/${resultId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data).to.include({});
                done();
            });
    });

    it('It should not delete a result with invalid id', (done) => {
        const resultId = 777;
        chai.request(app)
            .delete(`/api/v1/results/${resultId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(404);
                res.body.should.have.property('message')
                    .eql(`Result with the id ${resultId} cannot be found`);
                done();
            });
    });

    it('It should not delete a result with non-numeric id', (done) => {
        const resultId = 'bbb';
        chai.request(app)
            .delete(`/api/v1/results/${resultId}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(400);
                res.body.should.have.property('message').eql('Please provide a numeric value');
                done();
            });
    });
});