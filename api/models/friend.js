const db = require("../dbConfig");

class Friend {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.age = data.age;
        this.birthday = data.birthday;
        this.children = data.children;
    }

    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const friendData = await db.query(`SELECT * FROM friends;`);
                const friend = friendData.rows.map(f => new Friend(f));
                resolve(friend);
            } catch(err) {
                reject("Error retrieving friends")
            }
        })
    }

    static findById(id) {
        return new Promise (async (resolve, reject) => {
            try {
                const friendData = await db.query(`SELECT * FROM friends WHERE id=$1;`, [id]);
                const friend = new Friend(friendData.rows[0])
                resolve(friend);
            } catch(err) {
                reject("Error retrieving friend")
            }
        })
    }

    static create(name, age, birthday, children) {
        return new Promise (async (resolve, reject) => {
            try {
                const friendData = await db.query(`INSERT INTO friends (name, age, birthday, children) VALUES ($1, $2, $3, $4) RETURNING *;`, [name, age, birthday, children]);
                console.log(friendData.rows)
                let newFriend = new Friend(friendData.rows[0]);
                resolve(newFriend);
            } catch(err) {
                reject("Error creating friend")
            }
        })
    }

    update(name, age, birthday, children) {
        return new Promise (async (resolve, reject) => {
            try {
                name = name || this.name;
                age = age || this.age;
                birthday = birthday || this.birthday;
                children = children || this.children;
                const updatedFriendData = await db.query(`UPDATE friends SET name =  $2, age = $3, birthday = $4, children = $5 WHERE id = $1 RETURNING *;`, [ this.id, name, age, birthday, children]);
                let updatedFriend = new Friend(updatedFriendData.rows[0]);
                resolve(updatedFriend);
            } catch(err) {
                reject("Error updating friend")
            }
        })
    }

    delete() {
        return new Promise(async(resolve, reject) => {
            try {
                await db.query(`DELETE FROM friends WHERE id = $1;`, [this.id]);
                resolve('Friend was deleted')
            } catch (err){
                reject('Friend could not be deleted')
            }
        })
    }
}


module.exports = Friend;
