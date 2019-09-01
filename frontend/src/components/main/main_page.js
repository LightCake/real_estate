import React from "react";
import Select from "react-select";
import "./main_page.css";
import CozyRoom from "../../assets/cozy-room.jpg";
import PropertyCard from "../property_card/property_card";

class MainPage extends React.Component {
  state = {
    selectedType: "",
    selectedCountry: "",
    selectedBathrooms: "",
    selectedBedrooms: ""
  };

  update = field => data => {
    this.setState({ [field]: data });
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
            <Select
              name="Type"
              className="select_width"
              placeholder="Type"
              value={this.state.selectedType}
              onChange={this.update("selectedType")}
              options={[
                { value: "apartment", label: "Apartment" },
                { value: "house", label: "House" }
              ]}
            />
            <Select
              name="Country"
              className="select_width"
              placeholder="Country"
              value={this.state.selectedCountry}
              onChange={this.update("selectedCountry")}
              options={[
                { value: "australia", label: "Australia" },
                { value: "germany", label: "Germany" },
                { value: "southkorea", label: "South Korea" },
                { value: "switzerland", label: "Switzerland" },
                { value: "usa", label: "United States of America" }
              ]}
            />
            <Select
              name="Bathrooms"
              className="select_width"
              placeholder="Bathrooms"
              value={this.state.selectedBathrooms}
              onChange={this.update("selectedBathrooms")}
              options={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" }
              ]}
            />
            <Select
              name="Bedrooms"
              className="select_width"
              placeholder="Bedrooms"
              value={this.state.selectedBedrooms}
              onChange={this.update("selectedBedrooms")}
              options={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" }
              ]}
            />
          </div>
          <button className="main_page_filter_button">Find Here</button>
        </div>
        <div className="main_page_about-us">
          <img src={CozyRoom} className="main_page_about-us_img" />
          <div className="main_page_about-us_text_container">
            <div className="main_page_about-us_text">
              <span className="main_page_about-us_title">About Us</span>
              <span>We are</span>
              <ul>
                <li>a family owned real estate business</li>
                <li>founded in 2016</li>
                <li>based in Berlin</li>
                <li>with 15 years of experience</li>
              </ul>
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
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
          </div>
        </div>
        <footer>Copyright &copy; 2019 Real Estate</footer>
      </div>
    );
  }
}

export default MainPage;
