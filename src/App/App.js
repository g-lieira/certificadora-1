import React, {useContext} from 'react';
import PublicRoutes from './Routes/publicRoutes';
import PrivateRoutes from './Routes/privateRoutes';
import { AuthContext } from './Context/AuthContext';

function App() {
  const { auth } = useContext(AuthContext);
  console.log("auth", auth);
  return auth ? <PrivateRoutes /> : <PublicRoutes />
}

export default App;
