const _ = require('lodash');
const dataHelper = require('@unic/estatico-data');
const { handlebars } = require('@unic/estatico-handlebars');
const defaultData = require('../../data/default.data.js');

const template = dataHelper.getFileContent('nav_bar.hbs');
const data = _.merge({}, defaultData, {
  meta: {
    title: 'NavBar',
    className: 'NavBar',
    jira: 'OO-*',
    documentation: dataHelper.getDocumentation('nav_bar.md'),
  },
  props: {

  },
});
const variants = _.mapValues({
  default: {
    meta: {
      title: 'Default',
      desc: 'Default implementation',
    },
  },
}, (variant) => {
  const variantProps = _.merge({}, data, variant).props;
  const compiledVariant = () => handlebars.compile(template)(variantProps);
  const variantData = _.merge({}, data, variant, {
    meta: {
      demo: compiledVariant,

      // code: {
      //  handlebars: dataHelper.getFormattedHandlebars(template),
      //  html: dataHelper.getFormattedHtml(compiledVariant),
      //  data: dataHelper.getFormattedJson(variantProps)
      // }
    },
  });

  return variantData;
});

data.variants = variants;

module.exports = data;
