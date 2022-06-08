import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup } from 'reactstrap';
import * as yup from 'yup';
import { PHO_TO_CATEGORY_OPTIONS } from '../../../../constants/global';
import InputFiled from '../../../../custom-filed/InputFiled';
import RandomPhotoField from '../../../../custom-filed/RandomPhotoField';
import SelectField from '../../../../custom-filed/SelectionField';


PhotoForm.propTypes = {
    onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
    onSubmit: null,
}

function PhotoForm(props) {

    const { initialValue, isAddPhoto } = props;
    const validationSchema = yup.object().shape({
        title: yup.string().required('This field  is required.'),

        categoryId: yup.number().required('This field  is required.').nullable(),

        photo: yup.string().when('categoryId', {
            is: 1,
            then: yup.string().required('This field  is required.'),
            otherwise: yup.string().notRequired(),
        }),
    })


    return (
        <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={props.onSubmit}
        >
            {formikProps => {
                return (
                    <Form>
                        <FastField
                            name="title"
                            component={InputFiled}

                            label="Title"
                            placeholder="Eg: Wow nature..."
                        />

                        <FastField
                            name="categoryId"
                            component={SelectField}

                            label="Category"
                            placeholder="What is your photo category?"
                            options={PHO_TO_CATEGORY_OPTIONS} />


                        <FastField
                            name="photo"
                            component={RandomPhotoField}
                            label="Photo"
                        />

                        <FormGroup>
                            <Button type='submit' color={isAddPhoto ? 'primary' : 'success'}  >
                                {/* {isSubmitting && <Spinner size="sm" />} */}
                                {isAddPhoto ? 'Add to album' : 'Edit album'}
                            </Button>
                        </FormGroup>
                    </Form>
                )
            }}
        </Formik>
    );
}

export default PhotoForm;