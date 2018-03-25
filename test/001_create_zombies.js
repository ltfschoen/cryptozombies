const ZombieFactory = artifacts.require("./ZombieFactory.sol");

contract('ZombieFactory', (accounts) => {
  it("should create new Zombie and emit an event with its name and DNA", () => {
    let zombieContractInstance;
    return ZombieFactory.deployed().then((instance) => {
      zombieContractInstance = instance;
      return zombieContractInstance.createRandomZombie.call("luke");
    }).then((txResult) => {
      console.log("Result of call to method: ", JSON.stringify(txResult, null, 2));
      assert.equal(txResult.logs[0].event, "NewZombie", "Log Event should be NewZombie");
    }).then(() => {
      return zombieContractInstance.zombies.call();
    }).then((zombies) => {
      console.log(zombies);
    })
  });
});
