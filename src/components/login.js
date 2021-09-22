import React, { useState }  from 'react';
import { useToken } from './authContext';
import axios from 'axios';
import '../App.css';


const Login = () => {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [emailCreated, setEmailCreated] = useState('');
    const [passwordCreated, setPasswordCreated] = useState('');
    const [error, setError] = useState('');
    const [errorCreation, setErrorCreation] = useState('');

    // on récupère setToken et setId du hook custom du context pour lui passer le token généré et utilisateur associé
    const {setToken, setId, setIsAdmin} = useToken();

    const loginPost = () => 
    {
        axios.post('http://localhost:3001/login', {
            email: loginEmail,
            password: loginPassword
          })
          .then(function (response) {
              if(typeof response.data === 'string') {
                setError(response.data);
                setLoginEmail('');
                setLoginPassword('');
              } else {
                setToken(response.data.token);
                setId(response.data.id);
                setIsAdmin(response.data.isAdmin);
                setLoginEmail('');
                setLoginPassword('');
              }
            
          })
          .catch(function (error) {
            console.log(error);
        });
    }

    const createUserPost = () => 
    {
        axios.post('http://localhost:3001/users', {
            email: emailCreated,
            password: passwordCreated
          })
          .then(function (response) {
            if(typeof response.data === 'string') {
                setErrorCreation(response.data);
                emailCreated('');
                setPasswordCreated('');
              } else {
                setToken(response.data.token);
                setId(response.data.id);
                setIsAdmin(response.data.isAdmin);
                emailCreated('');
                setPasswordCreated('');
              }
          })
          .catch(function (error) {
            console.log(error);
        });
    }
    
    return (
             <div className='main-container'>

                <div className='auth-form'>
                    <h2 style={{alignSelf: 'center', color: 'white'}}>Se connecter: </h2>
                    <form className='form-content'>
                        <div className='label-container'>
                            <label className='text-white'>Email :</label>
                            <input className='text-white input-width' type="text" name="email" placeholder="exemple@exemple.fr" value={loginEmail} onChange={event => setLoginEmail(event.target.value)}/>
                        </div>

                        <p style={{color: 'red'}}>{error ? error : ''}</p>

                        <div className='label-container'>
                            <label className='text-white'>Mot de passe :</label>
                            <input className='text-white input-width' type="text" name="password" value={loginPassword} onChange={event => setLoginPassword(event.target.value)}/>
                        </div>
                    </form>

                    <button classeName='button-submit' onClick={loginPost} style={{backgroundColor: 'rgb(18, 18, 100)', color: 'white', border: 0, height: '50px', width: '80px', alignSelf: 'flex-end'}}>Envoyer</button>
                </div>

                <div className='auth-form'>
                    <h2 style={{alignSelf: 'center', color: 'white'}}>Créer un compte : </h2>
                    <form className='form-content'>
                        <div className='label-container'>
                            <label className='text-white'>Email :</label>
                            <input className='text-white input-width' type="text" name="email_created" placeholder="exemple@exemple.fr" value ={emailCreated} onChange={event => setEmailCreated(event.target.value)}/>
                        </div>
                        <p style={{color: 'red'}}>{errorCreation ? errorCreation : ''}</p>
                        <div className='label-container'>
                            <label className='text-white'>Mot de passe :</label>
                            <input className='text-white input-width' type="text" name="password_created" value ={passwordCreated} onChange={event => setPasswordCreated(event.target.value)}/>
                        </div>
                    </form>
                    <button onClick={createUserPost} style={{backgroundColor: 'rgb(18, 18, 100)', color: 'white', border: 0, height: '50px', width: '80px', alignSelf: 'flex-end'}}>Envoyer</button>
                </div>

            </div>
    )
}

    

export default Login;