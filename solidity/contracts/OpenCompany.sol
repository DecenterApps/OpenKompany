pragma solidity ^0.4.23;
pragma experimental "v0.5.0";

import "./lib/IColonyNetwork.sol";
import "./lib/IColony.sol";
import "./lib/Token.sol";
import "./lib/dappsys/auth.sol";

import "./IcoContract.sol";


/// @title OpenCompany
contract OpenCompany {

    struct Company {
        address companyToken;
        string ipfsHash;
        address owner;
        address icoToken;
        address icoContract;
    }

    address public etherRouter;
    mapping(address => Company) public companies;
    address[] public companiesArray;

    event CompanyCreated(address indexed company, address token, address indexed owner);
    event CompanyEdited(address indexed company, string newIpfs);
    event IcoCreated(address indexed company);

    constructor() public {
        etherRouter = 0xD4C145EbdC7f072d10a07b8ea4515AF996EE437c;
    }

    function createCompany(bytes32 _name, bytes32 _symbol, uint _decimals, string _ipfsHash) public {
        Token token = new Token(_name, _symbol, _decimals);
        IColonyNetwork network = IColonyNetwork(etherRouter);

        address colony = network.createColony(token);
        token.setOwner(colony);
        DSAuth(colony).setOwner(msg.sender);

        companiesArray.push(colony);
        companies[colony] = Company({
                companyToken: token,
                ipfsHash: _ipfsHash,
                owner: msg.sender,
                icoToken: address(0),
                icoContract: address(0)
            });

        emit CompanyCreated(colony, token, msg.sender);
    }

    function changeHash(address _colony, string _newIpfs) public {
        require(companies[_colony].owner == msg.sender);
        
        companies[_colony].ipfsHash = _newIpfs;

        emit CompanyEdited(_colony, _newIpfs);
    }

    function createIco(address _company, bytes32 _name, bytes32 _symbol, uint _decimals) public {
        require(msg.sender == companies[_company].owner);
        require(companies[_company].icoToken == address(0));
        
        Token token = new Token(_name, _symbol, _decimals);
        companies[_company].icoToken = token;

        IcoContract ico = new IcoContract(token, _company);
        token.setOwner(ico);
        companies[_company].icoContract = ico;

        emit IcoCreated(_company);
    }
    
        
}