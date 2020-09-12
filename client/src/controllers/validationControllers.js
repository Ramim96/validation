//Import packages
import axios from 'axios';
import {useEffect, useState} from 'react';

//Input data validation controller
export const useValidation = (signUpData) => {
    //States react hooks
    const [errors, setErrors] = useState({});
    const [inputData, setInputData] = useState(signUpData);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if(submitted) {
            if(Object.keys(errors).length === 0) {
                sendToServer();
            }
            else {
                console.log("Validation errors");
    
                //Update submission state
                setSubmitted(false);
            }
        }
        else {
            //Update submission state
            setSubmitted(false);
        }
    }, [submitted]);

    //Send data to server and process
    const sendToServer = async () => {
        //Process sign-in component input data
        if(inputData.type === "sign-in") {
            console.log("Signing in...");

            //Send sign-up request
            await axios.post("/user/signin", inputData)
            .then((res) => {
                //Assert result 
                if(res.data.success) {
                    //Update input data
                    setInputData({
                        email: "",
                        password: ""
                    });

                    //Update submission state
                    setSubmitted(false);

                    return;
                }
            })
            .catch((error) => {
                const serverErrors = {};

                //Save and set server errors
                serverErrors[error.response.data.field] = error.response.data.msg;
                setErrors(serverErrors);

                //Update submission state
                setSubmitted(false);

                return;
            });

            return;
        }
        
        //Process sign-up component input data
        if(inputData.type === "sign-up") {
        console.log("Signing up...");

        //Send sign-up request
        await axios.post("/user/signup", inputData)
                .then((res) => {
                    //Assert result 
                    if(res.data.success) {
                        //Update input data
                        setInputData({
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: ""
                        });

                        //Update submission state
                        setSubmitted(false);

                        return;
                    }
                })
                .catch((error) => {
                    const serverErrors = {};
                    
                    //Save and set server errors
                    serverErrors[error.response.data.field] = error.response.data.msg;
                    setErrors(serverErrors);

                    //Update submission state
                    setSubmitted(false);

                    return;
                });
        }
    }

    //Handle input data change
    const handleChange = (e) => {
        //Update input data state object
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        });
    }

    //Handle submit method
    const handleSubmit = (e) => {
        //Prevent page reload after data submission
        e.preventDefault();

        //Save and set validation errors
        let validationErrors = validationRules(inputData);
        setErrors(validationErrors);

        //Update submission flag
        setSubmitted(true);
    }

    return {
        errors,
        handleChange,
        handleSubmit,
        inputData
    };
}

//Validation rules controller
const validationRules = (inputData) => {
    //Validation errors variable
    let validationErrors = {};

    //Validation rules variables
    let firstNameRule = RegExp("[a-zA-Z]{3,30}");
    let lastNameRule = RegExp("[a-zA-Z]{3,30}");
    let emailRule = RegExp("^([a-zA-Z0-9_.]+)@([a-zA-Z0-9_.]+).([a-zA-Z]{2,5})$");

    if(inputData.type === 'sign-in') {
        //Assert input data fields
        if(!inputData.email) {
            validationErrors.email = "E-mail required";
        }
        else if(!emailRule.test(inputData.email)) {
            validationErrors.email = "Invalid e-mail format";
        }

        if(!inputData.password) {
            validationErrors.password = "Password required";
        }
        else if(inputData.password.length < 5) {
            validationErrors.password = "Password must be at least 5 characters";
        }

        return validationErrors;
    }
    else {
        //Assert input data fields
        if(!inputData.firstName) {
            validationErrors.firstName = "First name required";
        }
        else if(!firstNameRule.test(inputData.firstName)) {
            validationErrors.firstName = "Invalid first name format";
        }

        if(!inputData.lastName) {
            validationErrors.lastName = "Last name required";
        }
        else if(!lastNameRule.test(inputData.lastName)) {
            validationErrors.lastName = "Invalid last name format";
        }

        if(!inputData.email) {
            validationErrors.email = "E-mail required";
        }
        else if(!emailRule.test(inputData.email)) {
            validationErrors.email = "Invalid e-mail format";
        }

        if(!inputData.password) {
            validationErrors.password = "Password required";
        }
        else if(inputData.password.length < 5) {
            validationErrors.password = "Password must be at least 5 characters";
        }

        return validationErrors;
    }
}