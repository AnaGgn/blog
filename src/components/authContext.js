import React, { useState, useEffect, useContext } from 'react';


const authContext = React.createContext({ 
    token: null, 
    setToken(){},
    id: null, 
    setId(){},
    isAdmin: null,
    setIsAdmin(){}
});


export function TokenProvider({children}) {
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
        const user = {
            token,
            id,
            isAdmin,
        };
        localStorage.setItem('user', JSON.stringify(user));
    } 
    else if (token === null) {
        localStorage.removeItem('user');
    }
  }, [token, id, isAdmin]);

  useEffect(() => {
    const getToken = async () => {
      const t = localStorage.getItem('user');
      const data = await JSON.parse(t);
      if (data) {
        setToken(data.token);
        setId(data.id);
        setIsAdmin(data.isAdmin);
      } else {
        setToken(null);
        setId(null);
        setIsAdmin(false);
      }
    };
    getToken();
  }, []);


return (
    <authContext.Provider
      value={{token, setToken, id, setId, isAdmin, setIsAdmin}}>
      {children}
    </authContext.Provider>
  );
}

export function useToken() {
    const resultContext = useContext(authContext);
  
    if (resultContext) {
      return resultContext;
    } else {
      throw new Error('Context not set');
    }
  }

