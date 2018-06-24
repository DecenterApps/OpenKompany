const OpenCompany = artifacts.require("./OpenCompany");

module.exports = function(deployer) {
  // Create the meta colony

  deployer.deploy(OpenCompany);

};