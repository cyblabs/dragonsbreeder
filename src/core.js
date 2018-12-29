import Web3 from 'web3';
const {BODY_PARTS, DRAGON_TYPES, GENE_VA} = require('./constants');
const web3 = new Web3(window.web3.currentProvider);
const abi = [{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getParsedGenome","outputs":[{"name":"parsed","type":"uint8[16][10]"}],"payable":false,"stateMutability":"view","type":"function"}];
const address = '0x2C0E0b651fe43D56AD03AD6672d9D410EA2980Cd';
const contract = new web3.eth.Contract(abi, address);

export function getGenome (dragonId) {

  return new Promise(resolve => {
    let currentAccount = null;

    web3.eth.getAccounts()
    .then((accounts) => {
      currentAccount = accounts[0];
    })
    .then(() => {
      const options = {from:  currentAccount};
      return contract.methods.getParsedGenome(dragonId).call(options)
    })
    .then((parsedGenome) => {
      console.log("parsedGenome");
      console.log(parsedGenome);
      resolve(parsedGenome);
    });
  });
};

// return dragon composed genome from 2d to 3d array
export function parse (_codes) {
  let codes = [].concat(..._codes);

  const genomeComposed = [];
  for (let i = 0; i < 10; i++) {
    const geneSlot = [];
    for (let j = 0; j < 4; j++) {
      const slot = [];
      for (let k = 0; k < 4; k++) {
        const indexStart = (i * 4 + j) * 4;
        slot[k] = parseInt(codes[indexStart + k]);
      }
      geneSlot[j] = slot;
    }
    genomeComposed.push(geneSlot)
  }
  return genomeComposed;
} //return *genomeComposed* (10)(4)(4)

export function getSumGenes (_momComposed, _dadComposed) {
  const sumGenes = [];  // Create an array like WWyy YYww
  for (let i = 0; i < 10; i++) {
    let temp = [];
    for (let j = 0; j < 4; j++) {
      temp.push(_momComposed[i][j]);
    }
    for (let j = 0; j < 4; j++) {
      temp.push(_dadComposed[i][j]);
    }
    sumGenes.push(temp);
  }
  return sumGenes;
} // return *sumGenes* mom+dad genesets by 3rd Mendel law as XXyy YYxx per body part
  // (10)(8)(4)

export function getBodyPartCases (_bodyPartMendel) {
  const bodyPartCases = [];
  const bodyPartCases64 = []
  for (let i = 0; i < 7; i+=2) {
    for (let j = 0; j < 7; j+=2) {
      bodyPartCases64.push(_bodyPartMendel[i]);
      bodyPartCases64.push(_bodyPartMendel[j]);
      bodyPartCases64.push(_bodyPartMendel[i+1]);
      bodyPartCases64.push(_bodyPartMendel[i+1]);
    }
  }
  for (let i = 0; i < 16; i++) {
    bodyPartCases.push(bodyPartCases64.slice(i * 4, i * 4 + 4));
  }
  return bodyPartCases;
} // return *bodyPartCases* (16)(4)(4)

export function getDragonBodyPartsCases (_sumGenes) {
  const dragonBodyPartsCases = [];
  for (let i = 0; i < 10; i++) {
    dragonBodyPartsCases.push(getBodyPartCases(_sumGenes[i]))
  }
  return dragonBodyPartsCases;
} // return *dragonBodyPartsCases* (10)(16)(4)(4)


export function getRareActiveGenes (_case) {
  let getActiveGenes = 0;
  if (_case[0][3] === 1 && _case[0][1] > 4) {
    getActiveGenes =  _case;
  } else if (_case[1][3] === 1 && _case[1][1] > 4 && _case[0][3] === 0) {
    getActiveGenes =  _case;
  } else if (_case[0][3] === 0 && _case[0][1] > 4 && _case[1][3] === 0) {
    getActiveGenes =  _case;
  }
    return getActiveGenes;
}

export function collectRareActiveGenesInBodyPart (_cases) {
  const raresCollected = [];
  for (let i = 0; i < 16; i++) {
    if (getRareActiveGenes(_cases[i]) !== 0) {
      raresCollected.push(getRareActiveGenes(_cases[i]))
    }
  }
  return raresCollected;
}

export function collectRareActiveGenesPerBodyPart (_dragonCases) {
  let rareActivePerBodyPart = [];
  for (let i = 0; i < 10; i++) {
    rareActivePerBodyPart.push(collectRareActiveGenesInBodyPart(_dragonCases[i]));
  }
  return rareActivePerBodyPart;
}

export function getProbabilityPerBodyPart (_rareActivePerBodyPart) {
  let bodyPartActiveRareProbability = [];
  for (let i = 0; i < 10; i++) {
    bodyPartActiveRareProbability[i] = (_rareActivePerBodyPart[i].length)/16;
  }
  return bodyPartActiveRareProbability;
}

export function getProbArray (_bodyPartActiveRareProbability) {
  let probArray = [];
  for (let i = 0; i < 10; i++) {
    if (_bodyPartActiveRareProbability[i] !== 0) {
      probArray.push(_bodyPartActiveRareProbability[i])
    }
  }
  return probArray;
}

export function getAllCasesProbs (_probArray) {
  let allCases = [1];
  allCases = _probArray.reduce((a,b)=>a*b)
  return allCases;
}

export function atLeastOneCaseProbs (_probArray) {
  let revArray = [1];
  for (let i = 0; i < _probArray.length; i++) {
    revArray[i] = 1 - _probArray[i]
  }
  let atLeastOne = 1 - revArray.reduce((a,b)=>a*b);
  return atLeastOne;
}

export function dragonIm (_dragonComposed) {
  const allCodes = [];
  for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 4; ++j) {
      const bodyIdx = i;
      const dragonTypeIdx = _dragonComposed[i][j][0];
      const geneVariatyIdx = _dragonComposed[i][j][1];
      const geneLevel = _dragonComposed[i][j][2];
      const isDominant = _dragonComposed[i][j][3];
      const item = {
        bodyPart: BODY_PARTS[bodyIdx],
        dragonType: DRAGON_TYPES[dragonTypeIdx],
        geneVariaty: GENE_VA[dragonTypeIdx][geneVariatyIdx],
        geneVariatyIdx,
        geneLevel,
        isDominant
      };
       allCodes.push(item);
    }
  }
  return allCodes;
}
