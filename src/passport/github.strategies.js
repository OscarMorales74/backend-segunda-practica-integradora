import { Strategy as GithubStrategy } from 'passport-github2';
// import UserDaoMongoDB from "../daos/mongodb/users.dao.js";
// import MongoDao from "../daos/mongodb/users.dao.js";
// const userDao = new UserDaoMongoDB();
import UserManager from '../daos/mongodb/managers/user.manager.js';
const userManager = new UserManager();
import passport from 'passport';

const strategyOptions = {
    clientID: 'Iv1.5bf3050451ada204',
    clientSecret: '48e7fd3fea5f8f2a13d5c45335038418b22bd966',
    callbackURL: 'http://localhost:8080/users/profile-github'
};

//funcion para verificar si hay usuarios buscando por email
/**
 * 
 * @param {*} accessToken 
 * @param {*} refreshToken 
 * @param {*} profile 
 * @param {*} done 
 * @returns 
 */
const registerOrLogin = async(accessToken, refreshToken, profile, done) => {
    console.log('profile::::', profile);
    console.log('calling RegisterOrLogin funtion');
    const email = profile._json.email !== null ? profile._json.email : profile._json.blog;
    const user = await this.manager.getByEmail(email);
    if(user) {
        console.log('User found', user);
        return done(null, user);}
        const firstName = profile._json.name ? profile._json.name.split(' ')[0] : '';
        const lastName = profile._json.name ? profile._json.name.split(' ').slice(1).join(' ') : '';
        const newUser = await this.manager.register({
            first_name: firstName,
            last_name: lastName,
            email,
            password: ' ',
            isGithub: true
        });
    return done(null, newUser);
}

//inicializamos
passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));