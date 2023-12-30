exports.DebugPrint = (data) => {
    if (data instanceof Map || data instanceof Set) {
        const ret = [];
        data.forEach(function(value, key) {
            ret.push(`${key} => ${JSON.stringify(value)}`);
        });
        return ret.join('\n');
    }

    return JSON.stringify(data);
};

exports.DebugRedText = (text) => {
    return `\x1B[31m${text}\x1B[0m`;
};

exports.DebugGreenText = (text) => {
    return `\x1B[32m${text}\x1B[0m`;
};

exports.DebugBlueText = (text) => {
    return `\x1B[34m${text}\x1B[0m`;
};

exports.DebugItalicText = (text) => {
    return `\x1B[3m${text}\x1B[0m`;
};

exports.DebugBoldText = (text) => {
    return `\x1B[1m${text}\x1B[0m`;
};

exports.DebugRedBackgroundText = (text) => {
    return `\x1B[41m${text}\x1B[0m`;
};

exports.DebugGreenBackgroundText = (text) => {
    return `\x1B[42m${text}\x1B[0m`;
};

exports.DebugBlueBackgroundText = (text) => {
    return `\x1B[44m${text}\x1B[0m`;
};

exports.DebugUnderlineText = (text) => {
    return `\x1B[4m${text}\x1B[0m`;
};