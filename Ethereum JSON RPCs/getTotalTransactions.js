async function getTotalTransactions(blockNumber) {
    const { result } = await provider.send({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockByNumber",
        params: [ 
            "0x" + blockNumber.toString(16), 
            false
        ],
    });
    
    return result.transactions.length;
}