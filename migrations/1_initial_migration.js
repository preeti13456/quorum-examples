const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations, 42, {privateFor:["0xcc71c7546429a13796cf1bf9228bff213e7ae9cc"]});
};
