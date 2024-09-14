import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'; 
import { auth } from '../firebase';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Process the sign in function
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); 
      alert('Successfully logged in');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  // Process the sign out function
  const handleLogout = async () => {
    try {
      await signOut(auth); 
      alert('You have been signed out');
      navigate('/login'); 
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="header">
        {/* Displays the "Sign Out" button if the user is logged in */}
        {auth.currentUser && (
          <div className="signout-link">
            <Button primary className="signout-button" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        )}
          <div className="signup-link">
            <Button className="sign-button" secondary onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </div>
        </div>
        <Form onSubmit={handleLogin}>
          <Form.Field>
            <label>Your email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Your password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Field>
          {error && <p className="error-message">{error}</p>}
          <Button primary className="login-button" type="submit">Login</Button>
        </Form>

        
        
      </div>
    </div>
  );
};

export default LoginPage;
