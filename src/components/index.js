import address from './whitelist.js';
import ethers from 'ethers';
import fs from 'fs';

const checkedAddress = [];

address.forEach((addres) => {
	let temp = addres.trim();
	if (ethers.utils.isAddress(temp)) {
		checkedAddress.push(temp);
	}
});

fs.writeFileSync('opdsfsd.json', JSON.stringify([...new Set(checkedAddress)]));
