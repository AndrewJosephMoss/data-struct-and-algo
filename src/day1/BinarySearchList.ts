export default function bs_list(haystack: number[], needle: number): boolean {
    let min = 0;
    let max = haystack.length;
    do{
        let mid = Math.floor((min + max) / 2);
        let val = haystack[mid];
        if(val === needle){
            return true;
        }
        else if(needle > val){
            min = mid + 1;
        }
        else{
            max = mid;
        }
    } while(min < max)
    return false;
}