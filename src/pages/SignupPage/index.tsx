import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import Card from "../../components/Card";
import images from "../../assets/images";
import Input from "../../components/Input";
import Button from "../../components/Button";
import React, {useEffect} from "react";
import * as Yup from 'yup';
import {Link, useLocation, useNavigate} from "react-router-dom";
import isEmpty from "is-empty";
import {ISignUpRequest} from "../../types/auth.types";
import authService from "../../services/auth.service";
import utils from "../../utils/utils";

interface IProps {
}


function Signup(props: IProps) {
  const params = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmpty(params.state.email)) {
      navigate("/auth");
    }
  }, [navigate, params.state.email]);

  const SignupSchema = Yup.object().shape({
    token: Yup.string()
      // .matches(/^[a-zA-Z0-9_]{6}$/, 'Confirmation code must be of 8 characters')
      .required('Confirmation code is required'),
    fullName: Yup.string()
      .required('Full name is required')
      .min(2, 'Full name should have at least 2 characters')
      .max(50, 'Full name should not exceed 50 characters'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .max(30, 'Password cannot exceed 30 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-=_+[\]{}|\\;:'",.<>/?]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
      )
      .required('Password is required'),
  });

  const initialValue: ISignUpRequest = {
    email: params.state.email,
    token: "",
    fullName: "",
    password: "",
  }

  const onSubmit = (values: ISignUpRequest, helpers: FormikHelpers<ISignUpRequest>) => {
    authService.signup(values)
      .then((res) => {
        navigate("/")
      })
      .catch((err) => {
        utils.handleRequestError(err, helpers);
      });
  }

  return (
    <div>
      <Card className="w-[400px]">
        <img src={images.ClassLogo} alt="Logo" className="h-6 mb-2"/>
        <h4>Sign Up</h4>
        <p className="typo-body-small text-slate-500">
          A confirmation code has been sent to <span
          className="text-primary-normal underline">{params.state.email}</span>, use code to
          proceed with
          registration.
        </p>

        <Formik
          initialValues={initialValue}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({isSubmitting, isValid}) => (
            <Form className="flex flex-col gap-5 mt-10">
              <Field name="token">
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
                      type="password"
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
                  Continue
                </Button>
              </div>

              <div>
                <p className="typo-caption text-slate-600">
                  By signing up means up means you accept our terms and conditions
                </p>
              </div>

              <div className="">
                <p className="typo-body-small text-slate-700">
                  Not you? {" "}
                  <Link to="/auth" className="underline">Go back</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

export default Signup;