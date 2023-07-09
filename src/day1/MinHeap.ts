export default class MinHeap {
    public length: number = 0;
    private data: number[] = [];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }
    delete(): number {
        if(this.length === 0) {
            return -1;
        }

        const out = this.data[0];
        if(this.length === 1) {
            this.data = [];
            this.length = 0;
            return out;
        }

        this.length--;
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }

    private heapifyUp(idx: number): void {
        if(idx === 0) {
            return;
        }

        const value = this.data[idx];
        const parentIdx = this.getParent(idx);
        const pValue = this.data[parentIdx];

        if(pValue > value) {
            this.data[idx] = pValue;
            this.data[parentIdx] = value;
            this.heapifyUp(parentIdx);
        }
    }

    private heapifyDown(idx: number): void {
        if(idx >= this.length) {
            return;
        }

        const lChildIdx = this.getLeftChild(idx);

        if(lChildIdx >= this.length) {
            return;
        }

        const rChildIdx = this.getRightChild(idx);
        const lChildVal = this.data[lChildIdx];
        const rchildVal = this.data[rChildIdx];
        const [minChildVal, minChildidx] = lChildVal < rchildVal ? [lChildVal, lChildIdx] : [rchildVal, rChildIdx];
        const value = this.data[idx];

        if(value > minChildVal) {
            this.data[idx] = minChildVal;
            this.data[minChildidx] = value;
            this.heapifyDown(minChildidx);
        }
    }

    private getParent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private getLeftChild(idx: number): number {
        return 2*idx + 1;
    }

    private getRightChild(idx: number): number {
        return 2*idx + 2;
    }
}