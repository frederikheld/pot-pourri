'use strct'

/**
 * Can be used to check if a json object or array of objects
 * has the same keys the comparison object while omitting
 * additional keys.
 *
 * This can be useful if you want to test the result of an
 * API call that contains additional meta data.
 *
 * Usage:
  *
 * const result = await getFromApi()
 * result.should.be.like([
 *    { foo: 'bar' },
 *    { foo: 'baz' }
 * ])
 *
 * while result might acutally look like:
 * [
 *    { _id: 'dalmwd3i', foo: 'bar' },
 *    { _id: 'fn923nfs', foo: 'baz' }
 * ]
 *
 */

module.exports = function (chai, _) {
  chai.Assertion.addMethod('jsonLike', function (arrayOfObjectsToCompareWith) {
    let expected, actual, message

    this.assert(
      objectsHaveEntries(this._obj, arrayOfObjectsToCompareWith)
      , message
      , 'ERROR: objectsWithEntries doesn\'t work with negation operator!'
      , expected // expected
      , actual // actual
    )

    function objectsHaveEntries (arrayOfObjects, arrayOfObjectsToCompareWith) {
      // check array length:
      if (arrayOfObjects.length !== arrayOfObjectsToCompareWith.length) {
      // check for unexpected objects in array:
        if (arrayOfObjects.length > arrayOfObjectsToCompareWith.length) {
          message = 'Array contains more objects than expected!'
        }

        // check for missing objects in array:
        if (arrayOfObjects.length < arrayOfObjectsToCompareWith.length) {
          message = 'Array contains less objects than expected!'
        }

        expected = 'length of ' + arrayOfObjectsToCompareWith.length
        actual = 'length of ' + arrayOfObjects.length
        return false
      }

      for (let i = 0; i < arrayOfObjects.length; i++) {
        if (typeof arrayOfObjects[i] !== 'object' || arrayOfObjects[i] === null) {
          expected = 'type object'
          actual = 'type ' + typeof arrayOfObjects[i]
          message = 'Entry \'' + arrayOfObjects[i] + '\' at pos ' + i + ' is not an object!'
          return false
        }

        const keys = Object.keys(arrayOfObjectsToCompareWith[i])
        for (let j = 0; j < keys.length; j++) {
          let hasError = false
          if (!arrayOfObjects[i][keys[j]]) {
            message = 'Key \'' + keys[j] + '\' missing in object ' + i + '!'
            hasError = true
          } else if (arrayOfObjects[i][keys[j]] !== arrayOfObjectsToCompareWith[i][keys[j]]) {
            hasError = true
          }

          if (hasError) {
            expected = arrayOfObjectsToCompareWith[i][keys[j]]
            actual = arrayOfObjects[i][keys[j]]
            return false
          }
        }
      }
      return true
    }
  })
}
