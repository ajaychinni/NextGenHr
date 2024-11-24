import React from 'react';
import './Table.css';

const Table = ({ columns, data, columnKeyMap }) => {
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
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col === 'Action' ? (
                    <>
                      <button className="approve-btn">Approve</button>
                      <button className="reject-btn">Reject</button>
                    </>
                  ) : (
                    row[columnKeyMap[col]] || '-' // Use mapping to fetch the correct value or show "-"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
