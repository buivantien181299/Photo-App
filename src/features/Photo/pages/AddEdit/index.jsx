import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Banner from '../../../../components/Banner';
import { randomNumber } from '../../../../utils/common';
import PhotoForm from '../../componants/PhotoForm';
import { addPhoto, updatePhoto } from '../../photoSlice';
import './style.scss';


AddEditPage.propTypes = {

};

function AddEditPage(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { photoId } = useParams();
    const isAddPhoto = !photoId;

    const editPhoto = useSelector(state => state.photos.find(x => x.id === +photoId));

    const initialValue = isAddPhoto ?
        {
            title: '',
            categoryId: null,
            photo: '',
        } :
        editPhoto;

    const handleSubmit = (values) => {

        return new Promise(resolve => {
            console.log("Form submit: xxx ", values);

            setTimeout(() => {

                if (isAddPhoto) {
                    const newPhoto = {
                        ...values,
                        id: randomNumber(10000, 99999),
                    }
                    const action = addPhoto(newPhoto);
                    dispatch(action);

                } else {
                    // do edit
                    const action = updatePhoto(values);
                    dispatch(action);
                }

                history.push('/photos');
                resolve(true);
            }, 2000);

        })

    }

    return (
        <div className="photo-edit">
            <Banner title='Pick your amazing photo ' />
            <div className='photo-edit__form'>
                <PhotoForm
                    isAddPhoto={isAddPhoto}
                    initialValue={initialValue}
                    onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default AddEditPage;