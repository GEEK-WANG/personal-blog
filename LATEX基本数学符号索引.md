---
title: LaTeX 基本数学符号索引
date: 2025-04-04
tags: [LaTeX, 数学符号, 排版, 参考]
publish: true
description: LaTeX常用数学符号速查表，包含希腊字母、上下标、分式根式、运算符、矩阵等写作范例
---

视频原链接[LaTeX公式保姆级教程 (以及其中的各种细节)_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1no4y1U7At/?spm_id_from=333.1387.favlist.content.click&vd_source=432edde79e19c0a440982387e9985e80)
## 希腊字母(Greek letters)
$\alpha,\beta$
$\gamma,\Gamma$
$\delta,\Delta$
$\epsilon,\varepsilon$
$\zeta,\omega$
$\chi,\psi,\Psi$
$\eta,\sigma,\nu,\mu$
$\theta,\vartheta$
$\varphi,\Phi,\phi$


## 上下标
$$
\begin{align}
&a^2,a_1\\
&x^{x+y},p_{ij},p_ij\\
&x_i(做变量斜体) \\
&\rm x_i,\text{A B}(直立体常量) \\
\end{align}
$$
## 分式与根式
$$\begin{align}
&\frac2 3,\frac{1}{x+y} \\
&\frac{\dfrac1 x + 1}{\dfrac1 y + 1} \\
&\sqrt2,\sqrt{x+y},\sqrt[n]{a^{b}}
\end{align}
$$
## 普通运算符
$$
\begin{align}  
&+- \\
&\times,\cdot,\div \\
&\pm,\mp \\
&<>,\ge,\le,\gg,\ll,\ne,\approx,\equiv \\
&\cap,\cup,\in,\notin,\subseteq,\subsetneqq,\varnothing \\
&\because,\therefore \\
&\mathbb R,\mathbb Q,\mathbb Z_+  \\
&\cdots,\vdots,\ddots \\
&\infty,\partial,\nabla,\propto,45\degree \\
&\sin x,\sec x,\cosh x,\arctan x \\
&\log_2 x,\ln x \\
& \lim\limits_{x \to 0}\frac{x}{\sin x} \\
&\max x
\end{align}
$$
## 大型运算符 
$$\begin{align}
\sum,\prod \\
\sum_i,\sum_{i=o}^N \\
\frac{\sum\limits_{i=0}^n x_i  + y}{x + y} \\
\int,\iint,\iiint,\oint \\
\int_{0}^{+\infty} f(x)\,\text dx
\end{align}
$$
```tikz


```
###### 关于空格
$a\,a$
$a\ a$
$a\quad a$
$a\qquad a$
## 标注符号
$\vec x,\overrightarrow {AB}$
$\bar x,\overline{AB}$
## 箭头
$\leftarrow,\Rightarrow,\Leftrightarrow,\longleftarrow$
$\nearrow,\searrow$
## 括号与定界符
$()[]$
$\{\}$
$\lceil,\rceil,\lfloor,\rfloor,|x|$
$\left(0,\frac1 a\right]$
## 大括号（分段函数）
$$
f(x)
\begin{cases}
\sin x,&-\pi\le x\le\pi\\
0,&\text{其他}
\end{cases}
$$

## 矩阵
$$
\begin{matrix}
a & b & \cdots & c\\
\vdots & \vdots & \ddots &\vdots\\
e & f & \cdots & g
\end{matrix}
$$
$$
\begin{bmatrix}
a & b & \cdots & c\\
\vdots & \vdots & \ddots &\vdots\\
e & f & \cdots & g
\end{bmatrix}
$$
$$
\begin{pmatrix}
a & b & \cdots & c\\
\vdots & \vdots & \ddots &\vdots\\
e & f & \cdots & g
\end{pmatrix}
$$

$$
\begin{vmatrix}
a & b & \cdots & c\\
\vdots & \vdots & \ddots &\vdots\\
e & f & \cdots & g
\end{vmatrix}
$$
$\bf A,\bf B^\rm T$
## 实战例子
#### 正态分布
$$\begin{aligned}
&f(x)=\frac {1}{\sqrt {2\pi}\sigma}\rm e^{-\frac {(x-\mu)^{2}}{2\sigma^{2}}}\\
&f(x)=\frac {1}{\sqrt {2\pi}\sigma}\exp \left[{-\frac {(x-\mu)^{2}}{2\sigma^{2}}}\right]
\end{aligned}
$$
$$
\begin{align}
\lim_{N\to \infty}P\left\{\left|\frac{I(\alpha_i)}{N} - H(s)\right|<\varepsilon\right\}=1
\end{align}
$$
$$
\begin{align}
x(n) = \frac 1{2\pi}\int_{-\pi}^{\pi}X\left(\text e^{j\omega}\right)\text e^{j\omega n}\,\text d\omega
\end{align}
$$
$$\begin{aligned}
&多行\\
&格式
\end{aligned}
$$