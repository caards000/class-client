import React from 'react';
import Card from "../../components/Card";
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as yup from "yup";
import Container from "../../components/Container";
import {useLocation, useNavigate} from "react-router-dom";
import {CreateGroupType} from "../../types/group.types";
import communityService from "../../services/community.service";
import utils from "../../utils/utils";
import {useAppDispatch} from "../../redux/hooks";
import {groupActions} from "../../redux/slices/groupSlice";

interface IProps {
}

function CreateCommunity(props: IProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const initialValue: CreateGroupType = {
    groupName: "",
    slug: "",
    description: "",
  }

  const createSchema = yup.object().shape({
    groupName: yup.string().nonNullable()
      .required("Community name is required")
      .min(5, "Community name too short")
      .max(30, "Community name too long"),
    slug: yup.string()
      .test("checkFormat", "Invalid slug syntax", (value) => {
        const pattern = new RegExp(/^[a-zA-Z0-9-]{4,30}$/, "g");
        return pattern.test(value || "");
      })
      .required("Required")
  })

  const onSubmit = (values: CreateGroupType, helpers: FormikHelpers<CreateGroupType>) => {
    communityService.createCommunity(values)
      .then((group) => {
        helpers.setSubmitting(false);
        dispatch(groupActions.addGroup(group));
        navigate(`/community/${group.slug}`);
      })
      .catch((err) => {
        utils.handleRequestError(err, helpers);
      });
  }

  return (
    <Container>
      <div className="mt-8">
        <div>
          <Card className="w-[400px]">

            <Button
              size="SMALL"
              variant="DEFAULT"
              className="mb-3"
              onClick={() => {
                location.key === "default" ? navigate("/") : navigate(-1);
              }}
            >
              Go back
            </Button>

            <h5>Create Community</h5>
            <p className="typo-body-small text-slate-500">Ignite the Power of
              Connection:<br/> Unite Minds, Create
              Legacies</p>

            <Formik
              initialValues={initialValue}
              validationSchema={createSchema}
              enableReinitialize
              onSubmit={onSubmit}>
              {({isSubmitting, isValid}) => (
                <Form className="flex flex-col gap-5 mt-10">
                  <Field name="groupName">
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

                  <Field name="slug">
                    {({field, meta}: FieldProps) => (
                      <div>
                        <Input
                          label="Slug"
                          placeholder="E.g. java-spring-dev"
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

                  <div>
                    <Button
                      className="w-full"
                      variant="PRIMARY"
                      disabled={!isValid || isSubmitting}
                      loading={isSubmitting}
                    >
                      Create Community
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        </div>
      </div>
    </Container>

  );
}

export default CreateCommunity;
