import { Bearer } from "permit";
import jwtSimple from "jwt-simple";

async function isLoggedIn(req, res) {
  try {
    // return next();
  } catch (e) {
    // logger.error(e.toString());
    return res.status(401).json({ msg: "Permission Denied" });
  }
}

export { isLoggedIn };
