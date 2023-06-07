import React, {useEffect, useMemo, useState} from 'react';
import {Form, Formik, FormikHelpers} from "formik";
import {Icon} from '@iconify/react';
import {IInterest, InterestRequestType} from "../../types/interest.types";
import isEmpty from "is-empty";
import interestService from "../../services/interest.service";
import utils from "../../utils/utils";
import {EmptyPage, PageType} from "../../types/page.types";
import Input from "../Input";
import Button from "../Button";
import toast from "react-hot-toast";
import {useAppSelector} from "../../redux/hooks";

interface IProps {
  onSuccessful?: () => void;
  onCancel?: () => void;
}

function SetInterests({onSuccessful, onCancel}: IProps) {
  const savedUserInterests = useAppSelector(state => state.auth.interests);
  const [allInterests, setAllInterests] = useState<PageType<IInterest>>(EmptyPage);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (isEmpty(allInterests.content)) {
      interestService.getAllInterests()
        .then(res => setAllInterests(res))
        .catch((err) => {
          utils.handleRequestError(err);
        })
    }
  }, [allInterests]);

  const initialValues: InterestRequestType = useMemo(() => ({
    interestsId: savedUserInterests.map((i) => i.id),
  }), [savedUserInterests])

  const onSubmit = (values: InterestRequestType, helpers: FormikHelpers<InterestRequestType>) => {
    interestService.saveUserInterests(values)
      .then(() => {
        toast.success("User interests updated")
        !!onSuccessful && onSuccessful();
      })
      .catch((err) => {
        utils.handleRequestError(err, helpers);
      });
  }

  return (
    <div>
      <h5 className="mb-5">Set Interests</h5>

      <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
        {({values, setFieldValue, isSubmitting, resetForm}) => (
          <Form>
            <div>
              <p className="typo-subtitle">Selected Interests</p>

              <div className="flex gap-3 flex-wrap mb-10">
                {
                  allInterests.content.filter((i) => values.interestsId.indexOf(i.id) >= 0)
                    .map((interest, index) => (
                      <div
                        key={index}
                        className="border border-slate-200 pl-2 pr-4 py-2 rounded shadow flex gap-2 items-center">
                        <button
                          type="button"
                          className="hover:bg-slate-200 apply-transition text-red-500 rounded"
                          onClick={() => {
                            setFieldValue("interestsId", values.interestsId.filter(i => i !== interest.id))
                          }}
                        >
                          <Icon
                            icon="ic:twotone-close"
                            width={24}
                            height={24}
                          />
                        </button>
                        <p className="leading-none">{interest.name}</p>
                      </div>
                    ))
                }
              </div>
            </div>

            <p className="typo-subtitle">All Interests</p>

            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search interests"
              onSubmit={(e) => e.preventDefault()}
            />

            <div className="flex gap-3 flex-wrap mt-3">
              {
                allInterests.content.filter((i) => (i.name.includes(search) || isEmpty(search)) && !values.interestsId.includes(i.id))
                  .map((interest, index) => (
                    <button
                      key={index}
                      type="button"
                      className="border border-slate-200 hover:bg-slate-100 apply-transition px-4 py-2 rounded shadow flex gap-2 items-center"
                      onClick={() => {
                        setFieldValue("interestsId", [...values.interestsId, interest.id]);
                      }}
                    >
                      <p className="leading-none">{interest.name}</p>
                    </button>
                  ))
              }

            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button
                variant="DANGER"
                disabled={isSubmitting}
                type="button"
                onClick={() => {
                  !!onCancel && onCancel();
                  resetForm();
                }}
              >
                Cancel
              </Button>

              <Button
                variant="PRIMARY"
                loading={isSubmitting}
              >
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SetInterests;
