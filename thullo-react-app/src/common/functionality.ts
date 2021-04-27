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
    if (!date) return "";

    const options: any = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: "numeric",
        minute: "numeric",
    };

    return date.toLocaleDateString("en-US", options);
}

export const downloadFile = (srcUrl: string, fileName: string, type = "text/plain") => {
    fetch(srcUrl)
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => alert("Error whilte downloading the file"));
}