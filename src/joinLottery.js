export const joinLottery = async (wid, contract, web3) => {
    console.log("inside contract", contract);
    const contractAdd = await contract._address
    console.log('contract add', contractAdd);
    await web3.eth.sendTransaction({
        from: wid,
        to: contractAdd,
        value: "1000000000000000000"
    })
}

