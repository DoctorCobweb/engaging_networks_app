'use strict';

/*
 *
 * ENGAGING NETWORKS CLIENT
 * a proof of concept client to see how Engaging Networks API works
 *
 *
 */


var fs = require('fs')
var request = require('request')
var csv = require('csv')
var _ = require('lodash')
var chalk = require('chalk')

//var EN_ENDPOINT = 'https://www.e-activist.com/eaexport/export.service' 
var EN_ENDPOINT = 'https://e-activist.com/ea-dataservice/export.service' 
var EN_START_DATE = '11182014'
var EN_END_DATE = '11192014'
var EN_TYPE = 'csv'
var EN_EXPORT_FILE = 'EN_export_' + EN_START_DATE + '_to_' + EN_END_DATE + '.csv'


fs.readFile('.privateDetails.json', function (err, data) {
  if (err) {
    throw err 
  }
  init(JSON.parse(data))
})



function init(pDetails) {
  var mObj = {
    url : EN_ENDPOINT,
    qs : {
      'token': pDetails.en_token,
      'startDate': EN_START_DATE,
      'endDate': EN_END_DATE,
      'type': EN_TYPE 
    },
    method: 'GET'
  }
  function cb (err, resp, body) {
    if (err) {
      throw err 
    }
    console.log(chalk.bgGreen('SUCCESS: response code: ' + resp.statusCode))
    writeData(body)
  }
  var cb_bound = cb.bind(this)
  request(mObj, cb_bound)
} 


function writeData(csvContent) {
  fs.writeFile(EN_EXPORT_FILE, csvContent, function (err) {
    if (err) {
      throw err 
    } 
    console.log(chalk.bgGreen('SUCCESS: exported engaging network.'))
  })
}
