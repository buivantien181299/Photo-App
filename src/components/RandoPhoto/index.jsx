import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Button } from 'reactstrap';

RandomPhoto.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    onImageUrlChange: PropTypes.func,
    onRandemButtonBlur: PropTypes.func,
};

RandomPhoto.defaultProps = {
    name: '',
    imageUrl: '',
    onImageUrlChange: null,
    onRandemButtonBlur: null,
}

const getRandomImageUrl = () => {
    const getRandomId = Math.trunc(Math.random() * 2000);
    return `https://picsum.photos/id/${getRandomId}/300/300`;
}


function RandomPhoto(props) {

    const { name, imageUrl, onImageUrlChange, onRandemButtonBlur } = props;

    const handleRandomPhotoClick = async () => {
        if (onImageUrlChange) {
            const randomImageUrl = getRandomImageUrl();
            onImageUrlChange(randomImageUrl);
        }
    }

    return (
        <div className="random-photo">
            <div className="random-photo__button">
                <Button
                    outline
                    name={name}
                    color='primary'
                    onBlur={onRandemButtonBlur}
                    onClick={handleRandomPhotoClick}
                >
                    Random a photo
                </Button>
            </div>
            <div className='random-photo__photo'>
                {imageUrl && <img src={imageUrl} alt='Ooops... not found. Please click again'
                    onError={handleRandomPhotoClick}
                />}
            </div>
        </div>
    );
}

export default RandomPhoto;