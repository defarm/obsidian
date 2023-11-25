---
tags:
  - definition
id: 20231113011137
subject:
  - "[[Real Analysis]]"
reference: "[[ChatGPT#^a05f2c|Math Conversation]]"
aliases:
---
### Definition:
If a [[Sequence]] $(s_n)$ or [[series]] $(a_n)$ does not [[Convergence|converge]], it is said to diverge. There are several types of divergence.

1. [[Absolute Convergence|Absolute]]
	1. Outside of the [[Radius of convergence]] the series may diverge absolutely.
2. [[Conditional Convergence|Conditional]]
	1. At the boundary of the radius of convergence, a series may diverge conditionally, in that it does not converge absolutely.
3. [[Infinity]]
	1. To $+ \infty$:
		1. For every $M$ in the [[real|reals]], there is an $N$ such that for $n$ larger than $N$, then $(s_n)$ is larger than $M$. Notationally:
$$ \forall M \in \mathbb{R},\ \exists N : n > N \implies s_{n}> M $$
	2. To $-\infty$:
		1. For every $M$ in the [[real|reals]], there is am $N$ such that for $n$ less than $N$, then $(s_{n})$ is less than $M$. Notationally:
$$ \forall M \in \mathbb{R},\ \exists N: n < N \implies s_{n}< M $$
4. Oscillating
	1. A series may take on multiple subsequential limits or other non-convergent behavior. An example of this would be the function:$$f(x)=\cases{1\quad 0\equiv_{2}x \\
			0\quad 1\equiv_{2}x},\ x \in \mathbb{N}$$
5. Boundlessly
	1. It may diverge boundlessly, but not necessarily to infinity.