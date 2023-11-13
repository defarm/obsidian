---
tags:
  - corollary
id: 20231112171122
subject: "[[Real Analysis]]"
reference: "[[Real Analysis Flashcards]]"
alias: ""
---
### Insight:
Suppose that $f(x) = \sum_{n=0}^{\infty} a_nx^n$ for $x \in (-R, R)$ where $R>0$. Then for every $k \in \mathbb{N}$, the $k\text{th}$ derivative $f^{(k)}$ of $f$ exists on $(-R, R)$ and is the [[power series]]:
$$ f^{(k)}(x) = \sum_{n=0}^{\infty} \dfrac{n!}{(n-k)!}a_{nx^{n-k}}= k!a_k+(k+1)!a_{k+1}+\dfrac{(k+2)!}{2!}a_{k+2}x^{2}+\cdots$$
Furthermore, $f^{(k)}(0) = k!a_k$.
### Question:
Is $R$ the [[Radius of convergence]]?