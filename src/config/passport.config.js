import passport from "passport";
import jwt from "passport-jwt";
import configObject from "./config";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const { JWT_SECRET } = configObject;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET,
      },
      async (jwtPayload, done) => {
        try {
          return done(null, jwtPayload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
