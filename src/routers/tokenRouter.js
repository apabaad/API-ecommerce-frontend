import express from 'express';
import { createAccessJWT, verifyRefreshJWT } from '../helpers/jwt.helper.js';
import { getUser } from '../modals/user/userModel.js';
const Router = express.Router();

Router.get('/', async (req, res) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    if (authorization) {
      const decoded = verifyRefreshJWT(authorization);
      console.log(decoded);

      if (decoded?.email) {
        const user = await getUser({
          email: decoded.email,
          refreshJWT: authorization,
        });

        if (user?._id) {
          const accessJWT = await createAccessJWT({
            _id: user._id,
            email: user.email,
          });
          return res.json({
            status: 'success',
            message: 'new access token generated',
            accessJWT,
          });
        }
      }
    }
    res.status(401).json({
      status: 'error',
      message: 'invalid refresh token',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

export default Router;
