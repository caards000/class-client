import Card from "../../components/Card";
import images from "../../assets/images";
import React from "react";
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Link} from "react-router-dom";
import * as yup from "yup";

interface IProps {
}

function ResetPasswordPage(props: IProps) {

    const validationSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Required *")
    })
    interface IPreAuth {
        email: string;
    }

    const initialValue: IPreAuth = {
        email: ""
    }

    const onSubmit = (values: IPreAuth, helpers: FormikHelpers<IPreAuth>) => {
        console.log(values);
    }
    return(
        <>
            <Card className="w-[400px]">
                <img src={images.ClassLogo} alt="Logo" className="h-6 mb-2"/>
                <h4>Reset Password</h4>

                <Formik
                    initialValues={initialValue}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    enableReinitialize
                    >

                    {({isSubmitting, isValid}) => (
                        <Form className="flex flex-col gap-5 mt-10">
                            <Field name="email">
                                {({field, meta}: FieldProps) => (
                                    <div>
                                        <Input
                                            label="Email Address"
                                            placeholder="Email Address"
                                            error={meta.touched && meta.error ? meta.error : ""}
                                            {...field}
                                        />
                                    </div>
                                )}
                            </Field>

                            <div>
                                <Button className="w-full" variant="PRIMARY">Reset Password</Button>
                            </div>

                            <p className="text-center">Remember your password?
                                <Link to="/login" className="m-1 text-blue-500 underline">Login</Link>
                            </p>
                        </Form>
                    )}
                </Formik>

            </Card>
        </>
    )
}

export default ResetPasswordPage