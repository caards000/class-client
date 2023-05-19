import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import Card from "../../components/Card";
import images from "../../assets/images";
import Input from "../../components/Input";
import Button from "../../components/Button";
import React, {useState} from "react";
import * as Yup from 'yup';

interface IProps {
}


function Signup(props: IProps) {
    interface ISignUp {
        confirmationCode: string;
        fullName: string;
        password: string
        accountPolicy: boolean
    }

    const initialValue: ISignUp = {
        confirmationCode: "",
        fullName: "",
        password: "",
        accountPolicy: false
    }
    const[error, setError] = useState<string | null>(null);

    const onSubmit = (values: ISignUp, helpers: FormikHelpers<ISignUp>) => {
        setError(null);
        fetch("http://api/v1/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
            })
            .then((response)=>{
                if(!response.ok){
                    throw new Error("Error occurred during signup");
                }
                console.log("Signup successful");
            })
            .catch((error)=> {
                setError(error.message);
            })
            .finally(()=>{
                helpers.setSubmitting(false);
            });
    }
    const SignupSchema = Yup.object().shape({
        confirmationCode: Yup.string()
            .matches(/^\d{6}$/, 'Confirmation code must be a 6-digit number')
            .required('Confirmation code is required'),
        fullName: Yup.string()
            .required('Full name is required')
            .matches(/^[A-Za-z\s]+$/, 'Full name must only contain letters and spaces')
            .min(2, 'Full name should have at least 2 characters')
            .max(50, 'Full name should not exceed 50 characters'),
        password:  Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .max(20, 'Password cannot exceed 20 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-=_+[\]{}|\\;:'",.<>/?]+$/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
            )
            .required('Password is required'),
        accountPolicy: Yup.boolean()
            .oneOf([true], 'You must agree to the account policy')
            .required('You must agree to the account policy'),
    });

    return (
        <div>
            <Card className="w-[400px]">
                <img src={images.ClassLogo} alt="Logo" className="h-6 mb-2"/>
                <h4>Sign Up</h4>
                <p className="typo-body-small text-slate-500">Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit in a mass form of form of form</p>

                <Formik initialValues={initialValue} validationSchema={SignupSchema} onSubmit={onSubmit}>
                    {({isSubmitting, isValid}) => (
                        <Form className="flex flex-col gap-5 mt-10">
                            <Field name="confirmation code">
                                {({field, meta}: FieldProps) => (
                                    <div>
                                        <Input
                                            label="Enter confirmation code"
                                            placeholder="Enter confirmation code"
                                            error={meta.touched && meta.error ? meta.error : ""}
                                            {...field}
                                        />
                                    </div>
                                )}
                            </Field>

                            <Field name="fullName">
                                {({field, meta}: FieldProps) => (
                                    <div>
                                        <Input
                                            label="Full Name"
                                            placeholder="Enter full name"
                                            error={meta.touched && meta.error ? meta.error : ""}
                                            {...field}
                                        />
                                    </div>
                                )}
                            </Field>

                            <Field name="password">
                                {({field, meta}: FieldProps) => (
                                    <div>
                                        <Input
                                            label="Password"
                                            placeholder="Enter password"
                                            error={meta.touched && meta.error ? meta.error : ""}
                                            {...field}
                                        />
                                    </div>
                                )}
                            </Field>

                            <Field name="accountPolicy">
                                {({ field, meta }: FieldProps<ISignUp['accountPolicy']>) => (
                                    <div>
                                        <label htmlFor="accountPolicy">
                                            <input
                                                type="checkbox"
                                                id="accountPolicy"
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                            Account privacy policy
                                        </label>
                                        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                    </div>
                                )}
                            </Field>



                            <div>
                                <Button className="w-full" variant="PRIMARY">Continue</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
}

export default Signup;