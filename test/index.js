// const should = require('should');
const request = require('request');
const expect = require('chai').expect;
const baseUrl = "http://localhost:3005/api/";
const util = require('util');

var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Test Get All Data', function () {
    it('Test Get All Data', function (done) {
        request.get({ url: baseUrl + 'courses' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                console.log(body);
                done();
            });
    });
});

describe('Test Get Single Data', function () {
    it('Test Get Single Data', function (done) {
        request.get({ url: baseUrl + 'courses/2' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                console.log(body);
                done();
            });
    });
});


describe("Test Post Data", function () {
    it("Test Post Data", function (done) {
        // Send some Form Data
        chai.request(baseUrl)
            .post('courses')
            .send({
                name: 'TestingCourse'
            })
            .end(function (err, res) {

                if (err) {
                    console.log('Post Method error : ' + err);
                } else if (res != null) {
                    console.log('res is ok');
                    console.log(res.body);
                }

                console.log('Response Value = ' + res.body.name);
                expect(res.body.name).to.equal('TestingCourse');
                done();
            });
    });

});

describe("Test Put Data", function () {
    it("Test Put Data", function (done) {
        // Send some Form Data
        chai.request(baseUrl)
            .put('courses/1')
            .send({
                name: 'TestingPutMethod'
            })
            .end(function (err, res) {

                if (err) {
                    console.log('Post Method error : ' + err);
                } else if (res != null) {
                    console.log('res is ok');
                    console.log(res.body);
                }

                console.log('Response Value = ' + res.body.name);
                expect(res.body.name).to.equal('TestingPutMethod');
                done();
            });
    });

});

describe('Test Delete Single Data', function () {
    it('Test Delete Single Data', function (done) {
        request.delete({ url: baseUrl + 'courses/2' },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                console.log(body);
                done();
            });
    });
});
