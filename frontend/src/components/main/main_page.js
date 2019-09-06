import React from "react";
import Select from "react-select";
import "./main_page.css";
import CozyRoom from "../../assets/cozy-room.jpg";
import PropertyCard from "../property_card/property_card";
import SquareFact from "../square_fact/square_fact";
import Spinner from "../spinner/spinner";

class MainPage extends React.Component {
  componentDidMount() {
    const criteria = {
      min_max: ["price", "size"],
      distinct: ["type", "bedrooms", "bathrooms"]
    };
    this.props.fetchValues(criteria);
    this.props.fetchGeneralData();
    this.props.fetchNewestProperties("house");
  }

  handleFind = () => {
    this.props.history.push("/properties");
  };

  render() {
    return (
      <div className="main_page">
        <div className="main_page_filter">
          <span className="main_page_quote">
            "How lucky I am to have something that makes saying goodbye so hard"
            - Winnie the Pooh.
          </span>
          <span className="main_page_title">Search and Find Your Own Home</span>
          <div className="main_page_select_container">
            <div className="main_page_select">
              <span style={{ color: "white" }}>Type</span>
              <Select
                name="Type"
                className="select_width"
                placeholder="Type"
                value={this.props.filter.selectedType}
                onChange={this.props.update("selectedType")}
                options={this.props.filter.type}
              />
            </div>
            <div className="main_page_select">
              <span style={{ color: "white" }}>Country</span>
              <Select
                name="Country"
                className="select_width"
                placeholder="Country"
                value={"poo"}
                onChange={() => console.log("Select Country")}
                options={[
                  { value: "australia", label: "Australia" },
                  { value: "germany", label: "Germany" },
                  { value: "southkorea", label: "South Korea" },
                  { value: "switzerland", label: "Switzerland" },
                  { value: "usa", label: "United States of America" }
                ]}
              />
            </div>
            <div className="main_page_select">
              <span style={{ color: "white" }}>Bathrooms</span>
              <Select
                name="Bathrooms"
                className="select_width"
                placeholder="Bathrooms"
                value={this.props.filter.selectedBathrooms}
                onChange={this.props.update("selectedBathrooms")}
                options={this.props.filter.bathrooms}
              />
            </div>
            <div className="main_page_select">
              <span style={{ color: "white" }}>Bedrooms</span>
              <Select
                name="Bedrooms"
                className="select_width"
                placeholder="Bedrooms"
                value={this.props.filter.selectedBedrooms}
                onChange={this.props.update("selectedBedrooms")}
                options={this.props.filter.bedrooms}
              />
            </div>
          </div>
          <button className="main_page_filter_button" onClick={this.handleFind}>
            Find Here
          </button>
        </div>
        <div className="main_page_data">
          {this.props.general.loading ? (
            <div className="main_page_spinner">
              <Spinner />
            </div>
          ) : (
            <React.Fragment>
              <SquareFact
                color="#00171f"
                number={this.props.general.users}
                addition="registered"
                category="Users"
              />
              <SquareFact
                color="#003459"
                number={this.props.general.listed}
                addition="listed"
                category="Properties"
              />
              <SquareFact
                color="#007ea7"
                number={this.props.general.sold}
                addition="sold"
                category="Properties"
              />
              <SquareFact
                color="#00a8e8"
                number={this.props.general.countries}
                category="Countries"
              />
            </React.Fragment>
          )}
        </div>
        <div className="main_page_about-us">
          <img
            src={CozyRoom}
            className="main_page_about-us_img"
            alt="cozy room"
          />
          <div className="main_page_about-us_text_container">
            <div className="main_page_about-us_text">
              <span className="main_page_about-us_title">About Us</span>
              <span>
                We are a family-owned startup named "Kazoku" founded in 2016
                based in Berlin, Germany with 15 years experience of the real
                estate industry. With the opening of this plattform, we want to
                give anybody the opportunity to sell and buy properties with
                ease.
              </span>
            </div>
          </div>
        </div>
        <div className="main_page_latest">
          <span className="main_page_latest_title">Latest Properties</span>
          <div className="main_page_latest_buttons">
            <button className="round_button">Houses</button>
            <button className="round_button">Apartments</button>
          </div>
          <div className="main_page_latest_properties">
            {this.props.properties.map(property => (
              <PropertyCard
                price={property.price}
                beds={property.bedrooms}
                baths={property.bathrooms}
                size={property.size}
                street={property.street}
                postal_code={property.postal_code}
                state={property.state}
                country={property.country}
              />
            ))}
          </div>
        </div>
        <footer>Copyright &copy; 2019 Real Estate</footer>
      </div>
    );
  }
}

export default MainPage;
