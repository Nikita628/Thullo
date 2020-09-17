import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Button from '../../common/Button/Button';
import FilePicker from '../../common/FilePicker/FilePicker';
import ImgCropper from '../../common/ImgCropper/ImgCropper';
import Input from '../../common/Input/Input';
import css from './SignUp.module.css';
import { actionCreators } from "../../../state/auth";
import { SignUpData } from '../../../models/auth';
import { AppState } from '../../../state';

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
    const authState = useSelector((state: AppState) => state.auth);
    console.log("auth state - ", authState);

    const [profileImg, setProfileImg] = useState<File>();
    const [croppedImg, setCroppedImg] = useState<File>();
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>();
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>();

    const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (validationErrors?.firstName) {
            setValidationErrors({ ...validationErrors, firstName: undefined });
        }
        setFirstName(e.target.value);
    }

    const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (validationErrors?.lastName) {
            setValidationErrors({ ...validationErrors, lastName: undefined });
        }
        setLastName(e.target.value);
    }

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (validationErrors?.email) {
            setValidationErrors({ ...validationErrors, email: undefined });
        }
        setEmail(e.target.value);
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (validationErrors?.password) {
            setValidationErrors({ ...validationErrors, password: undefined });
        }
        setPassword(e.target.value);
    }

    const onPasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (validationErrors?.passwordConfirmation) {
            setValidationErrors({ ...validationErrors, passwordConfirmation: undefined });
        }
        setPasswordConfirmation(e.target.value);
    }

    const onProfileImageChanged = (files: File[]) => {
        setProfileImg(files[0]);
    }

    const onProfileImageCropped = (file: File) => {
        if (validationErrors?.croppedProfileImg) {
            setValidationErrors({ ...validationErrors, croppedProfileImg: undefined });
        }
        setCroppedImg(file);
    }

    const onSignUpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            dispatch(actionCreators.SignUpRequested(signUpData, () => {/* redirect to signin */}));
        } else {
            setValidationErrors(errors);
        }
    }

    return (
        <div className={css.signUp}>
            <h3 className={css.signUpHeader}>Sign Up</h3>
            <form>
                <div className={css.formGroup}>
                    <p className={css.formPar}>Please select an image for your profile</p>
                    <FilePicker
                        isUploadEnabled={false}
                        maxNumberOfFiles={1}
                        onSelectedFilesChanged={onProfileImageChanged} />
                </div>
                {
                    profileImg
                        ? <div className={css.formGroup}>
                            <p className={css.formPar}>Select area that should be used</p>
                            <ImgCropper
                                isInvalid={!!validationErrors?.croppedProfileImg}
                                img={profileImg}
                                cropType="square"
                                minWidth={50}
                                minHeight={50}
                                onCroppedImgChanged={onProfileImageCropped} />
                            <div className={css.errorText}>{validationErrors?.croppedProfileImg}</div>
                        </div>
                        : null
                }
                <div className={css.formGroup}>
                    <label className={css.formLabel}>First Name</label>
                    <Input isInvalid={!!validationErrors?.firstName} value={firstName} onChange={onFirstNameChange} className={css.formInput} />
                    <div className={css.errorText}>{validationErrors?.firstName}</div>
                </div>
                <div className={css.formGroup}>
                    <label className={css.formLabel}>Last Name</label>
                    <Input isInvalid={!!validationErrors?.lastName} value={lastName} onChange={onLastNameChange} className={css.formInput} />
                    <div className={css.errorText}>{validationErrors?.lastName}</div>
                </div>
                <div className={css.formGroup}>
                    <label className={css.formLabel}>Email</label>
                    <Input isInvalid={!!validationErrors?.email} value={email} onChange={onEmailChange} className={css.formInput} />
                    <div className={css.errorText}>{validationErrors?.email}</div>
                </div>
                <div className={css.formGroup}>
                    <label className={css.formLabel}>Password</label>
                    <Input isInvalid={!!validationErrors?.password} value={password} onChange={onPasswordChange} className={css.formInput} />
                    <div className={css.errorText}>{validationErrors?.password}</div>
                </div>
                <div className={css.formGroup}>
                    <label className={css.formLabel}>Password Confirmation</label>
                    <Input isInvalid={!!validationErrors?.passwordConfirmation} value={passwordConfirmation} onChange={onPasswordConfirmationChange} className={css.formInput} />
                    <div className={css.errorText}>{validationErrors?.passwordConfirmation}</div>
                </div>
                <div className={css.signUpButton}>
                    <Button onClick={onSignUpClick} type="primary">Sign Up</Button>
                </div>
            </form>
            <p className={css.already}>Already have an account? Sign in <a href="#">here</a></p>
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