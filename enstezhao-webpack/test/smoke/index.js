const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: '10000ms'
});

process.chdir(path.join(__dirname, 'template'));

rimraf('./dist', () => {
    const prodConfig = require('../../lib/webpack.prod.js');
    //console.log('开始构建', JSON.stringify(prodConfig));
    // var censor = function(key,value){
    //     if(typeof(value) == 'function'){
    //          return Function.prototype.toString.call(value)
    //     }
    //     return value;
    // }
    //console.log(JSON.stringify(prodConfig,censor,4))
    webpack(prodConfig, (err, stats) => {
        console.log('Webpack build callback');
        if (err) {
            console.error('err', err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }));

        console.log('Webpack build success, begin run test.');

        mocha.addFile(path.join(__dirname, 'html-test.js'));
        mocha.addFile(path.join(__dirname, 'css-js-test.js'));
        mocha.run();
    });
});