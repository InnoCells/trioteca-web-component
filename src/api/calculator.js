const fetchMortgageOption = async ({ price, provinceId, term, savings, purpose, income, type }) => {
  const response = await fetch('/api/walking_user', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: {
        price,
        province_id: provinceId,
        mortgage_years: term,
        occupancy: purpose,
        savings,
        income,
        type
      }
    })
  });
  const result = await response.json();
  const { error_message: error } = result;

  if (error) {
    return { error };
  }

  const { monthly_payment: monthlyPayment, tin } = result.results;
  return { monthlyPayment, tin };
};

const fetchMortgageOptions = async options => {
  const result = await Promise.all([
    await fetchMortgageOption({ ...options, type: 'F' }),
    await fetchMortgageOption({ ...options, type: 'V' })
  ]);
  const [fixed, variable] = result;
  return [
    { ...fixed, name: 'Fija', tin: fixed.tin ? `${fixed.tin}% TIN` : null },
    { ...variable, name: 'Variable', tin: variable.tin ? `Euribor + ${variable.tin}%` : null }
  ];
};

export default fetchMortgageOptions;
