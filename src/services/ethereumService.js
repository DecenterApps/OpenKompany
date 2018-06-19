export const saveKompany = (kompany) => {
  let kompanies = JSON.parse(localStorage.getItem('kompanies')) || [];
  const index = kompanies.findIndex(item => item.companyName === kompany.companyName);

  if (index >= 0) {
    kompanies[index] = kompany;
  } else {
    kompanies.push(kompany);
  }
  localStorage.setItem('kompanies', JSON.stringify(kompanies));
};

export const executeWhenReady = (method) => {
  const interval = setInterval(() => {
    console.log(document.readyState);
    if (document.readyState === 'complete') {
      clearInterval(interval);
      return method();
    }
  }, 10);
};

export const payToCompany = (value, rating, message) => {
  console.log(value, rating, message);

  return true;
};

export const payService = (value, address) => {
  console.log(value, address);

  return true;
};

export const payTeam = (value, address) => {
  console.log(value, address, new Date());

  return true;
};

export const payRecurring = (value, address) => {
  console.log(value, address);

  return true;
};
