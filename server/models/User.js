const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        //match: /[A-Z][a-z]+ [A-Z][a-z]+/,
        minLength: [8, "Email should be at least 8 characters long!"]
    },
    password : {
        type: String,
        required: true,
        minLength: [3, 'Password too short!']
    },
    gender: {
        type: String,
        required: true,
        //match: /[A-Z][a-z]+ [A-Z][a-z]+/,
        //minLength: [8, "Email should be at least 8 characters long!"]
    },
 })

 userSchema.pre('save', function(next){
    if(!this.isModified('password')){
        return next()
    }
    bcrypt.hash(this.password, 10)
           .then(hash => {
            this.password = hash
            next()
           })
 })

 userSchema.method('validatePassword', function(password){
    return bcrypt.compare(password, this.password) //this.password is the encrypted password. Password is the password that the user is giving
    
})


 const User = mongoose.model('User', userSchema)
 module.exports = User