export const guid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    return s4() + '-' + s4();
}

export const concatCssClasses = (...classes: string[]) => {
    const filtered = classes.filter(c => !!c);

    if (filtered.length) {
        return filtered.join(" ");
    }

    return "";
}