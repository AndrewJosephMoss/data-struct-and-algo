function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
    if(!curr)
       return path;

    walk(curr.left, path);
       
    //in-order
   path.push(curr.value);
   
   walk(curr.right, path);
   return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}