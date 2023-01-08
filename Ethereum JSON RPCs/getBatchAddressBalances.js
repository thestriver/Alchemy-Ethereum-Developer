async function getTotalBalance(addresses) {
    const responses = await provider.send(addresses.map(addr => ({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [addr, "latest"],
    })));

    return responses.reduce((p,c) => p + parseInt(c.result), 0);
}