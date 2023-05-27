import React from 'react';
import Card from "../../components/Card";
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as yup from "yup";

interface IProps {
}

function CreateCommunity(props: IProps) {
    interface ICreateCommunity {
        name: string;
        description: string;
        category: string;
    }

    const initialValue: ICreateCommunity = {
        name: "",
        description: "",
        category: ""
    }

    const createSchema = yup.object().shape({
        name: yup.string().nonNullable()
            .required("Community name is required")
            .min(5, "Community name too short")
            .max(30, "Community name too long")
        ,
        description: yup.string()
            .min(10, "Be clear in your description")
            .max(300, "Be clear but concise")
            .optional()
        ,
        category: yup.string()
            .required("Community category is required")
            .nonNullable()
    })

    const onSubmit = (values: ICreateCommunity, helpers: FormikHelpers<ICreateCommunity>) => {
        console.log(values);
    }

    return (
        <div>
            <Card className="w-[400px]">
                <h5>Create Community</h5>
                <p className="typo-body-small text-slate-500">Ignite the Power of Connection:<br/> Unite Minds, Create
                    Legacies</p>

                <Formik
                    initialValues={initialValue}
                    validationSchema={createSchema}
                    enableReinitialize
                    onSubmit={onSubmit}>
                    {({isSubmitting, isValid}) => (
                        <Form className="flex flex-col gap-5 mt-10">
                            <Field name="name">
                                {({field, meta}: FieldProps) => (
                                    <div>
                                        <Input
                                            label="Community Name"
                                            placeholder="Java Developers"
                                            error={meta.touched && meta.error ? meta.error : ""}
                                            {...field}
                                        />
                                    </div>
                                )}
                            </Field>

                            <Field name="description">
                                {({field, meta}: FieldProps) => (
                                    <div>
                                        <Input
                                            label="Community Description"
                                            placeholder="Community for Java Developers"
                                            error={meta.touched && meta.error ? meta.error : ""}
                                            {...field}
                                        />
                                    </div>
                                )}
                            </Field>

                            <Field name="category">
                                {({field, meta}: FieldProps) => (
                                    <div>
                                        <Input
                                            label="Category"
                                            placeholder="Intermediate"
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
                                    disabled={!isValid}
                                >Create Community</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
}

export default CreateCommunity;
