export default function bubble_sort(arr: number[]): void {
    for(let j = arr.length - 1; j >= 0; j--) {
        for(let i = 0; i < j; i++) {
            if(arr[i] > arr[i + 1]) {
                const temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
}