import { verifyAccessJWT } from '../helpers/jwt.helper.js';
import { getSession } from '../modals/session/Session.model.js';
import { getUserById } from '../modals/user/userModel.js';

const isUserAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    if (authorization) {
      const decoded = await verifyAccessJWT(authorization);
      if (decoded === 'jwt expired') {
        return res.status(403).json({
          status: 'error',
          message: 'jwt expired',
        });
      }
      console.log(decoded?.email);
      if (decoded?.email) {
        const session = await getSession({ token: authorization });

        if (session?._id) {
          const user = await getUserById(session.UserId);
          if (user?.role === 'user') {
            req.user = user;
            return next();
          }
        }
      }
    }
    return res.status(403).json({
      status: 'error',
      message: 'unauthorized token',
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export default isUserAuth;
