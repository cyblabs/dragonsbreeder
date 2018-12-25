import {parse, getSumGenes, getDragonBodyPartsCases, collectRareActiveGenesPerBodyPart, getProbabilityPerBodyPart, getProbArray, getAllCasesProbs, atLeastOneCaseProbs} from './core.js';

export function breed(_mom, _dad) {
  const momComposed = parse(_mom);
  const dadComposed = parse(_dad);
  const sumOfGenes = getSumGenes(momComposed, dadComposed);
  const allCasesOfNewDragon = getDragonBodyPartsCases(sumOfGenes);
  const rareActiveCases = collectRareActiveGenesPerBodyPart(allCasesOfNewDragon);
  const probabilityOfRaresPerBodyPart = getProbabilityPerBodyPart(rareActiveCases);
  const arrayOfProbs = getProbArray(probabilityOfRaresPerBodyPart);
  const allPartsProob = getAllCasesProbs(arrayOfProbs);
  const atLeastOnePartProb = atLeastOneCaseProbs(arrayOfProbs);


  return {
    probabilityOfRaresPerBodyPart,
    allPartsProob,
    atLeastOnePartProb
  }
}
