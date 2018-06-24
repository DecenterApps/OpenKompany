import config from './config.json';

const getCompanyContract = () =>
  web3.eth.contract(config.kompanyAbi).at(config.kompanyContract.toString());

const getIcoContract = contractAddress =>
  web3.eth.contract(config.icoAbi).at(contractAddress);

const getTokenContract = contractAddress =>
  web3.eth.contract(config.tokenAbi).at(contractAddress);

const getColonyContract = contractAddress =>
  web3.eth.contract(config.colonyAbi).at(contractAddress);

const getColonyStorageContract = contractAddress =>
  web3.eth.contract(config.storageAbi).at(contractAddress);

const getColonyNetworkContract = contractAddress =>
  web3.eth.contract(config.networkAbi).at(config.colonyNetwork);

export const getBalance = address =>
  new Promise((resolve, reject) => {
    web3.eth.getBalance(address, (err, balance) => {
      if (err) {
        return reject(err);
      }

      resolve(balance.toString());
    });
  });

export const getTask = (id, address) =>
  new Promise((resolve, reject) => {
    const contract = getColonyContract(address);

    contract.getTask(id, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });

export const getPotBalance = (id, token, address) =>
  new Promise((resolve, reject) => {
    const contract = getColonyContract(address);

    contract.getPotBalance(id, token, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });

export const getTasks = (address, token) =>
  new Promise((resolve, reject) => {
    const contract = getColonyContract(address);

    contract.TaskAdded({}, { fromBlock: 0, toBlock: 'latest' })
      .get(async (err, events) => {
        if (err) {
          return reject(err);
        }

        const tasks = [];
        for (let i = 0; i < events.length; i++) {
          const task = await getTask(events[i].args.id, address);
          const balance = await getPotBalance(task[6], token, address);
          tasks.push({
            taskId: events[i].args.id.toString(),
            briefHash: task[0],
            deliverableHash: task[1],
            finalised: task[2],
            cancelled: task[3],
            dueDate: task[4].toString(),
            numPayouts: task[5].toString(),
            fundingPotId: task[6].toString(),
            submissionTimestamp: task[7].toString(),
            domainId: task[8].toString(),
            balance: balance.toString(),
          });
        }
        console.log(events, tasks);
        resolve(tasks);
      });
  });

export const getCompany = address =>
  new Promise((resolve, reject) => {
    const contract = getCompanyContract();

    contract.companies(address, async (err, data) => {
      if (err) {
        return reject(err);
      }

      const balance = await getBalance(address);
      resolve({
        companyAddress: address,
        tokenAddress: data[0],
        ipfsHash: data[1],
        owner: data[2],
        icoToken: data[3],
        icoContract: data[4],
        balance,
      });
    });
  });

export const createKompany = (companyName, ipfsHash, req, suc) =>
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
      }, (err, txHash) => {
        if (err) {
          return reject(err);
        }
        req(txHash);

        contract.CompanyCreated({ owner: web3.eth.accounts[0] }, {
          fromBlock: 'latest',
          toBlock: 'latest',
        }, (err, data) => {
          if (err) {
            return reject(err);
          }
          suc(data);
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
        console.log(events);
        if (events.length > 0) {
          const company = await getCompany(events[events.length - 1].args.company);
          resolve({
            ipfsHash: events[events.length - 1].args.newIpfs,
            owner: company.owner,
            companyAddress: company.companyAddress,
            tokenAddress: company.tokenAddress,
            balance: company.balance,
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
                tokenAddress: company.tokenAddress,
                balance: company.balance,
              });
            });
        }
      });
  });

export const getTokenBalance = (address) =>
  new Promise((resolve, reject) => {
    const contract = getIcoContract(address);

    contract.TokensBought({ user: web3.eth.accounts[0] }, {
      fromBlock: 0,
      toBlock: 'latest',
    }).get((err, events) => {
      if (err) {
        return reject(err);
      }

      console.log(events);

      const balance = events.reduce((acc, event) => {
        console.log(event);
        const balance = event.args.numOfTokens.toString();
        return acc + parseFloat(balance);
      }, 0);

      resolve(balance);
    });
  });

export const getIco = (address) =>
  new Promise(async (resolve, reject) => {
    try {
      const company = await getCompany(address);
      const tokenInfo = await getTokenInfo(company.icoToken);
      const price = await getTokenPrice(company.icoContract);
      const balance = await getTokenBalance(company.icoContract);
      resolve({
        ...tokenInfo,
        price: web3.fromWei(price, 'ether'),
        icoAddress: company.icoContract,
        balance,
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

    contract.buyToken(
      parseInt(amount, 10),
      {
        from: web3.eth.accounts[0],
        value: web3.toWei(parseInt(amount, 10) * parseFloat(price)),
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
          resolve(data);
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

