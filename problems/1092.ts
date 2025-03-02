function shortestCommonSupersequence(str1: string, str2: string): string {
    const dp: any[][] = Array.from({ length: str1.length }, () => Array.from({ length: str2.length }, () => [-1, '']));
    const ret = recur(dp, 0, 0, str1, str2);
    return ret[1];
};

/**
 * dp[i][j]
 * dp[i+1][j+1] + 1 if str1[i] == str2[j]
 * dp[i+1][j] + 1 if str1[i] != str2[j] but choose str1[i]
 * dp[i][j+1] + 1 if str1[i] != str2[j] but choose str2[j]
 * dp[i][j] = min(dp[i+1][j+1], dp[i+1][j], dp[i][j+1])
 */
function recur(dp: any[][], i: number, j: number, str1: string, str2: string): [number, string] {
    if (i >= str1.length && j >= str2.length) {
        return [0, ''];
    }

    if (i >= str1.length) {
        return [str2.length - j, str2.slice(j)];
    }

    if (j >= str2.length) {
        return [str1.length - i, str1.slice(i)];
    }

    if (dp[i][j][0] !== -1) {
        return dp[i][j];
    }

    let ret = Number.MAX_VALUE;
    let retStr = '';
    if (str1[i] === str2[j]) {
        const re = recur(dp, i + 1, j + 1, str1, str2);
        ret = re[0] + 1;
        retStr = str1[i] + re[1];
    } else {
        const re1 = recur(dp, i + 1, j + 1, str1, str2);
        const re2 = recur(dp, i + 1, j, str1, str2);
        const re3 = recur(dp, i, j + 1, str1, str2);
        if (re1[0] + 2 < ret) {
            ret = re1[0] + 2;
            retStr = str1[i] + str2[j] + re1[1];
        }
        if (re2[0] + 1 < ret) {
            ret = re2[0] + 1;
            retStr = str1[i] + re2[1];
        }
        if (re3[0] + 1 < ret) {
            ret = re3[0] + 1;
            retStr = str2[j] + re3[1];
        }
    }
    dp[i][j] = [ret, retStr];
    return dp[i][j];
}