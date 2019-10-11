const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
}

const doWork = async () => {
    const sum = await add(101, 99);
    const sum1 = await add(sum, 100);
    const sum2 = await add(sum1, 50);
    return sum2;
}

doWork().then((result) => {
    console.log('result', result);
}).catch((e) => {
    console.log('e', e);
});