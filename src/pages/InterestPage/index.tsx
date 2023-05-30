import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import "./styles.scss";
import Header from "../../components/Header/Header";

interface Props {
    interests: string[];
}

// const Interest: React.FC<Props> = ({ interests }) => {
//     const handleSubmit = (values: { likes: string[] }) => {
//         console.log('Selected likes:', values.likes);
//     };
//
//     return (
//         <div style={{ width: '100vw', backgroundColor: 'blue'}}>
//             <h1>What do you like?</h1>
//             <Formik
//                 initialValues={{ likes: [] }}
//                 onSubmit={handleSubmit}
//             >
//                 {() => (
//                     <Form>
//                         {interests.map((interest) => (
//                             <div key={interest} style={{ display: 'inline-block', padding: '8px', width: '18vw', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
//                                 <div style={{ backgroundColor: ' #ECECEC', padding: '5px', height: '80px', fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//                                 <label >
//
//                                     <Field
//                                         type="checkbox"
//                                         name="likes"
//                                         value={interest}
//
//
//                                     />
//
//                                         {interest}
//
//                                 </label>
//                                 </div>
//
//                             </div>
//                         ))}
//                         <ErrorMessage name="likes" component="div" />
//                         <br />
//                         <button type="submit">Submit</button>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     );
// };
//
// export default Interest;
const Interest: React.FC<Props> = ({ interests }) => {
    const handleSubmit = (values: { likes: string[] }) => {
        console.log('Selected likes:', values.likes);
    };


    return (
        <>
        <Header/>
        <div className="interest-container">
            <div className={"text"}>
            <button type="submit" className={"text-button"}>Submit</button>
            <h1>What do you like?</h1>
            </div>
            <Formik
                initialValues={{ likes: [] }}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        {interests.map((interest) => (
                            <div className="interest-item" key={interest}>
                                <div className="interest-label">
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="likes"
                                            value={interest}
                                        />
                                        {interest}
                                    </label>
                                </div>
                            </div>
                        ))}
                        <ErrorMessage name="likes" component="div" />
                        <br />

                    </Form>
                )}
            </Formik>
        </div>
        </>
    );
};

export default Interest;
