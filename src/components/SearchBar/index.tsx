import {Field, FieldProps, Form, Formik, FormikHelpers} from "formik";
import {SearchType} from "../../types/search.types";
import {useNavigate} from "react-router-dom";
import {Icon} from "@iconify/react";

interface IProps {

}

function SearchBar(props: IProps) {
  const navigate = useNavigate();

  const initialValue: SearchType = {
    query: "",
  }

  const onSubmit = (values: SearchType, helpers: FormikHelpers<SearchType>) => {
    navigate(`/search?query=${values.query}&type=group`);
    helpers.setSubmitting(false);
    helpers.resetForm();
  }

  return (
    <div className="flex items-center justify-center h-full px-2">
      <Formik initialValues={initialValue} onSubmit={onSubmit}>
        <Form>
          <Field name="query">
            {({field}: FieldProps) => (
              <div className="relative">
                <Icon icon="akar-icons:search" width={20} height={20} className="absolute top-[50%] translate-y-[-50%] left-3 text-slate-500"/>
                <input
                  className="input h-8 pl-10 typo-body-small w-[300px]"
                  type="search"
                  placeholder="Search for groups, posts..."
                  {...field}
                />
              </div>
            )}
          </Field>
        </Form>
      </Formik>
    </div>
  )
}

export default SearchBar