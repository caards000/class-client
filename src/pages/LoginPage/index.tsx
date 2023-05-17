import React from 'react';
import Card from "../../components/Card";
import {Field, FieldProps, Form, Formik, FormikHelpers, } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import images from "../../assets/images"
import * as yup from"yup"
import { Link } from 'react-router-dom';

interface IProps {
}

function Login(props: IProps) {
  interface ILogin {
    email : string;
    password: string;
    rememberme: string;
  }

  const initialValue: ILogin = {
    email : "",
    password: "",
    rememberme: "yes"
  }

  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

  const loginSchema = yup.object().shape({
  email: yup.string().email('please enter a valid email')
    .required("Required*"),
  password: 
    yup
    .string()
    .min(5)
    .matches(passwordRules, {message: 'please create a stronger message'})
    .required("Required*")
})

  const onSubmit = (values: ILogin, helpers: FormikHelpers<ILogin>) => {
    console.log(values);
  }




  return (
    <div>
      <Card className="w-[400px]">
        <img src={images.ClassLogo} alt="Logo" className="h-6 mb-2"/>
        <h4>Login</h4>

        <Formik initialValues={initialValue} validationSchema={loginSchema} onSubmit={onSubmit}>
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

              <Field name="password">
                {({field, meta}: FieldProps) => (
                  <div>
                    <Input
                      label="Password"
                      placeholder="password"
                      error={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  </div>
                )}
              </Field>
              
              <div className='flex justify-between typo-body-small '>
             <Field name='rememberme' value="yes">
                {({field,meta}: FieldProps<ILogin['rememberme']>) => (
                    <div >
                    <input 
                    type='checkbox'
                    {...field}
                    />Remember me
                  </div>
                )}
             </Field>

            <Link to={"/forgot-password"} >Forget password</Link>
            </div>
              

              <div>
                <Button className="w-full" variant="PRIMARY" type='submit'>Login</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

export default Login;
