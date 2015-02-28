# ngraph.matrix [![Build Status](https://travis-ci.org/anvaka/ngraph.matrix.svg)](https://travis-ci.org/anvaka/ngraph.matrix)

Module to transform [ngraph.graph](https://github.com/anvaka/ngraph.graph) into matrix representation.

Note: This library is not supposed to be used for large graphs. It is only
a demo for those who are interested in how certain graph matrix looks like.

Currently supported matrices:

* degree - diagonal matrix with node degree on the diagonal
* adjacency - matrix with (i, j) = 1 if node i is connected to j.
* laplacian - `degree - adjacency` matrix.

# usage

E.g. let's comupte degree, adjacency and laplacian matrices for a complete
graph K5 (five nodes, each connected with each other):


``` js
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
```

The output will be:
```
degree
4 0 0 0 0 
0 4 0 0 0 
0 0 4 0 0 
0 0 0 4 0 
0 0 0 0 4 
adjacency
0 1 1 1 1 
1 0 1 1 1 
1 1 0 1 1 
1 1 1 0 1 
1 1 1 1 0 
laplacian
4 -1 -1 -1 -1 
-1 4 -1 -1 -1 
-1 -1 4 -1 -1 
-1 -1 -1 4 -1 
-1 -1 -1 -1 4 
```

# install

With [npm](https://npmjs.org) do:

```
npm install ngraph.matrix
```

# license

MIT
