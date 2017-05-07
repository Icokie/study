let x = [1, 2, 4, 5, 6, 8];
let y = [1, 2, 4, 5, 6, 8];


function checkSequence(x, y) {

    let result;

    x.some((elem, index)=> {

        if (!y[index]) {

            return result = true;

        } else {

            if(elem != y[index]) {

                return result = true;
            }

        }

    });

    return !result ;

};

console.log(checkSequence(x, y));