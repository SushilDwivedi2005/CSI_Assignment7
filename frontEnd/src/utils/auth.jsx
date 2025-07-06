export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  const token = localStorage.getItem("token");
 
  return token;
};


export const isLoggedIn = () => {
  const isAuth = !!getToken();
  
  return isAuth;
};

export const logout = () => {
  localStorage.removeItem("token");
};
