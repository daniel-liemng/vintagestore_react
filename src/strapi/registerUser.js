import axios from "axios";
import url from "../utils/URL";

const registerUser = async ({ email, password, username }) => {
  // use Post-Catch
  const res = await axios
    .post(`${url}/auth/local/register`, {
      username,
      email,
      password
    })
    .catch(error => console.log(error));
  return res;
};

export default registerUser;
