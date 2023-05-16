import React from 'react';
import Card from "../../components/Card";
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import images from "../../assets/images";

interface IProps {
}

function PreAuthPage(props: IProps) {
  interface IPreAuth {
    email: string;
  }

  const initialValue: IPreAuth = {
    email: "john"
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

        <Formik initialValues={initialValue} onSubmit={onSubmit}>
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
