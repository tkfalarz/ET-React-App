import React from "react"
import "../styles/HighlightsDataField.css";

const HighlightsDataField = (props: any) => (
  <div className="field">
    <div style={{float: "left", marginRight: "10px"}}>
        {React.createElement(props.icon, {fontSize: "70px"})}
    </div>
    <div className="description">
      <div className="headerText">
        <p>{props.name}</p>
      </div>
      <div className="value">
        <p>{props.value}</p>
      </div>
      <div className="unit">
        <p>{props.unit}</p>
      </div>
    </div>
  </div>
);

export default HighlightsDataField;
