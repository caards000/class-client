import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

interface Props {
    interests: string[];
}

const Interest: React.FC<Props> = ({ interests }) => {
    const handleSubmit = (values: { likes: string[] }) => {
        console.log('Selected likes:', values.likes);
    };

    return (
        <div>
            <h1>What do you like?</h1>
            <Formik
                initialValues={{ likes: [] }}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        {interests.map((interest) => (
                            <div key={interest}>
                                <label>
                                    <Field
                                        type="checkbox"
                                        name="likes"
                                        value={interest}
                                    />
                                    {interest}
                                </label>
                            </div>
                        ))}
                        <ErrorMessage name="likes" component="div" />
                        <br />
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Interest;
