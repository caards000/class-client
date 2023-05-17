import React from 'react';
import Card from "../../components/Card";
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import * as yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import images from "../../assets/images";

interface IProps {
}

function PreAuthPage(props: IProps) {
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Required *"),
    fullName: yup.string().required("Required *"),
    password: yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be at most 30 characters")
      .required("Required *"),
    passwordConfirmation: yup.string()
      .test("equalToPassword", "Password mismatch", (value, context) => {
        return value === context.parent.password;
      })
      .required("Required *"),
    noOfSiblings: yup.number()
      .min(1, "Cannot be less than 1")
      .required("Required *"),
    familyPosition: yup.number()
      .test("familyPosition", "Position not in range on siblings", (value, context) => {
        return !(value && (value < 1 || value > context.parent.noOfSiblings));
      })
      .required("Required *")
  });

  interface IPreAuth {
    email: string;
    fullName: string;
    password: string;
    passwordConfirmation: string;
  }

  const initialValue: IPreAuth = {
    email: "",
    fullName: "",
    password: "",
    passwordConfirmation: "",
  }

  const onSubmit = (values: IPreAuth, helpers: FormikHelpers<IPreAuth>) => {
    console.log(values);
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

              <Field name="fullName">
                {({field, meta}: FieldProps) => (
                  <div>
                    <Input
                      label="Full Name"
                      placeholder="Full Name"
                      error={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  </div>
                )}
              </Field>

              <Field name="noOfSiblings">
                {({field, meta}: FieldProps) => (
                  <div>
                    <Input
                      label="Number of siblings"
                      placeholder="Number of siblings"
                      error={meta.touched && meta.error ? meta.error : ""}
                      {...field}
                    />
                  </div>
                )}
              </Field>

              <Field name="familyPosition">
                {({field, meta}: FieldProps) => (
                  <div>
                    <Input
                      label="Family Position"
                      placeholder="Family Position"
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
                      placeholder="Password"
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
                      label="Confirm Password"
                      placeholder="Confirm Password"
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
