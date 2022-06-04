// Crit-bit tree 也是 tree 的变种, 在维基百科中被重定向到 Radix Tree 可见也是 Radix Tree 的一种变种
// Crit-bit tree 主要是将输入的 key 转换为长整形(32 位) 然后以整数的二进制的 bit 来建立 trie 树, 有效降低内存有效, 最高只有 32 层
// > http://cr.yp.to/critbit.html
class Node {}
export class CritBitTree {
  private root: Node;
  insert() {}
  search() {}
  delete() {}
}
