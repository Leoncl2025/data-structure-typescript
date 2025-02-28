# 动态规划的两个条件

- 最优子结构：可以用贪婪策略，将问题划分为子问题

- 重叠子问题：避免重复计算

最难的是列出状态转移公式。

## 常见的几种例子

*难度：⭐️⭐️⭐️⭐️⭐️*

[0312. Burst Balloons](../0312.ts)

这里的状态转移公式是：
```
Max(i, j) = max{k=i,...n,...,j}{Max(i,k-1) + nums[i-1]*nums[k]*nums[j+1]+Max(k+1,j)}
```
(作者花了将近3天时间才推出公式来)

[1524. Number of Sub-arrays With Odd Sum](../1524.ts)
*难度：⭐️⭐️⭐️*

状态转移公式使用了两个`dp`变量：
```typescript
if (v % 2 === 0) {
    dpOdd = (dpOdd) % base;
    dpEven = (dpEven + 1) % base;
    ret = (ret + dpOdd) % base;
} else {
    const lastDpOdd = dpOdd;
    dpOdd = (dpEven + 1) % base;
    dpEven = (lastDpOdd) % base;
    ret = (ret + dpOdd) % base;
}
```

[0873. Length of Longest Fibonacci Subsequence](../0873.ts)
*难度：⭐️⭐️*

典型的重复计算子问题。

[1092. Shortest Common Supersequence](../1092.ts)
*难度：⭐️⭐️⭐️*

这里的状态转移公式是：
```
dp[i+1][j+1] + 1 if str1[i] == str2[j]
dp[i+1][j] + 1 if str1[i] != str2[j] but choose str1[i]
dp[i][j+1] + 1 if str1[i] != str2[j] but choose str2[j]
dp[i][j] = min(dp[i+1][j+1], dp[i+1][j], dp[i][j+1])
```