const doWork = async () => {
    return 'Benson';
}

doWork().then((result) => {
    console.log('result', result);
}).catch((e) => {
    console.log('e', e);
});