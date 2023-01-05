# Fontend code of MACdb 

### Abstract
Cancer is one of the leading causes of human death. As the metabolomics technology becomes more and more widely used in cancer researches, metabolites are increasingly recognized as crucial factors in both cancer diagnosis and treatment. In this study, we developed MACdb (https://ngdc.cncb.ac.cn/macdb), a curated knowledgebase for metabolic associations in various types of cancers. Unlike extent data-oriented resources, MACdb integrates cancer-metabolic knowledge from extensive publications, providing high quality metabolite associations and tools to support multiple research purposes. In the current implementation, MACdb has integrated a large number of 40,710 cancer-metabolite associations, covering 267 traits from 17 categories of cancers with high incidence or mortality, based entirely on the manual curation from 1,127 studies reported in 462 publications (initially from 5,153 research papers). MACdb offers intuitive browsing functions to explore associations at multi-dimensions (metabolite, trait, study, and publication), and constructs knowledge graph to provide overall landscape among cancer, trait, and metabolite. Furthermore, Name2cid and Enrichment tools are developed to help users enrich the association of metabolites with various cancer types and traits. Collectively, MACdb paves an informative and practical way to evaluate cancer-metabolite associations and has great potential to help researchers identify key predictive metabolic markers in cancers.

MACdb is seprated to front-end and backend parts. This repository hosts the front-end code.

The Front-end interface is developed by using several web packages as following:

- vue.js
- vue-router
- vuex
- axios
- vuetify
- vxe-table
- lodash
- echarts
- qs
- js-file-download
- vue-clipboard2
- vue-i18n

If you are interested in details of MACdb, please visit the [MACdb document](https://ngdc.cncb.ac.cn/macdb/docs2/#/)
