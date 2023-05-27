import Card from "../../components/Card";
import images from "../../assets/images";
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as yup from "yup"
import {ISetNewPassword} from "../../types/auth.types";
import authService from "../../services/auth.service";
import utils from "../../utils/utils";
import {useNavigate, useSearchParams} from "react-router-dom";

interface IProps {
}

function SetNewPasswordPage(props: IProps) {
    const navigate = useNavigate();
    const[searchParams] = useSearchParams();

    const validationSchema = yup.object().shape({
        password: yup.string()
            .min(6, "Password must be at least 6 characters")
            .max(30, "Password must not exceed 30 characters")
            .required("Required *"),
        passwordConfirmation: yup.string()
            .test("equalToPassword",
                "Password Mismatch",
                (value, context) =>{
                return value === context.parent.password;
            })
    })


    const initialValue: ISetNewPassword = {
        password: "",
        passwordConfirmation: "",
        token: searchParams.get("token")
    }

    const onSubmit = (values: ISetNewPassword, helpers: FormikHelpers<ISetNewPassword>) => {
        const { passwordConfirmation, ...data } = values;
        authService.setNewPassword(data)
            .then((res) => {
                navigate("/auth")
            })
            .catch((err) => {
                utils.handleRequestError(err, helpers);
            });
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
                                <Button
                                    className="w-full"
                                    variant="PRIMARY"
                                    loading={isSubmitting}
                                    disabled={!isValid}
                                >
                                    Reset Password
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </Card>
        </>
    )
}

export default SetNewPasswordPage