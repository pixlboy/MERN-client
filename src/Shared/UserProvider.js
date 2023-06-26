import { useState, useEffect, createContext } from "react";
import Axios from "axios";

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(undefined);

  async function getUser() {
    const user = await Axios.get("http://localhost:5000/auth/isLoggedIn");
    setUser(user.data);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{user, getUser}}>{props.children}</UserContext.Provider>
  );
};

export default UserContext;
export { UserContextProvider };
