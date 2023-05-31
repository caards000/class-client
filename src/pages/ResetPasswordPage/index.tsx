import Card from "../../components/Card";
import images from "../../assets/images";
import React from "react";
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import * as yup from "yup";
import {ILoginRequest, IResetPasswordRequest} from "../../types/auth.types";
import authService from "../../services/auth.service";
import utils from "../../utils/utils";

interface IProps {
}

function ResetPasswordPage(props: IProps) {
    const navigate = useNavigate();

    const validationSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Required *")
    })


    const initialValue: IResetPasswordRequest ={
        email: ""
    }

    const onSubmit = (values: IResetPasswordRequest, helpers: FormikHelpers<IResetPasswordRequest>) => {
        authService.resetPassword(values)
            .then((res) => {
                navigate("/")
            })
            .catch((err) => {
                utils.handleRequestError(err, helpers);
            });
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
                                <Button className="w-full" variant="PRIMARY" loading={isSubmitting}>Reset Password</Button>
                            </div>

                            <p className="text-center">Remember your password?
                                <Link to="/auth/login" className="m-1 text-blue-500 underline cursor-pointer">Login</Link>
                            </p>
                        </Form>
                    )}
                </Formik>

            </Card>
        </>
    )
}

export default ResetPasswordPage