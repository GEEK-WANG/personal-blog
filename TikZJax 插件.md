---
title: TikZJax 插件
date: 2025-01-20
tags: [TikZ, 绘图, Obsidian插件, 参考]
publish: true
description: TikZJax插件在Obsidian中使用TikZ绘图的基础教程，含坐标系、几何图形、着色等示例
---

【TikZ 绘图入门教学】 https://www.bilibili.com/video/BV1hf4y1H7P3/?p=5&share_source=copy_web&vd_source=85ad28a2dea9286b3266ead723d326ff

官方示例
```tikz
\begin{document}
  \begin{tikzpicture}[domain=0:4]
    \draw[very thin,color=gray] (-0.1,-1.1) grid (3.9,3.9);
    \draw[->] (-0.2,0) -- (4.2,0) node[right] {$x$};
    \draw[->] (0,-1.2) -- (0,4.2) node[above] {$f(x)$};
    \draw[color=red]    plot (\x,\x)             node[right] {$f(x) =x$};
    \draw[color=blue]   plot (\x,{sin(\x r)})    node[right] {$f(x) = \sin x$};
    \draw[color=orange] plot (\x,{0.05*exp(\x)}) node[right] {$f(x) = \frac{1}{20} \mathrm e^x$};
  \end{tikzpicture}
\end{document}
```
### 画坐标系
```tikz
\begin{document}
  \begin{tikzpicture}[>=stealth]%stealth改变箭头样式
    \draw[very thin,color=gray] (-0.1,-1.1) grid (3.9,3.9);%画网格
    \draw[->] (-0.2,0) -- (4.2,0) node[right] {$x$};%x轴
    \draw[->] (0,-1.2) -- (0,4.2) node[above] {$f(x)$};%y轴
  \end{tikzpicture}
\end{document}
```
#### 一些直线的样式
```tikz
\begin{document}
  \begin{tikzpicture}[>=stealth]
    \draw[|<->|,thin] (-0.2,1) --node[fill=white] {4cm}(4.2,1);
    \draw[dashed,thick] (-0.2,0) -- (4.2,0) node[above=3mm] {4cm}; 
    \draw[dotted,very thick] (-0.2,-1) -- (4.2,-1);
    \draw[dashdotted,ultra thick] (-0.2,-2) -- (4.2,-2);
  \end{tikzpicture}
\end{document}
```
##### 直线练习
```tikz
\begin{document}
  \begin{tikzpicture}[>=stealth]%stealth改变箭头样式
    \draw[->] (-1,0) -- (5,0) node[right] {$x$};%x轴
    \draw[->] (0,-1) -- (0,5) node[above] {$y$};%y轴
    \draw(0,2.5)node[left]{$N$}--(2.5,2.5)node[right]{$P(x,y)$}--(2.5,0)node[below]{$M$};
    \node at (-.2,-.2){$O$};
    %\draw(0,1)--(.1,1)node[left=1mm]{$1$};
    %\draw(1,0)--(1,.1)node[below=1mm]{$1$};
    \foreach \x in {1,2,...,8}
    {
    	\draw(0,\x*0.5)node[left]{$\x$}--(.1,\x*0.5);
    	\draw(\x*0.5,0)node[below]{$\x$}--(\x*0.5,.1);
    }
  \end{tikzpicture}
\end{document}
```
### 图形着色，一些几何图形绘制
```tikz
\begin{document}
  \begin{tikzpicture}[>=stealth,scale=.8]%stealth改变箭头样式,scale改变整个图形大小
    \draw[fill=blue](2.5,0)node[above]{$A$}--(0,1)node[right]{$B$}--(-2.5,0)node[above]{$C$}--(0,-1)node[right]{$D$}--(2.5,0);
    \draw[->] (-4,0) -- (4,0) node[right] {$x$};%x轴
    \draw[->] (0,-4) -- (0,4) node[right] {$y$};%y轴
    \node at (-.3,-.3){$O$};
  \end{tikzpicture}
\end{document}
```


 ```tikz
 \begin{document}
   \begin{tikzpicture}[>=stealth]%stealth改变箭头样式
     \draw[fill=cyan] (0,0) rectangle (4,3);
     \fill[yellow,draw=black] (0,-4) rectangle (5,-1);
   \end{tikzpicture}
 \end{document}
 ```

```tikz
\begin{document}
   \begin{tikzpicture}[>=stealth]%stealth改变箭头样式
     \draw[fill=red] (0,0) circle (1.5);
   \end{tikzpicture}
 \end{document}
```
```tikz

```
 ```tikz

 ```

```tikz
\begin{document}
   \begin{tikzpicture}[>=stealth]%stealth改变箭头样式
     \draw[fill=cyan] (0,0) circle (2.5);
   \end{tikzpicture}
 \end{document}
```
```tikz
\begin{document}
   \begin{tikzpicture}[>=stealth]%stealth改变箭头样式
     \draw (0,0)--(4,0);
     \draw (0,0)--(45:4);%\draw (0,0)--(4,4);
     \draw[->] (0.5,0) arc (0:45:0.5) node[right]{$\frac{\pi}{4}$};
   \end{tikzpicture}
 \end{document}
```



```tikz
\begin{document}
   \begin{tikzpicture}[>=stealth]%stealth改变箭头样式
     \draw (0,0)node[left]{$A$}--(5,0)node[right]{$B$};
     \draw (0,0) arc (180:0:2.5);
     \draw (0,0)--(53:3)node[above]{$C$};
     \draw (9/5,0)node[below]{$D$}--(53:3);
     \draw (5,0)--(53:3);
     \draw[|<->|] (0,-0.4)--node[fill=white]{$a_1$}(9/5,-0.4);
     \draw[|<->|] (9/5,-0.4)--node[fill=white]{$a_2$}(5,-0.4);
     
   \end{tikzpicture}
 \end{document}
```





