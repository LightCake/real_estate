import React from "react";
import Select from "react-select";
import "./sell.css";
import Input from "../input/input";

class Sell extends React.Component {
  state = {
    type: "",
    bed: "",
    bath: "",
    price: "",
    size: "",
    description: "",
    built: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    images: []
  };

  update = field => event => {
    this.setState({
      [field]: event.target.value
    });
  };

  handleSelect = field => selectedOption => {
    this.setState({
      [field]: selectedOption
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.list(this.state);
  };

  widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dzqtmwpgs",
      uploadPreset: "lhqttnqn"
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        this.setState(prevState => ({
          ...prevState,
          images: prevState.images.concat(result.info.secure_url)
        }));
      }
    }
  );

  showWidget = () => {
    this.widget.open();
  };

  render() {
    return (
      <div className="sell">
        <div className="sell_form_container">
          <span className="sell_title">List New Property</span>
          <form onSubmit={this.handleSubmit} className="sell_form">
            <Select
              name="Type"
              className="select_width sell_form_type"
              placeholder="Type"
              value={this.state.type}
              onChange={this.handleSelect("type")}
              options={[
                { value: "apartment", label: "Apartment" },
                { value: "house", label: "House" }
              ]}
            />
            <Input
              type="text"
              placeholder="Built (Year)"
              name="built"
              value={this.state.built}
              onChange={this.update("built")}
              className="sell_form_built"
            />
            <Input
              type="text"
              placeholder="Price (€)"
              name="price"
              value={this.state.price}
              onChange={this.update("price")}
              className="sell_form_price"
            />
            <Input
              type="text"
              placeholder="Size (m²)"
              name="size"
              value={this.state.size}
              onChange={this.update("size")}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.update("description")}
              className="sell_form_textarea"
            />
            <Select
              name="Bedrooms"
              className="select_width"
              placeholder="Bedrooms"
              value={this.state.bed}
              onChange={this.handleSelect("bed")}
              options={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" }
              ]}
            />
            <Select
              name="Bathrooms"
              className="select_width"
              placeholder="Bathrooms"
              value={this.state.bath}
              onChange={this.handleSelect("bath")}
              options={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" }
              ]}
            />
            <span className="sell_address_title">Address</span>
            <Input
              type="text"
              placeholder="Street"
              name="street"
              value={this.state.street}
              onChange={this.update("street")}
            />
            <Input
              type="text"
              placeholder="City"
              name="city"
              value={this.state.city}
              onChange={this.update("city")}
            />
            <Input
              type="text"
              placeholder="State"
              name="state"
              value={this.state.state}
              onChange={this.update("state")}
            />
            <Input
              type="text"
              placeholder="Postal Code"
              name="postal_code"
              value={this.state.postal_code}
              onChange={this.update("postal_code")}
            />
            <Input
              type="text"
              placeholder="Country"
              name="country"
              value={this.state.country}
              onChange={this.update("country")}
            />
            <button
              type="button"
              onClick={this.showWidget}
              className="button sell_form_photos"
            >
              Upload Photos
            </button>
            <button type="submit" className="button sell_form_submit">
              Submit
            </button>
          </form>
        </div>
        <div className="sell_image" />
      </div>
    );
  }
}

export default Sell;
