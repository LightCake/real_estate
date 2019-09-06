import React from "react";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import "./main_page.css";
import CozyRoom from "../../assets/cozy-room.jpg";
import PropertyCard from "../property_card/property_card";
import SquareFact from "../square_fact/square_fact";

class MainPage extends React.Component {
  componentDidMount() {
    const criteria = {
      min_max: ["price", "size"],
      distinct: ["type", "bedrooms", "bathrooms"]
    };
    this.props.fetchValues(criteria);
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
            <Select
              name="Type"
              className="select_width"
              placeholder="Type"
              value={this.props.filter.selectedType}
              onChange={this.props.update("selectedType")}
              options={this.props.filter.type}
            />
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
            <Select
              name="Bathrooms"
              className="select_width"
              placeholder="Bathrooms"
              value={this.props.filter.selectedBathrooms}
              onChange={this.props.update("selectedBathrooms")}
              options={this.props.filter.bathrooms}
            />
            <Select
              name="Bedrooms"
              className="select_width"
              placeholder="Bedrooms"
              value={this.props.filter.selectedBedrooms}
              onChange={this.props.update("selectedBedrooms")}
              options={this.props.filter.bedrooms}
            />
          </div>
          <button className="main_page_filter_button" onClick={this.handleFind}>
            Find Here
          </button>
        </div>
        <div className="main_page_data">
          <SquareFact />
          <SquareFact />
          <SquareFact />
          <SquareFact />
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
