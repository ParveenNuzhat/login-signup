import initializeAuthentication from './Firebase/firebase.initialize';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import './App.css';
import { useState } from 'react';

initializeAuthentication();

const auth = getAuth();
function App() {

  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false)

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.length < 6 || !/(?=.*[0-9].*[0-9])/.test(password)) {
      setError('Password must contain at least 6 characters and 2 digits')
      return;
    }

    if (isLogin) {
      processLogin(email, password)
    }
    else {
      registerNewUser(email, password)
    }
  }

  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const newUser = {
          name: displayName,
          email: email,
          image: photoURL
        }
        setUser(newUser);
      })
  }

  const processLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
      })
  }

  const handleEmailChange = e => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const toggleLogin = e => {
    setIsLogin(e.target.checked);
  }

  return (
    <div className="container w-50 mx-auto mt-3">
      <form onSubmit={handleRegister}>
        <h5 className='text-center text-primary'>Please {isLogin ? 'Login' : 'Register'}</h5>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Already Registered?
              </label>
            </div>
          </div>
        </div>
        <div className='text-danger text-center'>{error}</div>
        <div className='text-center'>
          <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button>
          {/* {
            !user.email ?
              
              :
              <button type="submit" className="btn btn-primary">SignOut</button>
          } */}
        </div>

      </form>
    </div>
  )

}

export default App;
