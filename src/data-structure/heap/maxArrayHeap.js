

function swap( array, i, j ) {
  const temp = array[ i ]
  array[ i ] = array[ j ]
  array[ j ] = temp
}

class SimpleMaxArrayHeap {
  heap = [ 0 ];

  constructor( initialValues ) {
    if ( !Array.isArray( initialValues ) ) {
      throw new TypeError( "\"initialValues\" is a array!" )
    }
    this.heap = this.heap.concat( initialValues )
    for ( let i = this.heap.length-1; i >1; i-- ) {
      console.log("beafr",this.heap.join(", "))
      this.floatUp( i )
      console.log("after",this.heap.join(", "))
    }
  }

  push( val ) {
    this.heap.push( val )
    // i / 2 就是它的父节点无论是左还是右节点
    this.floatUp( this.heap.length - 1 )
  }

  floatUp( i ) {
    const temp = this.heap[i]
    while ( i > 1 ) {
      const top = Math.floor( i / 2 )
      if ( this.heap[ i ] < this.heap[ top ] ) {
        break
      }
      this.heap[i] = this.heap[top]
      i = top
    }
    this.heap[i] = temp
  }

  sink( i, length ) {
    const temp = this.heap[i]
    while ( i * 2 + 1 < length ) {
      let max = this.heap[ i * 2 ] > this.heap[ i * 2 + 1 ] ? i * 2 : i * 2 + 1;
      if ( this.heap[ i ] > this.heap[ max ] ) {
        break
      }
      this.heap[i] = this.heap[max]
      i = max
    }
    this.heap[i] = temp
  }

  pop() {
    if ( this.heap.length === 1 ) return null
    if ( this.heap.length === 2 ) return this.heap.pop()
    const result = this.heap.pop()
    const length = this.heap.length
    swap( this.heap, 1, length - 1 )
    this.sink( 1, length )
    return result
  }
}

const heap = new SimpleMaxArrayHeap( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] )
console.log( heap.heap )
console.log( hasMaxArrayHeap( heap.heap ) )


