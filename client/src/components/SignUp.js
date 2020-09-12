//Import packages
import React from 'react';
import {Link} from 'react-router-dom';

//Import controllers
import {useValidation} from '../controllers/validationControllers';

//Import CSS
import '../assets/css/sign-up.css';

//Sign-up validation data model
const signUpData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    type: 'sign-up'
}

//Component logic and structure 
const SignUp = () => {
    const {errors, handleChange, handleSubmit, inputData} = useValidation(signUpData);

    return (
        <div className="sign-up-container">
            {/*Sign-up/register form*/}
            <form className="sign-up-form" onSubmit={handleSubmit}>
                {/*Sign-up header*/}
                <span className="sign-up-header">Sign Up</span>
                
                {/*First name input field*/}
                <label htmlFor="firstName" className="label first-name-label">First name</label>
                <input type="text" className="input first-name-input" name="firstName" value={inputData.firstName} onChange={handleChange} />
                <span className={"error " + (Object.keys(errors).length !== 0 ? 'show' : 'hide')}>{errors.firstName}</span>
                
                {/*Last name input field*/}
                <label htmlFor="lastName" className="label last-name-label">Last name</label>
                <input type="text" className="input last-name-input" name="lastName" value={inputData.lastName} onChange={handleChange} />
                <span className={"error " + (Object.keys(errors).length !== 0 ? 'show' : 'hide')}>{errors.lastName}</span>

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
                <span className="sign-in-link">Already have an account?&nbsp;<Link to="/signin">Sign In</Link></span>
            </form>
        </div>
    );
}

export default SignUp;