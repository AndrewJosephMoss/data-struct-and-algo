type Node<T> = {
    val: T,
    next?: Node<T>,
}

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        this.length++;
        const node: Node<T> = {
            val: item
        };
        if(!this.tail) {
            this.head = this.tail = node;
            return;
        }
        this.tail.next = node;
        this.tail = node;
}
    deque(): T | undefined {
        if(!this.head) {
            return undefined;
        }
        this.length--;
        const head = this.head;
        this.head = head.next;
        // Clean up in non-gc
        if(this.length === 0){
            this.tail = undefined;
        }
        return head.val;
}
    peek(): T | undefined {
        return this.head?.val;
}
}