module.exports.degree = degree;
module.exports.adjacency = adjacency;
module.exports.laplacian = laplacian;

var ndarray = require('ndarray');

function degree(graph, matrix) {
  var n = graph.getNodesCount();
  if (!matrix) {
    matrix = ndarray(new Int32Array(n * n), [n, n]);
  }
  var i = 0;
  graph.forEachNode(addToMatrix);
  return matrix;

  function addToMatrix(node) {
    const links = graph.getLinks(node.id)
    const degree = Array.isArray(links) ? links.length :links.size; 
    matrix.set(i, i, degree);
    i += 1;
  }
}

function adjacency(graph, isDirected) {
  var n = graph.getNodesCount();
  var matrix = ndarray(new Int32Array(n * n), [n, n]);
  var i = 0;
  var idToIndex = new Object(null);
  graph.forEachLink(addToMatrix);
  return matrix;

  function addToMatrix(link) {
    var fromIdx = idToIndex[link.fromId];
    var toIdx = idToIndex[link.toId];
    if (fromIdx === undefined) {
      idToIndex[link.fromId] = fromIdx = i++;
    }
    if (toIdx === undefined) {
      idToIndex[link.toId] = toIdx = i++;
    }
    matrix.set(fromIdx, toIdx, 1);
    if (!isDirected) {
      matrix.set(toIdx, fromIdx, 1);
    }
  }
}

function laplacian(graph, isDirected) {
  var matrix = adjacency(graph, isDirected);
  degree(graph, matrix);
  var n = matrix.shape[0];
  for (var i = 0; i < n; ++i) {
    for (var j = 0; j < n; ++j) {
      if (i !== j) {
        matrix.set(i, j, - matrix.get(i, j));
      }
    }
  }
  return matrix;
}
