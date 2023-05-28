import React, {useEffect} from 'react';
import Card from "../../components/Card";
import {Field, FieldProps, Form, Formik, FormikHelpers,} from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import images from "../../assets/images"
import * as yup from "yup"
import {Link, useLocation, useNavigate} from "react-router-dom";
import isEmpty from "is-empty";
import authService from "../../services/auth.service";
import utils from "../../utils/utils";
import {ILoginRequest} from "../../types/auth.types";

interface IProps {
}

function Login(props: IProps) {
  const params = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmpty(params.state.email)) {
      navigate("/auth");
    }
  }, [navigate, params.state.email])

  const initialValue: ILoginRequest = {
    email: params.state.email,
    password: ""
  }

  // const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

  const loginSchema = yup.object().shape({
    email: yup.string().email('please enter a valid email')
      .required("Required"),
    password:
      yup
        .string()
        .min(6)
        // .matches(passwordRules, {message: 'please create a stronger message'})
        .required("Required")
  })

  const onSubmit = (values: ILoginRequest, helpers: FormikHelpers<ILoginRequest>) => {
    authService.login(values)
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
        <h4>Login</h4>

        <Formik
          initialValues={initialValue}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
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
                      disabled
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
                      placeholder="password"
                      type="password"
                      error={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  </div>
                )}
              </Field>

              <div>
                <p>
                  <Link to="/auth/reset-password" className="typo-body-small">Forgot
                    password?</Link>
                </p>
              </div>

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
                <p className="typo-body-small text-slate-700">
                  Not {params.state.email}? {" "}
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

export default Login;
