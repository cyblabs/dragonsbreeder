const {BODY_PARTS, DRAGON_TYPES, GENE_VA} = require('./constants');

// 40 gene slot: 4 x 10
// every slot: 7 codes
function parse (_codes) {
  const allCodes = [];
  const dominants = [];
  const composed = _codes.reduce((ret, c, idx) => {
    let code = `0000${c}`;
    if (idx < 3) {
      code = code.substring(code.length - 77);
    } else if (idx === 3) {
      code = code.substring(code.length - 49);
    }
    ret += code;
    return ret;
  }, '');
  for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 4; ++j) {
      const indexStart = (i * 4 + j) * 7;
      const bodyIdx = i;
      const dragonTypeIdx = parseInt(composed.substring(indexStart, indexStart + 2), 10);
      const geneVariatyIdx = parseInt(composed.substring(indexStart + 2, indexStart + 4), 10);
      const geneLevel = parseInt(composed.substring(indexStart + 4, indexStart + 6), 10);
      const isDominant = parseInt(composed.substring(indexStart + 6, indexStart + 7), 10) === 1;
      const item = {
        bodyPart: bodyIdx,
        dragonType: dragonTypeIdx,
        geneVariaty: geneVariatyIdx,
        geneLevel: geneLevel,
        dominant: isDominant
      };
      allCodes.push(item);
      if (j === 0) {
        dominants[i] = item;
      }
      if (j === 1 && isDominant && !dominants[i].isDominant) {
        dominants[i] = item;
      }
    }
  }
  return {
    allCodes,
    dominants
  };
}

module.exports = {
  parse
};

_case[0][6] === 1 ? (
  _case[0][3] > 4 ? (rareActiveGenes.push(_case)) : ()
) : ( _case[1][6] === 1 ? (
  _case[1][3] > 4 ? (rareActiveGenes.push(_case)) : ()
) : (_case[0][3] > 4 (rareActiveGenes.push(_case)) : ())
)
