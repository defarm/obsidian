---
tags:
  - definition
id: "202309181448"
subject:
  - "[[Real Analysis]]"
source:
  - "[[Real Analysis Flashcards#^73a36a|Underdown]]"
aliases:
  - least upper bound
---
### Definition:
Let $S$ be a [[nonempty subset]] of $\mathbb{R}$. If $S$ is [[bounded]] above, then the **least upper bound** is called the **supremum**, and is denoted $\sup{S}$. Furthermore,
$$m = \sup{S} \iff (m \geq s, \forall s \in S) \wedge (\forall u(u \geq s, \forall s \in S \rightarrow m \leq u))$$
This states that $m$ is the supremum of $S$ if and only if $m$ is greater than every other element in $S$ **and** for any $u$ greater than or equal to every $s$ in $S$, $m$ is less than or equal to $u$. 

Alternatively,
$$m = \sup{S} \iff (m \geq s, \forall s \in S) \wedge (m' <m \rightarrow \exists s' \in S \ni s' > m') $$
states the same thing, though in a different way. Essentially, $m$ is the supremum of $S$ if and only if $m$ is greater than or equal to every $s$ in $S$ **and** if $m'$ is strictly less than $m$, then there is an $s'$ in $S$ such that it is also strictly greater than $m'$. 