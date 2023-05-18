import Card from "../../components/Card";
import images from "../../assets/images";
import React from "react";
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as yup from "yup"

interface IProps {
}

function SetNewPasswordPage(props: IProps) {

    const validationSchema = yup.object().shape({
        password: yup.string()
            .min(6, "Password must be at least 6 characters")
            .max(30, "Password must not exceed 30 characters")
            .required("Required *"),
        passwordConfirmation: yup.string()
            .test("equalToPassword", "Password Mismatch", (value, context) =>{
                return value === context.parent.password;
            })
    })
    interface IPreAuth{
        password: string;
        passwordConfirmation: string;
    }

    const initialValue: IPreAuth = {
        password: "",
        passwordConfirmation: ""
    }

    const onSubmit = (values: IPreAuth, helpers: FormikHelpers<IPreAuth>) => {
        console.log(values);
    }
    return(
        <>
            <Card className="w-[400px]">
                <img src={images.ClassLogo} alt="Logo" className="h-6 mb-2"/>
                <h4>Set New Password</h4>

                <Formik
                    initialValues={initialValue}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    enableReinitialize
                >
                    {({isSubmitting, isValid}) => (
                        <Form className="flex flex-col gap-5 mt-10">

                            <Field name="password">
                                {({field, meta}: FieldProps) => (
                                    <div>
                                        <Input
                                            label="Enter new password"
                                            type="password"
                                            placeholder="New Password"
                                            error={meta.touched && meta.error ? meta.error : ""}
                                            {...field}
                                        />
                                    </div>
                                )}
                            </Field>

                            <Field name="passwordConfirmation">
                                {({field, meta}: FieldProps) => (
                                    <div>
                                        <Input
                                            label="Confirm entered password"
                                            type="password"
                                            placeholder="New Password Again"
                                            error={meta.touched && meta.error ? meta.error : ""}
                                            {...field}
                                        />
                                    </div>
                                )}
                            </Field>

                            <div>
                                <Button className="w-full" variant="PRIMARY">Reset Password</Button>
                            </div>


                        </Form>
                    )}
                </Formik>

            </Card>
        </>
    )
}

export default SetNewPasswordPage