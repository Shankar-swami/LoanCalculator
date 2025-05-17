import { useState } from 'react';
import './App.css';
import './LoanCalculator.css'

function LoanCalculator() {
  const [loan, setLoan] = useState(1000);
  const [interest, setInterest] = useState(3);
  const [year, setYear] = useState(3);
  const [schedule, setSchedule] = useState([]);
  const [monthlyEMI, setMonthlyEMI] = useState(0);

  const [currency, setCurrency] = useState('USD');
  const [convertedSchedule, setConvertedSchedule] = useState([]);
  const [convertedEMI, setConvertedEMI] = useState(null);
  const [conversionRate, setConversionRate] = useState(null);

  const [isCalculated, setIsCalculated] = useState(false);

const calculateSchedule = () => {
  const principal = parseFloat(loan);
  const annualRate = parseFloat(interest);
  const years = parseInt(year);

  if (
    loan === '' || interest === '' || year === '' ||
    isNaN(principal) || isNaN(annualRate) || isNaN(years)
  ) {
    alert("Please enter valid values in all fields.");
    return;
  }

  if (principal < 1000) {
    alert("Loan amount should be at least 1000.");
    return;
  }

  if (annualRate <= 0) {
    alert("Interest rate must be greater than 0.");
    return;
  }

  if (years <= 0) {
    alert("Term (years) must be greater than 0.");
    return;
  }

  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
              (Math.pow(1 + monthlyRate, months) - 1);

  setMonthlyEMI(emi.toFixed(2));

  let balance = principal;
  const result = [];

  for (let i = 1; i <= months; i++) {
    const interestAmount = balance * monthlyRate;
    const principalAmount = emi - interestAmount;
    balance -= principalAmount;

    result.push({
      month: i,
      principal: principalAmount,
      interest: interestAmount,
      balance: balance > 0 ? balance : 0,
    });
  }

  setSchedule(result);
  setConvertedSchedule([]);
  setConvertedEMI(null);
  setConversionRate(null);
  setIsCalculated(true);
};


  const convertCurrency = async () => {
    if (schedule.length === 0) return alert("Calculate schedule first!");

    try {
      const API_KEY = 'e4cffb3c241b34301edf93de';
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
      const data = await res.json();

      if (!data.conversion_rates || !data.conversion_rates[currency]) {
        alert("Currency conversion rate not available.");
        return;
      }

      const rate = data.conversion_rates[currency];
      setConversionRate(rate);

      const emiConverted = (monthlyEMI * rate).toFixed(2);
      setConvertedEMI(emiConverted);

      const converted = schedule.map(item => ({
        month: item.month,
        principal: (item.principal * rate).toFixed(2),
        interest: (item.interest * rate).toFixed(2),
        balance: (item.balance * rate).toFixed(2),
      }));

      setConvertedSchedule(converted);
    } catch (error) {
      alert("Error fetching conversion rate");
      console.error(error);
    }
  };

  return (
    <>
<h2 className="animated-heading">Loan Calculator Dashboard</h2>
      <div className="controls">
        <div className="input-wrapper">
  <input
    type="number"
    id="loan"
    value={loan}
    onChange={(e) => setLoan(e.target.value)}
    required
  />
  <label htmlFor="loan">Loan Amount (USD)</label>
</div>

<div className="input-wrapper">
  <input
    type="number"
    id="interest"
    value={interest}
    onChange={(e) => setInterest(e.target.value)}
    required
  />
  <label htmlFor="interest">Interest Rate (%)</label>
</div>

<div className="input-wrapper">
  <input
    type="number"
    id="year"
    value={year}
    max={30}
    onChange={(e) => {
      const val = e.target.value;
      if (val === '' || (Number(val) >= 1 && Number(val) <= 30)) {
        setYear(val);
      }
    }}
    required
  />
  <label htmlFor="year">Term (Years)</label>
</div>

        <button onClick={calculateSchedule}>Calculate</button>
      </div>

      {isCalculated && (
        <>
          <h2>Monthly EMI (USD): {monthlyEMI}</h2>

          <hr />

          <label>
            Convert To:
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="USD">USD - US Dollar</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
            </select>
          </label>

          <button onClick={convertCurrency} style={{background: 'linear-gradient(135deg, #43cea2, #185a9d)'}}>Convert Currency</button>

          {conversionRate && (
            <p>Conversion Rate (1 USD = {conversionRate} {currency})</p>
          )}

          {convertedEMI && (
            <h2>Monthly EMI ({currency}): {convertedEMI} {currency}</h2>
          )}

          <div className="table-container">
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <h3 className="animated-heading1">Amortization Schedule</h3>
            </div>
            <table cellPadding="5">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Principal {convertedSchedule.length ? `(${currency})` : '(USD)'}</th>
                  <th>Interest {convertedSchedule.length ? `(${currency})` : '(USD)'}</th>
                  <th>Remaining Balance {convertedSchedule.length ? `(${currency})` : '(USD)'}</th>
                </tr>
              </thead>
              <tbody>
                {(convertedSchedule.length ? convertedSchedule : schedule).map((item, index) => (
                  <tr key={index}>
                    <td>{item.month}</td>
                    <td>{convertedSchedule.length ? item.principal : parseFloat(item.principal).toFixed(2)}</td>
                    <td>{convertedSchedule.length ? item.interest : parseFloat(item.interest).toFixed(2)}</td>
                    <td>{convertedSchedule.length ? item.balance : parseFloat(item.balance).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default LoanCalculator;
