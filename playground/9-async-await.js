const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
}

const doWork = async () => {
    const sum = await add(101, 99);
    return sum;
}

doWork().then((result) => {
    console.log('result', result);
}).catch((e) => {
    console.log('e', e);
});