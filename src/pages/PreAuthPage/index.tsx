import React from 'react';
import Card from "../../components/Card";
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import * as yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import images from "../../assets/images";
import {InitAuth, NextAuthStep} from "../../types/auth.types";
import authService from "../../services/auth.service";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

interface IProps {
}

function PreAuthPage(props: IProps) {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email address is required"),
  });

  const initialValue: InitAuth = {
    email: ""
  }

  const onSubmit = (values: InitAuth, helpers: FormikHelpers<InitAuth>) => {
    authService.initAuth(values)
      .then((res) => {
        if (res === NextAuthStep.LOGIN) {
          navigate("/auth/login", {
            state: {
              email: values.email,
            }
          })
        } else if (res === NextAuthStep.SIGNUP) {
          navigate("/auth/signup")
        }
        helpers.setSubmitting(false);
      })
      .catch((err) => {
        if (err.response?.data.data) {
          helpers.setErrors(err.response.data.data)
          toast.error(err.response.data.message)
        } else if (err.response?.data?.message) {
          toast.error(err.response.data.message)
        } else {
          toast.error(err.message)
        }
      })
  }

  return (
    <div>
      <Card className="w-[400px]">
        <img src={images.ClassLogo} alt="Logo" className="h-6 mb-2"/>
        <h4>Get Started</h4>
        <p className="typo-body-small text-slate-500">Lorem ipsum dolor sit amet, consectetur
          adipiscing elit in a mass form of form of form</p>

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
                <Button className="w-full" variant="PRIMARY">Continue</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

export default PreAuthPage;
