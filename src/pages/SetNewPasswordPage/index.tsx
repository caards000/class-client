import Card from "../../components/Card";
import images from "../../assets/images";
import React from "react";
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";

interface IProps {
}

function SetNewPasswordPage(props: IProps) {
    interface IPreAuth{
        password: string;
        passwordAgain: string;
    }

    const initialValue: IPreAuth = {
        password: "",
        passwordAgain: ""
    }

    const onSubmit = (values: IPreAuth, helpers: FormikHelpers<IPreAuth>) => {
        console.log(values);
    }
    return(
        <>
            <Card className="w-[400px]">
                <img src={images.ClassLogo} alt="Logo" className="h-6 mb-2"/>
                <h4>Set New Password</h4>

                <Formik initialValues={initialValue} onSubmit={onSubmit}>
                    {({isSubmitting, isValid}) => (
                        <Form className="flex flex-col gap-5 mt-10">

                            <Field name="password">
                                {({field, meta}: FieldProps) => (
                                    <div>
                                        <Input
                                            label="Enter New Password"
                                            type="password"
                                            placeholder="New Password"
                                            error={meta.touched && meta.error ? meta.error : ""}
                                            {...field}
                                        />
                                    </div>
                                )}
                            </Field>

                            <Field name="passwordAgain">
                                {({field, meta}: FieldProps) => (
                                    <div>
                                        <Input
                                            label="Enter New Password Again"
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