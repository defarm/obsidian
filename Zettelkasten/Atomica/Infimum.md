---
tags:
  - definition
id: 20231114121144
subject: "[[Real Analysis]]"
reference: "[[Underdown Flashcards]]"
alias: greatest lower bound
---
### Definition:
### Definition:
Let $S$ be a [[nonempty subset]] of $\mathbb{R}$. If $S$ is [[bounded]] below, then the **greatest lower bound** is called the **infimum**, and is denoted $\inf{S}$. Furthermore,
$$m = \inf{S} \iff (m \leq s, \forall s \in S) \wedge (\forall u(u \leq s, \forall s \in S \rightarrow m \geq u))$$
This states that $m$ is the infimum of $S$ if and only if $m$ is less than every other element in $S$ **and** for any $u$ less than or equal to every $s$ in $S$, $m$ is greater than or equal to $u$. 

Alternatively,
$$m = \inf{S} \iff (m \leq s, \forall s \in S) \wedge (m' > m \rightarrow \exists s' \in S \ni s' < m') $$
states the same thing, though in a different way. Essentially, $m$ is the infimum of $S$ if and only if $m$ is less than or equal to every $s$ in $S$ **and** if $m'$ is strictly greater than $m$, then there is an $s'$ in $S$ such that it is also strictly less than $m'$. 