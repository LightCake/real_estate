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

  onPageChanged = data => {
    const { currentPage, totalPages } = data;
    this.props.receiveCurrentAndTotalPage({ currentPage, totalPages });
    this.props.fetchFilteredProperties(data);
  };

  update = field => async data => {
    await this.props.update(field)(data);
    const {
      currentPage,
      totalPages,
      pageLimit,
      totalRecords
    } = this.props.pagination;
    const {
      selectedSize,
      selectedPrice,
      selectedType,
      selectedBedrooms,
      selectedBathrooms
    } = this.props.filter;
    const paginationData = {
      currentPage,
      totalPages,
      pageLimit,
      totalRecords,
      selectedSize,
      selectedPrice,
      selectedType,
      selectedBedrooms,
      selectedBathrooms
    };
    this.onPageChanged(paginationData);
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
              onChange={this.update("selectedPrice")}
            />
          </div>
          <div className="properties-slider">
            <span className="properties-header">Size</span>
            <RangeSlider
              range={this.props.filter.size}
              step={1}
              ticks={5}
              onChange={this.update("selectedSize")}
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
            <div className="select-container">
              <span className="select-header">Country</span>
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
            </div>
            <div className="select-container">
              <span className="select-header">Bathrooms</span>
              <Select
                name="Bathrooms"
                className="select_width"
                placeholder="Bathrooms"
                value={this.props.filter.selectedBathrooms}
                onChange={this.update("selectedBathrooms")}
                options={this.props.filter.bathrooms}
              />
            </div>
            <div className="select-container">
              <span className="select-header">Bedrooms</span>
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
        </div>
        <div className="properties-right">
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
          <Pagination
            totalRecords={this.props.pagination.totalRecords}
            pageLimit={this.props.pagination.pageLimit}
            pageNeighbours={this.props.pagination.pageNeighbours}
            onPageChanged={this.onPageChanged}
            selectedSize={this.props.filter.selectedSize}
            selectedPrice={this.props.filter.selectedPrice}
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
