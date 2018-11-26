'use strict'

// -- REQURIEMETS

const fs = require('fs')
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')
const path = require('path')
// const http = require('http')
const request = require('request')

const plantumlEncoder = require('plantuml-encoder')


// -- CONFIGURATION

const architecture_in_dir = './architecture'
const plantuml_renderer_url = 'http://www.plantuml.com/plantuml/img/'
const docs_out_dir = './dist/docs'
const architecture_out_dir = docs_out_dir + '/architecture'


// -- MAIN

// clean up docs_out_dir
rimraf.sync(docs_out_dir)
mkdirp(docs_out_dir, (error) => {
    if (error) {
        console.error(error)
    } else {


        // -- RENDER ARCHITECTURE

        mkdirp(architecture_out_dir, (error) => {
            if (error) {
                console.log(error)
            } else {

                fs.readdirSync(architecture_in_dir).forEach((filename) => {
                    var name = path.basename(filename, path.extname(filename))
                    console.log(name)
                    fs.readFile(architecture_in_dir + '/' + filename, 'utf8', function (error, plantuml) {
                        if (error) {
                            console.error(error)
                        } else {
                            var plantuml_encoded = plantumlEncoder.encode(plantuml)
                            downloadFile(plantuml_renderer_url + plantuml_encoded, architecture_out_dir + '/' + name + '.png', () => {
                                console.log('saved ' + name + '.png')
                            })
                        }
                    })
                })

            }
        })

    }
})


// -- FUNCTIONS

var downloadFile = function (url, filename, callback) {
    request.head(url, function (error, response, body) {
        request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};