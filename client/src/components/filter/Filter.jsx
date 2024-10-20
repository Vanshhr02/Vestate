import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./filter.scss";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  // Initial state is populated from the query parameters in the URL
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  // Update state as user changes input
  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  // Apply filters and update URL
  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <h1>Search results for <b>{searchParams.get("city")}</b></h1>
      
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>

      <div className="bottom">
        {/* Dropdowns and inputs for other filter options */}
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" onChange={handleChange} defaultValue={query.type}>
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="property" onChange={handleChange} defaultValue={query.property}>
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>

        {/* Price inputs */}
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>

        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="text"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>

        {/* Bedroom input */}
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="text"
            name="bedroom"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>

        <button onClick={handleFilter}>
          <img src="/search.png" alt="Search" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
