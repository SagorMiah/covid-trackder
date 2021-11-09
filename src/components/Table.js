import React from "react";

const Table = ({ countries }) => {
  return (
    <div className="table">
      {countries.map(({ country, cases }) => {
        return (
          <tr>
            <td>{country}</td>
            <td>{cases}</td>
          </tr>
        );
      })}
    </div>
  );
};

export default Table;
