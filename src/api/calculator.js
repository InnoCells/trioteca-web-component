const minSavingsPercent = purpose => (purpose === 'occasional' ? 0.45 : 0.35);

export const minimumRecommendedSavingsAmount = (price, purpose) => price * minSavingsPercent(purpose);

const fetchMortgageOption = async ({ price, provinceId, term, savings, purpose, income, type }) => {
  const response = await fetch('https://trioteca.com/api/walking_user ', {
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

  const { uuid, results } = result;
  if (!results) {
    throw new Error('Unexpected response: missing results');
  }

  const { monthly_payment: monthlyPayment, tin } = results;
  return { uuid, monthlyPayment, tin, type };
};

const fetchMortgageOptions = async options => {
  const { price, purpose } = options;
  const minRecommendedSavingsAmount = minimumRecommendedSavingsAmount(price, purpose);
  let { savings } = options;
  let comments = null;

  if (savings < minRecommendedSavingsAmount) {
    savings = minRecommendedSavingsAmount;
    comments = `El banco necesitará un importe mínimo de ahorro de ${new Intl.NumberFormat('es-ES', {
      style: 'currency',
      maximumSignificantDigits: 1,
      currency: 'EUR'
    }).format(minRecommendedSavingsAmount)}.`;
  }
  const result = await Promise.all([
    options.term <= 30
      ? await fetchMortgageOption({ ...options, savings, type: 'F' })
      : {
          error: 'Los bancos no ofrecen una hipoteca fija a más de 30 años.'
        },
    await fetchMortgageOption({ ...options, savings, type: 'V' })
  ]);
  const [fixed, variable] = result;
  const url = `https://trioteca.com/setUuidCookie?uuid=${variable.uuid}`;
  return {
    comments,
    options: [
      {
        ...fixed,
        name: 'Hipoteca Fija',
        tin: fixed.tin ? `${fixed.tin}% TIN` : null,
        url
      },
      {
        ...variable,
        name: 'Hipoteca Variable',
        tin: variable.tin ? `Euribor + ${variable.tin}%` : null,
        url
      }
    ]
  };
};

export default fetchMortgageOptions;
