import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Filters = () => {
  const [taxApplied, setTaxApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/listings/getData")
      .then((res) => res.json())
      .then((data) => setTaxApplied(data[0]?.taxApplied || false));
  }, []);

  const toggleTax = async () => {
    if (taxApplied) {
      navigate("/listings/removeTax");
    } else {
      navigate("/listings/applyTax");
    }
  };

  const handleFilterClick = (filterName) => {
    navigate(`/listings/filter?filterName=${encodeURIComponent(filterName)}`);
  };

  const filters = [
    { icon: "fa-bed", name: "Rooms" },
    { icon: "fa-galactic-republic", name: "Arctic" },
    { icon: "fa-mountain", name: "Mountain" },
    { icon: "fa-chess-rook", name: "Kitchen" },
    { icon: "fa-person-swimming", name: "Pool" },
    { icon: "fa-umbrella-beach", name: "Beach" },
    { icon: "fa-money-bill-wheat", name: "Farm" },
    { icon: "fa-tents", name: "Camping" },
  ];

  return (
    <div>
      <div id="filters" className="mb-3 flex flex-wrap gap-4 items-center">
        {filters.map((filter, index) => (
          <div
            key={index}
            className="filter text-center cursor-pointer opacity-70 hover:opacity-100 hover:underline"
            onClick={() => handleFilterClick(filter.name)}
          >
            <div>
              <i className={`fa-solid ${filter.icon}`}></i>
            </div>
            <p>{filter.name}</p>
          </div>
        ))}
        <div className="tax-toggle border border-black rounded-lg p-4 h-12 flex items-center justify-center mx-auto max-w-xs w-4/5">
          <div className="form-check-reverse form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={taxApplied}
              onChange={toggleTax}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
              Display total after taxes
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
