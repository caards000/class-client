import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
// @ts-ignore
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import Button from "../Button";
import {CreatePostType} from "../../types/post.types";
import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';

interface IProps {
}

function CreatePost(props: IProps) {
  const initialValue: CreatePostType = {
    group: 1,
    content: "",
    plainText: "",
  }

  const onSubmit = (value: CreatePostType, helpers: FormikHelpers<CreatePostType>) => {
    console.log(value)
  }

  return (
    <div className="">
      <Formik initialValues={initialValue} onSubmit={onSubmit}>
        {({values, isSubmitting, setFieldValue, resetForm}) => (
          <Form>
            <Field name="content">
              {({field, meta}: FieldProps) => (
                <div>
                  <CKEditor
                    editor={Editor}
                    config={{placeholder: "Say something..."}}
                    data={field.value}
                    disabled={isSubmitting}
                    onChange={(e, editor) => {
                      setTimeout(() => {
                        // @ts-ignore
                        setFieldValue("plainText", viewToPlainText(editor.editing.view.document.getRoot()))
                      }, 100)
                      const event = {
                        target: {
                          value: editor.data.get(),
                          name: field.name
                        }
                      }
                      field.onChange(event)
                    }}
                  />
                </div>
              )}
            </Field>
            {
              values.plainText && values.plainText.length > 0 && (
                <div className="mt-3 flex items-center justify-end gap-3">
                  <Button
                    variant="DEFAULT"
                    size="SMALL"
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => resetForm()}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="PRIMARY"
                    size="SMALL"
                    type="submit"
                    loading={isSubmitting}
                  >
                    Create post
                  </Button>
                </div>
              )
            }
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreatePost;
