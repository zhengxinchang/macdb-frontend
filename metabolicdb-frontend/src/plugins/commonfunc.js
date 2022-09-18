
import VueThis from '../main'
import _ from 'lodash'

function capitalize(x){

  return _.capitalize(x)
}

function exportFuncDefault(x){
  return JSON.stringify(x)
}

function exportFuncDeltaTrends({row}){
  // vxe-table导出时候预处理当前列的设置
  return exportFuncDefault(row.pctTrends)
}
function exportFuncPvalSummary({row}){
  // vxe-table导出时候预处理当前列的设置
  return exportFuncDefault(row.pctPval)
}

function getColorCodeByTraitType(t){
  // console.log(t)

  if (t === null || t === undefined || t.length === 0) {
    // console.log("t is null")
    return '#d7d5d6'
  }




  if(t.toLowerCase() == "cancer"){
    return '#9e4ad5'
  }

  else if (t.toLowerCase()=="gene abnormality"){
    return '#009688'
  }
  else if (t.toLowerCase() =="medical intervention"){
    return '#5160cb'
  }
  else if (t.toLowerCase() =="phenotype"){
    return '#16c8ce'
  }

  else if (t.toLowerCase() =="genotype"){
    return '#eea535'
  }


}

function goOuterLinkPubmed(t){
  window.open('https://pubmed.ncbi.nlm.nih.gov/' + t, '_blank')
}

function getFullLinkEFO(t){

  if (t && t.indexOf("EFO") != -1){

  return "http://www.ebi.ac.uk/efo/"+t.replace("EFO:","EFO_")
  }else if(t && t.indexOf("MONDO") != -1){

  return "http://purl.obolibrary.org/obo/"+t.replace("MONDO:","MONDO_")
  }

}

function openAtNewPageMetaboliteDetail(cid){
  const {href} = VueThis.$router.resolve({
    path: `/browse_association/${cid}`
  });
  window.open(href, '_blank');
}

function openAtNewPageStudyDetail(studyid){
  const {href} = VueThis.$router.resolve({
    path: `/browse_study/${studyid}`
  });
  window.open(href, '_blank');
}

function openAtNewPageTraitDetail(traitid){
  const {href} = VueThis.$router.resolve({
    path: `/browse_trait/${traitid}`
  });
  window.open(href, '_blank');
}

function openAtNewPagePublicationDetail(pmid){
  const {href} = VueThis.$router.resolve({
    path: `/browse_publication/${pmid}`
  });
  window.open(href, '_blank');
}

export default {
  exportFuncDeltaTrends,
  exportFuncPvalSummary,
  getColorCodeByTraitType,
  goOuterLinkPubmed,
  openAtNewPageMetaboliteDetail,
  openAtNewPageStudyDetail,
  openAtNewPageTraitDetail,
  openAtNewPagePublicationDetail,
  capitalize,
  getFullLinkEFO,

}
