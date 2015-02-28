var create = require('ngraph.generators');
var getMatrix = require('ngraph.matrix');
var graph = create.complete(5);

printMatrix('degree', getMatrix.degree(graph));
printMatrix('adjacency', getMatrix.adjacency(graph));
printMatrix('laplacian', getMatrix.laplacian(graph));

function printMatrix(name, d) {
  console.log(name);
  for (var i = 0; i < d.shape[0]; ++i) {
    var str = '';
    for (var j = 0; j < d.shape[1] ; ++j) {
      str += d.get(i, j) + ' ';
    }
    console.log(str);
  }
}
