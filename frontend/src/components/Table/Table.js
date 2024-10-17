// src/components/Table/Table.js
import React from 'react';
import './Table.css';

const Table = ({ columns, data }) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.date}</td>
              <td>{row.status}</td>
              <td>
                <button className="approve-btn">Approve</button>
                <button className="reject-btn">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
