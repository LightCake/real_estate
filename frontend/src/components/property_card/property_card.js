import React from "react";
import "./property_card.css";
import Img from "../../assets/scott-webb-1ddol8rgUH8-unsplash.jpg";

class PropertyCard extends React.Component {
  render() {
    const {
      price,
      beds,
      baths,
      size,
      street,
      postal_code,
      state,
      country
    } = this.props;

    return (
      <div className="property_card">
        <img src={Img} alt="house" className="property_card_img" />
        <span className="property_card_price">{price}</span>
        <div className="property_card_details">
          <span className="property_card_detail">
            <i className="fas fa-bed" /> {beds} bd
          </span>
          <span className="property_card_detail">
            <i className="fas fa-bath" /> {baths} ba
          </span>
          <span className="property_card_detail">{size} sqft</span>
        </div>
        <div className="property_card_address">
          <span className="property_card_street">{street}</span>
          <span className="property_card_postal-code">{postal_code}</span>
          <span className="property_card_place">
            {state}, {country}
          </span>
        </div>
      </div>
    );
  }
}

export default PropertyCard;
