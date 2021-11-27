const assert = require('assert').strict;
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const fs = require('fs');

chai.use(chaiHttp);

describe("Verify cities file", function() {
    it("should be able to retrieve cities file", function() {
        assert.strictEqual(fs.existsSync(__dirname + '/../cities.json'), true);
    });
});

describe('/GET cities', () => {
    it('should GET all the cities', (done) => {
      chai.request('http://127.0.0.1:3000')
          .get('/')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.not.be.eql({});
            done();
          });
    });
});