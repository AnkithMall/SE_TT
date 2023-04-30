import React from "react";

const JsonTable = ({ data , title }) => {
  if (!data) {
    return <div>No data provided.</div>;
  }

  const columns = Object.keys(data[0]);

  return (
    <>
    <h3 style={{width: "19%" , margin: "20px auto"}}>{title}</h3>
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column}>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default JsonTable;
