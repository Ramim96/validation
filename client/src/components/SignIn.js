//Import packages
import React from 'react';
import {Link} from 'react-router-dom';

//Import controllers
import {useValidation} from '../controllers/validationControllers';

//Import CSS
import '../assets/css/sign-in.css';

//Sign-up validation data model
const signInData = {
    email: '',
    password: '',
    type: 'sign-in'
}

//Component logic and structure 
const SignIn = () => {
    const {errors, handleChange, handleSubmit, inputData} = useValidation(signInData);

    return (
        <div className="sign-in-container">
            {/*Sign-in/register form*/}
            <form className="sign-in-form" onSubmit={handleSubmit}>
                {/*Sign-up header*/}
                <span className="sign-in-header">Sign In</span>
                
                {/*E-mail input field*/}
                <label htmlFor="email" className="label email-label">E-mail</label>
                <input type="text" className="input email-input" name="email" value={inputData.email} onChange={handleChange} />
                <span className={"error " + (Object.keys(errors).length !== 0 ? 'show' : 'hide')}>{errors.email}</span>

                {/*Password input field*/}
                <label htmlFor="password" className="label password-label">Password</label>
                <input type="password" className="input password-input" name="password" value={inputData.password} onChange={handleChange} />
                <span className={"error " + (Object.keys(errors).length !== 0 ? 'show' : 'hide')}>{errors.password}</span>

                {/*Submit button*/}
                <button className="btn sign-up-btn">Sign Up</button>

                {/*To sign-in form link*/}
                <span className="sign-up-link">Don't have an account?&nbsp;<Link to="/signup">Sign Up</Link></span>
            </form>
        </div>
    );
}

export default SignIn;