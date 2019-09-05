import React from "react";
import Select from "react-select";
import "./properties.css";
import Pagination from "../pagination/pagination";
import PropertyCard from "../property_card/property_card";
import RangeSlider from "../range_slider/RangeSlider";
import Spinner from "../spinner/spinner";

class Properties extends React.Component {
  componentDidMount() {
    const criteria = {
      min_max: ["price", "size"],
      distinct: ["type", "bedrooms", "bathrooms"]
    };
    this.props.fetchValues(criteria);
  }

  componentWillUnmount() {
    this.props.toggleLoading();
  }

  onPageChanged = async data => {
    const { currentPage, totalPages } = data;
    await this.props.receiveCurrentAndTotalPage({ currentPage, totalPages });
    await this.props.fetchFilteredProperties(data);
    console.log("On Page Changed");
    console.log(this.props.filter.loading);
  };

  update = field => async data => {
    await this.setState({
      [field]: data
    });
    this.onPageChanged(this.state);
  };

  render() {
    if (this.props.filter.loading) {
      return <Spinner />;
    }
    return (
      <div className="properties">
        <div className="properties-left">
          <div className="properties-slider">
            <span className="properties-header">Price</span>
            <RangeSlider
              range={this.props.filter.price}
              step={1000}
              ticks={5}
              onChange={this.update("price")}
            />
          </div>
          <div className="properties-slider">
            <span className="properties-header">Size</span>
            <RangeSlider
              range={this.props.filter.size}
              step={1}
              ticks={5}
              onChange={this.update("size")}
            />
          </div>
          <div className="properties-select">
            <div className="select-container">
              <span className="select-header">Type</span>
              <Select
                name="Type"
                className="select_width"
                placeholder="Type"
                value={this.props.filter.selectedType}
                onChange={this.update("selectedType")}
                options={this.props.filter.type}
              />
            </div>
            <Select
              name="Country"
              className="select_width"
              placeholder="Country"
              value={this.props.filter.selectedCountry}
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
              value={this.props.filter.selectedBathrooms}
              onChange={this.update("selectedBathrooms")}
              options={this.props.filter.bathrooms}
            />
            <Select
              name="Bedrooms"
              className="select_width"
              placeholder="Bedrooms"
              value={this.props.filter.selectedBedrooms}
              onChange={this.update("selectedBedrooms")}
              options={this.props.filter.bedrooms}
            />
          </div>
        </div>
        <div className="properties-right">
          {this.props.properties.map(property => (
            <PropertyCard
              price={property.price}
              beds={property.bedrooms}
              baths={property.bathrooms}
              size={property.size}
            />
          ))}
          <Pagination
            totalRecords={this.props.pagination.totalRecords}
            pageLimit={this.props.pagination.pageLimit}
            pageNeighbours={this.props.pagination.pageNeighbours}
            onPageChanged={this.onPageChanged}
            size={this.props.filter.selectedSize}
            price={this.props.filter.selectedPrice}
            selectedType={this.props.filter.selectedType}
            selectedBedrooms={this.props.filter.selectedBedrooms}
            selectedBathrooms={this.props.filter.selectedBathrooms}
          />
        </div>
      </div>
    );
  }
}

export default Properties;
