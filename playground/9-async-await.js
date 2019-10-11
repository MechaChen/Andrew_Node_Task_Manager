const doWork = async () => {
    throw new Error('Something went wrong');
    return 'Benson';
}

doWork().then((result) => {
    console.log('result', result);
}).catch((e) => {
    console.log('e', e);
});