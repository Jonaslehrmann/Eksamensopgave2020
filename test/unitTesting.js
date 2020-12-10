const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

let should = chai.should();

describe('POST /user', function () {
    it('should allow permission', function (done) {
        let user = {
            fullNameValue: "testbruger",
            usernameValue: "testbruger2",
            genderValue: "other",
            passwordValue: "testbruger2",
            likes: [],
        }

        chai.request("localhost:3003")
            .post('/user')
            .send(user)
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    })
})
