---
title: 华里士公式（Wallis公式）
date: 2025-01-20
tags: [数学, 积分, Wallis公式, 定积分]
publish: true
description: 华里士（Wallis）公式在[0,π/2]、[0,π]、[0,2π]三个区间上sin^n和cos^n的定积分值
---

####  区间 $[0, \frac{\pi}{2}]$
$$
\int_0^{\frac{\pi}{2}} \sin^n x \, dx = \int_0^{\frac{\pi}{2}} \cos^n x \, dx = 
\begin{cases}
\dfrac{n-1}{n} \cdot \dfrac{n-3}{n-2} \cdots \dfrac{2}{3} \cdot 1, & n \text{ 为大于 } 1 \text{ 的奇数} \\[1em]
\dfrac{n-1}{n} \cdot \dfrac{n-3}{n-2} \cdots \dfrac{1}{2} \cdot \dfrac{\pi}{2}, & n \text{ 为正偶数}
\end{cases}
$$

####  区间 $[0, \pi]$

对于 $\sin^n x$：
$$
\int_0^{\pi} \sin^n x \, dx = 
\begin{cases}
2 \cdot \dfrac{n-1}{n} \cdot \dfrac{n-3}{n-2} \cdots \dfrac{2}{3} \cdot 1, & n \text{ 为大于 } 1 \text{ 的奇数} \\[1em]
2 \cdot \dfrac{n-1}{n} \cdot \dfrac{n-3}{n-2} \cdots \dfrac{1}{2} \cdot \dfrac{\pi}{2}, & n \text{ 为正偶数}
\end{cases}
$$

对于 $\cos^n x$：
$$
\int_0^{\pi} \cos^n x \, dx = 
\begin{cases}
0, & n \text{ 为正奇数} \\[1em]
2 \cdot \dfrac{n-1}{n} \cdot \dfrac{n-3}{n-2} \cdots \dfrac{1}{2} \cdot \dfrac{\pi}{2}, & n \text{ 为正偶数}
\end{cases}
$$

####  区间 $[0, 2\pi]$
$$
\int_0^{2\pi} \sin^n x \, dx = \int_0^{2\pi} \cos^n x \, dx = 
\begin{cases}
0, & n \text{ 为正奇数} \\[1em]
4 \cdot \dfrac{n-1}{n} \cdot \dfrac{n-3}{n-2} \cdots \dfrac{1}{2} \cdot \dfrac{\pi}{2}, & n \text{ 为正偶数}
\end{cases}
$$