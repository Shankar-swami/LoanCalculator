import React, { useEffect, useState } from 'react';
import './LiveExchangeRates.css'

function LiveExchangeRates() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const API_KEY = 'e4cffb3c241b34301edf93de';
  const base = 'USD'; // fixed base

  useEffect(() => {
    async function fetchRates() {
      setLoading(true);
      try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`);
        const data = await res.json();
        if (data.result === 'success') {
          setRates(data.conversion_rates);
          setCurrentPage(1);
        } else {
          alert("Error fetching rates");
        }
      } catch (err) {
        alert("Failed to fetch rates");
        console.error(err);
      }
      setLoading(false);
    }
    fetchRates();
  }, []);

  const ratesArray = Object.entries(rates);
  const totalPages = Math.ceil(ratesArray.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRates = ratesArray.slice(startIndex, startIndex + rowsPerPage);

  const goToPrevPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  return (
    <div className="live-rates">
      <div className="moving-heading-container">
      <h2 className="moving-heading">Live Exchange Rates (Base: USD)</h2>
    </div>

      {loading ? (
        <p>Loading rates...</p>
      ) : (
        <>
          <table className="rates-table">
            <thead>
              <tr>
                <th>Currency</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {currentRates.map(([currency, rate]) => (
                <tr key={currency}>
                  <td>{currency}</td>
                  <td>{rate.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-controls" style={{ marginTop: '10px' }}>
            <button onClick={goToPrevPage} disabled={currentPage === 1} style={{backgroundColor:'#F27F3D'}}>
              Prev
            </button>
            <span style={{ margin: '0 10px' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages} style={{backgroundColor:'#8C694A'}}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default LiveExchangeRates;
