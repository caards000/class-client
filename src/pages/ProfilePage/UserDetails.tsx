import React, {useMemo, useState} from 'react';
import Avvvatars from "avvvatars-react";
import Button from "../../components/Button";
import {useAppSelector} from "../../redux/hooks";
import Modal from "../../components/Modal";
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import * as yup from "yup";
import Input from "../../components/Input";
import {UpdateUserDetailsRequest} from "../../types/auth.types";
import authService from "../../services/auth.service";
import utils from "../../utils/utils";

interface IProps {
}

function UserDetails(props: IProps) {
  const user = useAppSelector(state => state.auth.user);
  const [modalOpen, setModalOpen] = useState(false);

  const validationSchema = yup.object().shape({
    username: yup.string()
      .min(4, "Cannot be less than 4 characters")
      .max(20, "Cannot be more than 20 characters")
      .matches(/^[a-zA-Z0-9_]{4,20}$/,
        "Invalid pattern: Only a-z, A-Z, 0-9 and _ characters are allowed")
      .required("Required"),
    fullName: yup.string().required('Full name is required'),
  })

  const initialValue: UpdateUserDetailsRequest = useMemo(() => ({
    username: user?.username || "",
    fullName: user?.fullName || ""
  }), [user]);

  const onSubmit = (values: UpdateUserDetailsRequest, helpers: FormikHelpers<UpdateUserDetailsRequest>) => {
    authService.updateUserDetails(values)
      .then(() => {
        helpers.setSubmitting(false);
        setModalOpen(false);
      })
      .catch((err) => {
        utils.handleRequestError(err, helpers)
      })
  }

  return (
    <>
      <div className="flex gap-5">
        <div>
          {/* eslint-disable-next-line react/style-prop-object */}
          <Avvvatars style="shape"
                     value={user?.fullName ?? "Class App"}
                     size={80}
                     border
                     borderColor="#24292e22"
                     borderSize={1}
                     radius={6}
          />
        </div>
        <div>
          <h2>{user?.fullName}</h2>
          <div className="flex flex-wrap gap-2 items-center typo-subtitle-small">
            <p className="text-slate-500 leading-none">@{user?.username ?? "NO_USERNAME"}</p>
            <div className="w-1 h-1 rounded-full bg-slate-400"/>
            <p className="text-slate-500 leading-none">{user?.email}</p>
          </div>
        </div>
        <div className="self-center">
          <Button size="SMALL" variant="PRIMARY" onClick={() => setModalOpen(true)}>
            Edit Profile
          </Button>
        </div>
      </div>

      <Modal isOpen={modalOpen}>
        <div className="w-96">
          <h5>Edit Details</h5>

          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({isSubmitting, isValid, resetForm}) => (
              <Form className="flex flex-col gap-5 mt-10">
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

                <Field name="username">
                  {({field, meta}: FieldProps) => (
                    <div>
                      <Input
                        label="Usernname"
                        placeholder="Enter username"
                        error={meta.touched && meta.error ? meta.error : ""}
                        {...field}
                      />
                    </div>
                  )}
                </Field>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <Button
                    variant="DANGER"
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => {
                      setModalOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="PRIMARY"
                    loading={isSubmitting}
                    disabled={!isValid}
                  >
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
}

export default UserDetails;
