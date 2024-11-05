import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBFile
} from 'mdb-react-ui-kit';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { baseUrl } from '../../assets/constants';
import { auth } from '../../utils/firebase';
import axios from 'axios';

export default function Register() {

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must be less than 20 characters')
            .required('Username is required'),

        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),

        images: Yup.string()
            .min(1, 'At least one image is required')
            .required('Images are required'),

        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/\d/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .required('Password is required'),

        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password')
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const register = async (values) => {

        try {

            const formData = new FormData();

            for (let i = 0; i < formik.values.images.length; i++) {
                formData.append('images', formik.values.images[i]);
            }
            formData.append('username', formik.values.username)
            formData.append('email', formik.values.email)
            formData.append('password', formik.values.password)

            const { data } = await axios.post(`${baseUrl}/user/register`,
                formData
            )

            console.log(data);

            setIsSubmitting(false)
        } catch (err) {
            setIsSubmitting(false)
            console.log(err);
        }

    }

    const firebaseAuth = async (values) => {
        setIsSubmitting(true)
        try {


            await createUserWithEmailAndPassword(auth, values.email, values.password)
            const user = auth.currentUser;
            console.log(user);

        } catch (err) {
            console.log(err)
        }
    }

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            username: '', // string
            email: '', // string
            images: '', // string id
            password: '', // number
            repeatPassword: '', // number
        },
        onSubmit: values => {
            // setIsSubmitting(true);
            register(values);
            firebaseAuth(values);
        },
    });

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
            <div className='mask gradient-custom-3'></div>

            <MDBCard className='m-5' style={{ maxWidth: '800px' }}>
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                    <MDBInput label='Username' size='lg' type='text'
                        name='username'
                        id='username'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && (
                        <small style={{ fontSize: 12, color: 'red' }}>{formik.errors.username}</small>
                    )}


                    <MDBInput wrapperClass='mt-4' label='Email' size='lg' type='email'
                        name='email'
                        id='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && (
                        <small style={{ fontSize: 12, color: 'red' }}>{formik.errors.email}</small>
                    )}

                    <div className='mt-4'>
                        <MDBFile label='Avatar'
                            name='images'
                            id='images'
                            multiple
                            accept='image/*'
                            onChange={(e) => {
                                formik.setFieldValue("images", e.target.files)
                            }}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.touched.images && (
                        <small style={{ fontSize: 12, color: 'red' }}>{formik.errors.images}</small>
                    )}

                    <MDBInput wrapperClass='mt-4' label='Password' size='lg'
                        type='password'
                        name='password'
                        id='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && (
                        <small style={{ fontSize: 12, color: 'red' }}>{formik.errors.password}</small>
                    )}

                    <MDBInput wrapperClass='mt-4' label='Repeat your password' size='lg' type='password'
                        name='repeatPassword'
                        id='repeatPassword'
                        value={formik.values.repeatPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.repeatPassword && (
                        <small style={{ fontSize: 12, color: 'red' }}>{formik.errors.repeatPassword}</small>
                    )}

                    <MDBBtn className='my-4 w-100 gradient-custom-4' size='lg'
                        disabled={isSubmitting}
                        onClick={formik.handleSubmit}
                    >Register</MDBBtn>

                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}
