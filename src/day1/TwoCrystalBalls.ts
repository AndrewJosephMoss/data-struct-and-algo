export default function two_crystal_balls(breaks: boolean[]): number {
    let step = Math.floor(Math.sqrt(breaks.length));
    let i = step;
    for (; i < breaks.length; i+=step){
        if(breaks[i])
            break;
    }
    i -= step;
    for(; i < breaks.length; i++) {
        if(breaks[i])
            return i;
    }
    return -1;
}