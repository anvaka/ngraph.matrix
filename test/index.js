var test = require('tap').test;
var create = require('ngraph.generators');
var getMatrix = require('../');

test('it gets degree matrix', function(t) {
  var testGraph = create.complete(5);
  var degreeMatrix = getMatrix.degree(testGraph);
  var n = degreeMatrix.shape[0];
  var m = degreeMatrix.shape[0];
  t.equal(n, m, 'Degree matrix is a square matrix');
  t.equal(n, testGraph.getNodesCount(), 'Degree matrix has the same dimension as number of nodes');

  for (var i = 0; i < n; ++i) {
    for (var j = 0; j < m ; ++j) {
      if (i === j) {
        t.equal(degreeMatrix.get(i, j), 4, 'Diagonal element is the same as node degree: ' + i + ',' + i);
      } else {
        t.equal(degreeMatrix.get(i, j), 0, 'Non-diagonal element is zero');
      }
    }
  }

  t.end();
});

test('it gets adjacency matrix', function (t) {
  var testGraph = create.complete(5);
  var degreeMatrix = getMatrix.adjacency(testGraph);
  var n = degreeMatrix.shape[0];
  var m = degreeMatrix.shape[0];
  t.equal(n, m, 'Adjacency matrix is a square matrix');
  t.equal(n, testGraph.getNodesCount(), 'Adjacency matrix has the same dimension as number of nodes');
  for (var i = 0; i < n; ++i) {
    for (var j = 0; j < m ; ++j) {
      if (i === j) {
        t.equal(degreeMatrix.get(i, j), 0, 'Diagonal element is zero: ' + i + ',' + j);
      } else {
        t.equal(degreeMatrix.get(i, j), 1, 'Non-diagonal element is one ' + i + ',' + j);
      }
    }
  }
  t.end();
});

test('it gets laplacian', function(t) {
  var testGraph = create.complete(5);
  var degreeMatrix = getMatrix.laplacian(testGraph);
  var n = degreeMatrix.shape[0];
  var m = degreeMatrix.shape[0];
  t.equal(n, m, 'Laplacian matrix is a square matrix');
  t.equal(n, testGraph.getNodesCount(), 'Laplacian matrix has the same dimension as number of nodes');
  for (var i = 0; i < n; ++i) {
    for (var j = 0; j < m ; ++j) {
      if (i === j) {
        t.equal(degreeMatrix.get(i, j), 4, 'Diagonal element is not zero: ' + i + ',' + j);
      } else {
        t.equal(degreeMatrix.get(i, j), -1, 'Non-diagonal element is minus one ' + i + ',' + j);
      }
    }
  }
  t.end();
});
