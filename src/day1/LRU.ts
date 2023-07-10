type Node<T> = {
    value: T,
    prev?: Node<T>,
    next?: Node<T>,
}

export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;

    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;
    

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        const node = this.lookup.get(key);
        if (!node) {
            this.createNode(key, value);
        } else {
            node.value = value;
            this.detachNode(node);
            this.prependNode(node);
        }
    }
    get(key: K): V | undefined {
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }
        this.detachNode(node);
        this.prependNode(node);
        return node.value;
    }  
    
    private detachNode(node: Node<V>) {
        if(node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (this.head === node) {
            this.head = this.head.next;
        }

        if(this.tail === node) {
            this.tail = this.tail.prev;
        }

        node.next = undefined;
        node.prev = undefined;
    }

    private prependNode(node: Node<V>) {
        if(!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    private createNode(key: K, value: V) {
        const node = {value} as Node<V>;
        this.length++;
        this.trimCache();
        this.prependNode(node);
        this.lookup.set(key, node);
        this.reverseLookup.set(node, key);
    }

    private trimCache() {
        if(this.length <= this.capacity) {
            return;
        }
        const key: K = this.reverseLookup.get(this.tail!)!
        this.lookup.delete(key);
        this.reverseLookup.delete(this.tail!);

        this.detachNode(this.tail!);
        this.length--;
    }
}