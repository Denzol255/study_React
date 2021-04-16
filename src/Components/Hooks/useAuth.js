import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

export function useAuth(authFirebase) {
  const [authentication, setAuthentication] = useState(null);

  const auth = authFirebase();
  const provider = new authFirebase.GoogleAuthProvider();

  const logIn = () => auth.signInWithPopup(provider);

  const logOut = () =>
    auth
      .signOut()
      .then()
      .catch((error) => console.error(error));

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthentication(user);
      } else {
        setAuthentication(null);
      }
    });
  }, [authentication]);

  return { authentication, logIn, logOut };
}
