import { TOKEN_MAX_AGE, TOKEN_SECRET } from "../config/config.mjs";

const setContentType = (req, res, next) => {
  res.set("content-type", "application/json");
  next();
};

const createToken = (userData) => {
  return jwt.sign(userData, TOKEN_SECRET, { expiresIn: TOKEN_MAX_AGE });
};

const checkToken = (token) => {
  try {
    const result = jwt.verify(token, TOKEN_SECRET);
    console.log(result, token);
    return true;
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      console.log("el token está vencido");
    }
    console.log(err);
    return false;
  }
};

export { setContentType };