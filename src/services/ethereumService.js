import config from './config.json';

const getCompanyContract = () =>
  web3.eth.contract(config.kompanyAbi).at(config.kompanyContract.toString());

const getIcoContract = (contractAddress) =>
  web3.eth.contract(config.icoAbi).at(contractAddress);

const getTokenContract = (contractAddress) =>
  web3.eth.contract(config.tokenAbi).at(contractAddress);

export const createKompany = (companyName, ipfsHash) =>
  new Promise((resolve, reject) => {
    const contract = getCompanyContract();
    const TOKEN = {
      name: companyName,
      symbol: 'REP',
      decimals: 18,
    };

    contract.createCompany(
      TOKEN.name,
      TOKEN.symbol,
      TOKEN.decimals,
      ipfsHash,
      {
        from: web3.eth.accounts[0],
      }, (err, data) => {
        if (err) {
          return reject(err);
        }

        contract.CompanyCreated({ owner: web3.eth.accounts[0] }, {
          fromBlock: 0,
          toBlock: 'latest'
        }, (err, data) => {
          resolve(data);
        });
      });
  });

export const getCompanies = () =>
  new Promise((resolve, reject) => {
    const contract = getCompanyContract();
    contract.CompanyCreated({}, { fromBlock: 0, toBlock: 'latest' })
      .get(async (err, events) => {
        if (err) {
          return reject(err);
        }
        const companies = [];
        for (let i = 0; i < events.length; i++) {
          companies.push(await getCompany(events[i].args.company));
        }
        console.log(err);
        console.log(events);
        resolve(companies);
      });
  });

export const getValue = (tokenContract, value) =>
  new Promise((resolve, reject) => {
    const contract = getTokenContract(tokenContract);

    contract[value]((err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });

export const getTokenInfo = (tokenContract) =>
  new Promise(async (resolve, reject) => {
    try {
      const symbol = await getValue(tokenContract, 'symbol');
      const decimals = await getValue(tokenContract, 'decimals');
      const name = await getValue(tokenContract, 'name');
      resolve({
        name: web3.toAscii(name),
        symbol: web3.toAscii(symbol),
        decimals,
      });
    } catch (e) {
      reject(e);
    }
  });

export const getTokenPrice = (icoContract) =>
  new Promise((resolve, reject) => {
    const contract = getIcoContract(icoContract);

    contract.PRICE((err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });

export const getIcos = () =>
  new Promise((resolve, reject) => {
    const contract = getCompanyContract();
    contract.IcoCreated({}, { fromBlock: 0, toBlock: 'latest' })
      .get(async (err, events) => {
        if (err) {
          return reject(err);
        }
        const icos = [];
        for (let i = 0; i < events.length; i++) {
          const company = await getCompany(events[i].args.company);
          const tokenInfo = await getTokenInfo(company.icoToken);
          const price = await getTokenPrice(company.icoContract);
          icos.push({
            ...tokenInfo,
            price: web3.fromWei(price, 'ether'),
            icoAddress: company.icoContract,
            companyAddress: company.companyAddress,
          });
        }

        resolve(icos);
      });
  });

export const getLatestIpfsHash = (address) =>
  new Promise((resolve, reject) => {
    const contract = getCompanyContract();
    contract.CompanyEdited({ company: address }, { fromBlock: 0, toBlock: 'latest' })
      .get(async (err, events) => {
        if (err) {
          return reject(err);
        }
        if (events.length > 0) {
          const company = await getCompany(events[events.length - 1].args.company);
          resolve({
            ipfsHash: events[events.length - 1].args.newIpfs,
            owner: company.owner,
            companyAddress: company.companyAddress,
          });
        } else {
          contract.CompanyCreated({ company: address }, { fromBlock: 0, toBlock: 'latest' })
            .get(async (err, events) => {
              if (err) {
                return reject(err);
              }
              if (events.length === 0) return reject('No company');
              const company = await getCompany(events[0].args.company);
              resolve({
                ipfsHash: company.ipfsHash,
                owner: company.owner,
                companyAddress: company.companyAddress,
              });
            });
        }
      });
  });

export const getCompany = (address) =>
  new Promise((resolve, reject) => {
    const contract = getCompanyContract();

    contract.companies(address, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve({
        companyAddress: address,
        tokenAddress: data[0],
        ipfsHash: data[1],
        owner: data[2],
        icoToken: data[3],
        icoContract: data[4],
      });
    });
  });

export const getIco = (address) =>
  new Promise(async (resolve, reject) => {
    try {
      const company = await getCompany(address);
      const tokenInfo = await getTokenInfo(company.icoToken);
      const price = await getTokenPrice(company.icoContract);
      resolve({
        ...tokenInfo,
        price: web3.fromWei(price, 'ether'),
        icoAddress: company.icoContract,
      });
    } catch (e) {
      reject(e);
    }
  });

export const createIco = (company, name, symbol, decimals, req, suc) =>
  new Promise((resolve, reject) => {
    const contract = getCompanyContract();

    contract.createIco(
      company,
      name,
      symbol,
      parseInt(decimals, 10),
      {
        from: web3.eth.accounts[0],
      }, (err, data) => {
        if (err) {
          return reject(err);
        }
        req(data);

        contract.IcoCreated({ company: company }, {
          fromBlock: 0,
          toBlock: 'latest'
        }, (err, data) => {
          if (err) {
            return reject(err);
          }

          resolve(data);
          suc(data);
        });
      });
  });

export const changeHash = (address, ipfsHash, req, suc) =>
  new Promise((resolve, reject) => {
    const contract = getCompanyContract();
    console.log(address, ipfsHash);

    contract.changeHash(
      address,
      ipfsHash,
      {
        from: web3.eth.accounts[0],
      }, (err, txHash) => {
        if (err) {
          return reject(err);
        }
        req(txHash);

        contract.CompanyEdited({ company: address }, {
          fromBlock: 0,
          toBlock: 'latest'
        }, (err, data) => {
          resolve(data);
          suc(data);
        });
      });
  });

export const buyTokens = (address, price, amount, req, suc) =>
  new Promise((resolve, reject) => {
    const contract = getIcoContract(address);

    console.log(address, amount);
    console.log(contract);
    console.log(parseInt(amount, 10) * parseFloat(price));

    contract.buyToken(
      parseInt(amount, 10),
      {
        from: web3.eth.accounts[0],
        value: web3.toWei(parseInt(amount, 10) * parseFloat(price))
      },
      (err, txHash) => {
        console.log(1);
        if (err) {
          return reject(err);
        }
        req(txHash);
        contract.TokensBought({ user: web3.eth.accounts[0] }, (err, data) => {
          if (err) {
            return reject(err);
          }
          suc();
          resolve(data)
        });
      });
  });

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