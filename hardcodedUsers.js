class User {
    constructor(fullName, username, gender, password, likes) {
        this.fullName = fullName;
        this.username = username;
        this.gender = gender;
        this.password = password;
        this.likes = likes
    }
}
let user1 = new User ("Patrik Patriksen","patrikmanden123","male","",["Jonas Lehrmann"])
let user2 = new User ("Patricia Patriciasen","patriciaersej123","female","",[])
let user3 = new User ()

module.exports = (User)
