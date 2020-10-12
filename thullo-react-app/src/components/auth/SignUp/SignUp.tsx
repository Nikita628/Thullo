import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import Button from '../../common/ui/Button/Button';
import FilePicker from '../../common/ui/FilePicker/FilePicker';
import ImgCropper from '../../common/ui/ImgCropper/ImgCropper';
import Input from '../../common/ui/Input/Input';
import css from './SignUp.module.css';
import { actionCreators } from "../../../state/auth";
import { SignUpData } from '../../../models/auth';

interface SignUpProps {
    className?: string;
    style?: any;
}

interface ValidationErrors {
    hasErrors: boolean;
    croppedProfileImg?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    passwordConfirmation?: string;
}

interface FormData {
    img: File;
    croppedImg: File;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const SignUp = (props: SignUpProps) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [profileImg, setProfileImg] = useState<File>();
    const [croppedImg, setCroppedImg] = useState<File>();
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>();

    const changeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (validationErrors?.firstName) {
            setValidationErrors({ ...validationErrors, firstName: undefined });
        }
        setFirstName(e.target.value);
    }

    const changeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (validationErrors?.lastName) {
            setValidationErrors({ ...validationErrors, lastName: undefined });
        }
        setLastName(e.target.value);
    }

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (validationErrors?.email) {
            setValidationErrors({ ...validationErrors, email: undefined });
        }
        setEmail(e.target.value);
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (validationErrors?.password) {
            setValidationErrors({ ...validationErrors, password: undefined });
        }
        setPassword(e.target.value);
    }

    const changePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (validationErrors?.passwordConfirmation) {
            setValidationErrors({ ...validationErrors, passwordConfirmation: undefined });
        }
        setPasswordConfirmation(e.target.value);
    }

    const changeProfileImg = (files: File[]) => {
        setProfileImg(files[0]);
    }

    const changeCroppedProfileImg = (file: File) => {
        if (validationErrors?.croppedProfileImg) {
            setValidationErrors({ ...validationErrors, croppedProfileImg: undefined });
        }
        setCroppedImg(file);
    }

    const signUp = (e: React.MouseEvent<HTMLElement>) => {
        const form: FormData = {
            img: profileImg,
            croppedImg: croppedImg,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation
        };

        const errors = validate(form);

        if (!errors.hasErrors) {
            const signUpData = new SignUpData();
            signUpData.email = email;
            signUpData.img = croppedImg;
            signUpData.firstName = firstName;
            signUpData.lastName = lastName;
            signUpData.password = password;
            dispatch(actionCreators.SignUpRequested(signUpData, () => history.replace("/signin")));
        } else {
            setValidationErrors(errors);
        }
    }

    return (
        <div className={css.signUp}>
            <div className={css.formLogo}>
                <svg width="98" height="29" viewBox="0 0 98 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M54.3311 8.436V10.47H50.9831V21H48.4631V10.47H45.1151V8.436H54.3311ZM61.1557 10.884C61.9117 10.884 62.5837 11.052 63.1717 11.388C63.7597 11.712 64.2157 12.198 64.5397 12.846C64.8757 13.482 65.0437 14.25 65.0437 15.15V21H62.5237V15.492C62.5237 14.7 62.3257 14.094 61.9297 13.674C61.5337 13.242 60.9937 13.026 60.3097 13.026C59.6137 13.026 59.0617 13.242 58.6537 13.674C58.2577 14.094 58.0597 14.7 58.0597 15.492V21H55.5397V7.68H58.0597V12.27C58.3837 11.838 58.8157 11.502 59.3557 11.262C59.8957 11.01 60.4957 10.884 61.1557 10.884ZM76.2241 11.028V21H73.6861V19.74C73.3621 20.172 72.9361 20.514 72.4081 20.766C71.8921 21.006 71.3281 21.126 70.7161 21.126C69.9361 21.126 69.2461 20.964 68.6461 20.64C68.0461 20.304 67.5721 19.818 67.2241 19.182C66.8881 18.534 66.7201 17.766 66.7201 16.878V11.028H69.2401V16.518C69.2401 17.31 69.4381 17.922 69.8341 18.354C70.2301 18.774 70.7701 18.984 71.4541 18.984C72.1501 18.984 72.6961 18.774 73.0921 18.354C73.4881 17.922 73.6861 17.31 73.6861 16.518V11.028H76.2241ZM80.6005 7.68V21H78.0805V7.68H80.6005ZM84.9803 7.68V21H82.4603V7.68H84.9803ZM91.268 21.162C90.308 21.162 89.444 20.952 88.676 20.532C87.908 20.1 87.302 19.494 86.858 18.714C86.426 17.934 86.21 17.034 86.21 16.014C86.21 14.994 86.432 14.094 86.876 13.314C87.332 12.534 87.95 11.934 88.73 11.514C89.51 11.082 90.38 10.866 91.34 10.866C92.3 10.866 93.17 11.082 93.95 11.514C94.73 11.934 95.342 12.534 95.786 13.314C96.242 14.094 96.47 14.994 96.47 16.014C96.47 17.034 96.236 17.934 95.768 18.714C95.312 19.494 94.688 20.1 93.896 20.532C93.116 20.952 92.24 21.162 91.268 21.162ZM91.268 18.966C91.724 18.966 92.15 18.858 92.546 18.642C92.954 18.414 93.278 18.078 93.518 17.634C93.758 17.19 93.878 16.65 93.878 16.014C93.878 15.066 93.626 14.34 93.122 13.836C92.63 13.32 92.024 13.062 91.304 13.062C90.584 13.062 89.978 13.32 89.486 13.836C89.006 14.34 88.766 15.066 88.766 16.014C88.766 16.962 89 17.694 89.468 18.21C89.948 18.714 90.548 18.966 91.268 18.966Z" fill="#333333" />
                    <path d="M0 4C0 1.79086 1.79086 0 4 0H10C12.2091 0 14 1.79086 14 4V25C14 27.2091 12.2091 29 10 29H4C1.79086 29 0 27.2091 0 25V4Z" fill="#2F80ED" />
                    <path d="M18 4C18 1.79086 19.7909 0 22 0H28C30.2091 0 32 1.79086 32 4V14C32 16.2091 30.2091 18 28 18H22C19.7909 18 18 16.2091 18 14V4Z" fill="#2F80ED" />
                </svg>
            </div>
            <form>
                <div className={css.formGroup}>
                    <p className={css.formPar}>Please select an image for your profile</p>
                    <FilePicker
                        isUploadEnabled={false}
                        maxNumberOfFiles={1}
                        onSelectedFilesChanged={changeProfileImg} />
                </div>
                {
                    profileImg
                    && <div className={css.formGroup}>
                        <p className={css.formPar}>Select area that should be used</p>
                        <ImgCropper
                            isInvalid={!!validationErrors?.croppedProfileImg}
                            img={profileImg}
                            cropType="square"
                            minWidth={50}
                            minHeight={50}
                            onCroppedImgChanged={changeCroppedProfileImg} />
                        <div className={css.errorText}>{validationErrors?.croppedProfileImg}</div>
                    </div>
                }
                <div className={css.formGroup}>
                    <label className={css.formLabel}>First Name</label>
                    <Input type="text" isInvalid={!!validationErrors?.firstName} value={firstName} onChange={changeFirstName} className={css.formInput} />
                    <div className={css.errorText}>{validationErrors?.firstName}</div>
                </div>
                <div className={css.formGroup}>
                    <label className={css.formLabel}>Last Name</label>
                    <Input type="text" isInvalid={!!validationErrors?.lastName} value={lastName} onChange={changeLastName} className={css.formInput} />
                    <div className={css.errorText}>{validationErrors?.lastName}</div>
                </div>
                <div className={css.formGroup}>
                    <label className={css.formLabel}>Email</label>
                    <Input type="email" isInvalid={!!validationErrors?.email} value={email} onChange={changeEmail} className={css.formInput} />
                    <div className={css.errorText}>{validationErrors?.email}</div>
                </div>
                <div className={css.formGroup}>
                    <label className={css.formLabel}>Password</label>
                    <Input type="password" isInvalid={!!validationErrors?.password} value={password} onChange={changePassword} className={css.formInput} />
                    <div className={css.errorText}>{validationErrors?.password}</div>
                </div>
                <div className={css.formGroup}>
                    <label className={css.formLabel}>Password Confirmation</label>
                    <Input type="password" isInvalid={!!validationErrors?.passwordConfirmation} value={passwordConfirmation} onChange={changePasswordConfirmation} className={css.formInput} />
                    <div className={css.errorText}>{validationErrors?.passwordConfirmation}</div>
                </div>
                <div className={css.signUpButton}>
                    <Button onClick={signUp} type="primary">Sign Up</Button>
                </div>
            </form>
            <p className={css.already}>Already have an account? Sign in <Link to="/signin">here</Link></p>
        </div>
    );
}

const validate = (form: FormData): ValidationErrors => {
    const errors: ValidationErrors = {
        hasErrors: false
    };

    if (form.img && !form.croppedImg) {
        errors.hasErrors = true;
        errors.croppedProfileImg = "Crop image for your profile";
    }

    if (!form.firstName) {
        errors.hasErrors = true;
        errors.firstName = "First name is required";
    }

    if (!form.lastName) {
        errors.hasErrors = true;
        errors.lastName = "Last name is required";
    }

    if (!form.email) {
        errors.hasErrors = true;
        errors.email = "Email is required";
    }

    if (!form.password) {
        errors.hasErrors = true;
        errors.password = "Password is required";
    }

    if (!form.passwordConfirmation) {
        errors.hasErrors = true;
        errors.passwordConfirmation = "Confirm password";
    }

    if (form.password && form.passwordConfirmation
        && form.password !== form.passwordConfirmation) {
        errors.hasErrors = true;
        errors.passwordConfirmation = "Passwords do not match";
    }

    return errors;
}

export default SignUp;