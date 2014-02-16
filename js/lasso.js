/*

    lasso.js - No fuss one-way data binding.

    http://github.com/eddflrs/lasso.js

*/

(function ($) {

  var idxMappings = {};

  var hashCode = function (str){
    var hash = 0, i, char;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };

  $.fn.lasso = function (evtType, collection, cb) {

    var i = 0,
        selector = this,
        length = collection.length,
        collectionStr = JSON.stringify(collection),
        collHashCode = hashCode(collectionStr);
        idxMapping = idxMappings[collHashCode];

     if (!idxMapping) {
      idxMappings[collHashCode] = {};
      idxMapping = idxMappings[collHashCode];
     }

    for (i; i < length; i++) {
      idxMapping[i] = i;
    }

    idxMapping.length = length;

    var lasso = function (idx) {
      this.idx = idx;
      this.item = collection[idxMapping[idx]];
    };

    lasso.prototype.remove = function () {
      var removedArr = collection.splice(idxMapping[this.idx], 1);
      idxMapping[this.idx] = null;
      for (var i = this.idx + 1; i < idxMapping.length; i++) {
        if (idxMapping[i] !== null) {
          idxMapping[i] -= 1;
        }
      }
      return removedArr[0];
    };

    $(this).each(function (idx, el) {
      $(el).attr('data-lasso-idx', idx);
    });

    $(this).on(evtType, function (evt) {
      var lassoIdx = $(this).data('lasso-idx');
      evt.lasso = new lasso(lassoIdx);
      if (cb) {
        cb.call(this, evt);
      }
    });

    return this;
  };

} (jQuery));