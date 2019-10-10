interface ITest1 {
    foo: string,
    bar: string;
}

type TTest2 = {
    foo: string;
    bar: string,
};

type TTest3 = { foo: string, bar: string, }

const test4: {
    x: string;
    y: string,
};
