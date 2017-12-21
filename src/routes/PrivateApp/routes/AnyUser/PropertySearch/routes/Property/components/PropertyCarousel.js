import React from 'react';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

class PropertyCarousel extends React.PureComponent {
  render() {
    const { uploadedFiles } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const urlsArr = uploadedFiles
      ? Object.keys(uploadedFiles).map(key => uploadedFiles[key].downloadURL)
      : null;
    return (
      <div style={{ marginBottom: '40px', marginTop: '20px' }}>
        <Slider {...settings}>
          {uploadedFiles
            ? urlsArr.map((url, i) =>
                <img key={url} src={url} alt={`Property ${i}`} />
              )
            : null}
        </Slider>
      </div>
    );
  }
}

PropertyCarousel.propTypes = {
  uploadedFiles: PropTypes.object
};

export default PropertyCarousel;
