const firstItem ={
    rows: 2,
    cols: 4,
}

const arrenge1 = [
    {
        rows: 2,
        cols: 2,
    },
    {
        rows: 1,
        cols: 2,
    },
    {
        rows: 2,
        cols: 2,
    },
    {
    },
    {
    },
    {
        cols: 2,
    },
    {
        rows: 2,
        cols: 2,
    },
    {
        rows: 2,
        cols: 2,
    },
    {
        cols: 2,
    }
];
export default function getArrenge(numberOfItem){
    var arrenge = [firstItem];
    for(var i =1;i<numberOfItem;i++){
        arrenge.push(arrenge1[i%9])
    }
    return arrenge;
}
