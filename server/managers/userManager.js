const bcrypt = require('bcrypt');
const parser = require('../utils/parser')

const jwt = require('../lib/jsonwebtoken');
const User = require('../models/User');

const SECRET = 'victoriasecret';

exports.login = async (email, password) => {
    
    try{

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isValid = await user.validatePassword(password)

    if(!isValid){
       throw new Error("Invalid password!")
    }
    

    const payLoad = {_id: user._id, email: user.email}
    const token = await jwt.sign(payLoad, SECRET);

    return {
        _id: user._id,
        email: user.email,
        accessToken: token,
    };

}catch(error){
    console.log(parser.parseError(error))
    return (parser.parseError(error))
}
};

exports.register = async (email, password, rePassword, gender) => {
    const existingUser = await User.findOne({ email });

    try{
        
    if (existingUser) {
        throw new Error('Email is already taken !');
    }

    if(!email || !password || !rePassword){
        throw new Error('All fields are requiered!');
    }

    if(password !== rePassword){
        throw new Error('Password missmatch!');
    }

    const newUser = await User.create({email, password, gender})


    return this.login(email, password)

    }catch(error){
        console.log(parser.parseError(error))
        return (parser.parseError(error))
    }

};

exports.getCurrentUser = (email) => User.findOne({email})