const { ethers } = require('ethers');

function createWallet() {
    try {
        // Criar uma nova carteira aleatória
        const wallet = ethers.Wallet.createRandom();
        
        // Extrair informações importantes
        const walletInfo = {
            address: wallet.address,
            publicKey: wallet.publicKey,
            privateKey: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase
        };

        console.log('Nova carteira ETH criada:');
        console.log('Endereço:', walletInfo.address);
        console.log('Chave Pública:', walletInfo.publicKey);
        console.log('Chave Privada:', walletInfo.privateKey);
        console.log('Frase Mnemônica:', walletInfo.mnemonic);

        return walletInfo;
    } catch (error) {
        console.error('Erro ao criar carteira:', error);
        return null;
    }
}

function checkAddressPrefix(walletInfo, prefix) {
    // Remove '0x' do início do endereço se existir
    const cleanAddress = walletInfo.address.toLowerCase().replace('0x', '');
    const cleanPrefix = prefix.toLowerCase().replace('0x', '');

    return cleanAddress.startsWith(cleanPrefix);
}

function cria_endereco_iniciado( tentativas, prefixo) {
    for (let i = 0; i < tentativas; i++) {
        const wallet = createWallet();
        if (checkAddressPrefix(wallet, prefixo)) {
            console.log(`Endereço encontrado na tentativa ${i + 1}: ${wallet.address}`);
            return wallet;
        }
    }
    console.log(`Nenhum endereço encontrado com o prefixo ${prefixo} após ${tentativas} tentativas.`);
    return null;
}

const wallet = cria_endereco_iniciado(1000000, "ba8c0");
console.log(wallet);