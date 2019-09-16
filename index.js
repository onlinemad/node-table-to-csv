const cheerio = require('cheerio')

module.exports = function (table, options) {

  table = cheerio.load(table)

  let createMatrix = function (table) {
    let matrix = [],
      i = 0

    table('table tr').each(function () {
      let j = 0
      matrix[i] = []

      table(this).find('th').each(function () {
        matrix[i][j] = table(this).text().trim().replace(/(\r\n|\n|\r|,)/gm, '')
        j++
        return matrix
      })

      table(this).find('td').each(function () {
        matrix[i][j] = '"' + table(this).text().trim().replace(/(\r\n|\n|\r|,)/gm, '') + '"'
        j++
        return matrix
      })

      i++
    })

    return matrix
  }

  function createCsv(data) {
    let csv = ''
    for (let i = 0; i < data.length; i++) {
      csv += data[i].join(',') + '\n'
    }
    return csv
  }

  return createCsv(createMatrix(table))

}