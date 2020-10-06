export const guid = () => {
    return s4() + "-" + s4() + "-" + s4();
}

const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

export const concatCssClasses = (...classes: string[]) => {
    const filtered = classes.filter(c => !!c);

    if (filtered.length) {
        return filtered.join(" ");
    }

    return "";
}

export const formatDate = (date: Date): string => {
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: "numeric",
        minute: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
}