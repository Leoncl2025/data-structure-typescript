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