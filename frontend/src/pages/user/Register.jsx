import React from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBTypography,
    MDBFile
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { baseUrl } from '../../assets/constants';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';

export default function Register() {

    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must be less than 20 characters')
            .required('Username is required'),

        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),

        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/\d/, 'Password must contain at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .required('Password is required'),

        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),

        images: Yup.string()
            .required('Images are required'),
    });

    const register = async (values) => {
        try {

            const formData = new FormData;
            for (let i = 0; i < formik.values.images.length; i++) {
                formData.append('images', formik.values.images[i]);
            }
            formData.append('username', formik.values.username)
            formData.append('email', formik.values.email)
            formData.append('password', formik.values.password)

            const { data } = await axios.post(`${baseUrl}/user/register`, formData);

            navigate('/login')

        } catch (err) {
            console.log(err);
        }
    }

    const fireBaseAuth = async (values) => {
        await createUserWithEmailAndPassword(auth, values.email, values.password);
    }

    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            username: '',
            email: '',
            password: '',
            images: '',
            repeatPassword: '',
        },
        onSubmit: (values) => {
            register(values);
            fireBaseAuth(values)
        }
    })

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                    <MDBInput wrapperClass='mt-4' label='Username' size='lg' type='text'
                        id='username'
                        name='username'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.touched.username && (
                        <small style={{ fontSize: 12, color: 'red' }}>{formik.errors.username}</small>
                    )}

                    <MDBInput wrapperClass='mt-4' label='Email' size='lg' type='email'
                        id='email'
                        name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && (
                        <small style={{ fontSize: 12, color: 'red' }}>{formik.errors.email}</small>
                    )}

                    <div className='mt-4'>
                        <MDBFile label='Avatar'
                            id='images'
                            name='images'
                            accept='image/*'
                            multiple
                            onChange={(e) => {
                                formik.setFieldValue("images", e.target.files)
                            }}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.touched.images && (
                        <small style={{ fontSize: 12, color: 'red' }}>{formik.errors.images}</small>
                    )}

                    <MDBInput wrapperClass='mt-4' label='Password' size='lg' type='password'
                        id='password'
                        name='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && (
                        <small style={{ fontSize: 12, color: 'red' }}>{formik.errors.password}</small>
                    )}


                    <MDBInput wrapperClass='mt-4' label='Repeat your password' size='lg' type='password'
                        id='repeatPassword'
                        name='repeatPassword'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.repeatPassword}
                    />
                    {formik.touched.repeatPassword && (
                        <small style={{ fontSize: 12, color: 'red' }}>{formik.errors.repeatPassword}</small>
                    )}

                    <MDBBtn className='mt-4 w-100 gradient-custom-4' size='lg'
                        onClick={formik.handleSubmit}
                    >
                        Register
                    </MDBBtn>

                    <div>Already have an account?
                        <MDBTypography tag='strong' style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/login')}
                        > Login</MDBTypography>
                    </div>

                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    )
}
