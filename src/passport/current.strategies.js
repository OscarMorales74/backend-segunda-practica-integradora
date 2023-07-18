import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserManager from '../daos/mongodb/managers/user.manager.js';
import 'dotenv/config';

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

const userManager = new UserManager();

// Define la función cookieExtractor para extraer el token de la cookie
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    ExtractJwt.fromUrlQueryParameter('access_token'),
    cookieExtractor, // Usa el extractor personalizado para la cookie
  ]),
  secretOrKey: SECRET_KEY_JWT,
};

const currentJwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await userManager.getById(jwtPayload.userId);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

passport.use('currentJwtStrategy', currentJwtStrategy);

export default currentJwtStrategy;
