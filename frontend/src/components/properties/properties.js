import React from "react";
import axios from "axios";
import Select from "react-select";
import "./properties.css";
import Pagination from "../pagination/pagination";
import PropertyCard from "../property_card/property_card";
import RangeSlider from "../range_slider/RangeSlider";

class Properties extends React.Component {
  state = {
    currentProperties: [],
    currentPage: null,
    totalPages: null,
    price: [],
    size: [],
    selectedType: "",
    selectedCountry: "",
    selectedBathrooms: "",
    selectedBedrooms: "",
    price_range: [],
    size_range: [],
    pageLimit: 6,
    loading: true
  };

  componentDidMount() {
    const criteria = ["price", "size"];
    for (let criterion of criteria) {
      axios.get(`/api/properties/minmax/${criterion}`).then(res => {
        const obj = res.data;
        const arr = [obj.min, obj.max];
        this.setState(
          {
            [criterion + "_range"]: arr,
            [criterion]: arr
          },
          () => {
            if (this.state.price.length > 0 && this.state.size.length > 0) {
              this.setState({
                loading: false
              });
            }
          }
        );
      });
    }
  }

  onPageChanged = data => {
    console.log("On page changed...", data);
    const { currentPage, totalPages, pageLimit, price, size } = data;
    axios
      .get(
        `/api/properties/filter/${currentPage}/${pageLimit}/${price[0]}/${
          price[1]
        }/${size[0]}/${size[1]}`
      )
      .then(res => {
        // TODO
        const currentProperties = res.data;
        console.log(currentProperties);
        console.log(this.state);
        this.setState({
          currentPage,
          currentProperties,
          totalPages,
          loading: false
        });
      });
  };

  update = field => async data => {
    await this.setState({
      [field]: data
    });
    this.onPageChanged(this.state);
    console.log("Updating...");
  };

  render() {
    if (this.state.loading) {
      return <span>Loading</span>;
    }
    return (
      <div className="properties">
        <div className="properties-left">
          <div className="properties-slider">
            <span className="properties-header">Price</span>
            <RangeSlider
              range={this.state.price_range}
              step={1}
              ticks={5}
              onChange={this.update("price")}
            />
          </div>
          <div className="properties-slider">
            <span className="properties-header">Size</span>
            <RangeSlider
              range={this.state.size_range}
              step={1}
              ticks={5}
              onChange={this.update("size")}
            />
          </div>
          <div className="properties-select">
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
        </div>
        <div className="properties-right">
          {this.state.currentProperties.map(property => (
            <PropertyCard
              price={property.price}
              beds={property.bedrooms}
              baths={property.bathrooms}
              size={property.size}
            />
          ))}
          <Pagination
            totalRecords={5}
            pageLimit={6}
            pageNeighbours={1}
            onPageChanged={this.onPageChanged}
            size={this.state.size}
            price={this.state.price}
          />
        </div>
      </div>
    );
  }
}

export default Properties;
