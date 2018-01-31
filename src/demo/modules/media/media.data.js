'use strict';

var _ = require('lodash'),
    dataHelper = require('estatico-data'),
    handlebars = require('estatico-handlebars').handlebars,
    defaultData = require('../../../data/default.data.js'),

    template = dataHelper.getFileContent('media.hbs'),
    data = _.merge(defaultData, {
        meta: {
            title: 'Demo: Media demo',
            jira: 'JIRA-3'
        },
        props: {}
    }),
    variants = _.mapValues({
        default: {
            meta: {
                title: 'Default',
                desc: 'Default implementation'
            }
        }
    }, function(variant) {
        var variantProps = _.merge({}, data, variant).props,
            compiledVariant = handlebars.compile(template)(variantProps),
            variantData = _.merge({}, data, variant, {
                meta: {
                    demo: compiledVariant

                    // code: {
                    //  handlebars: dataHelper.getFormattedHandlebars(template),
                    //  html: dataHelper.getFormattedHtml(compiledVariant),
                    //  data: dataHelper.getFormattedJson(variantProps)
                    // }
                }
            });

        return variantData;
    });

data.variants = variants;

module.exports = data;