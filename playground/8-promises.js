const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
}

// add(3,4).then((result) => {
//     console.log(result);

//     add(result, 100).then((result2) => {
//         console.log(result2);
//     }).catch((e) => {
//         console.log(e);
//     });
// }).catch((e) => {
//     console.log(e);
// });


add(3,4).then((result) => {
    console.log(result);
    return add(result, 100);
}).then((result2) => {
    console.log(result2);
}).catch((e) => {
    console.log(e);
});