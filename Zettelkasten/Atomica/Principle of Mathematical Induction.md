---
tags:
  - definition
id: 20231120211135
subject:
  - "[[Logic]]"
aliases:
  - induction
reference: "[[Underdown Flashcards]]"
---
### Definition:
**Mathematical induction** is process by which one can show that a [[statement]] is [[true]] for [[integers]] given a [[base case]], [[induction step]], and [[inductive hypothesis]]. That being said, given some [[function]] $P$, we want to show that $P(1)$ is true. This is often stated as the first example and does not necessarily need to be 1. Next is the induction step, where we want to show that for every $k \in \mathbb{N},\ P(k) \implies P(k+1)$. That is, we want to show that evaluating the function at $k$ and $k+1$ gives us the same result. This is where the majority of the math occurs. Sometimes it takes clever or non-intuitive methods. Finally, we claim that because $P(k+1)$ holds, every $P(k)$ also holds. This is called the inductive hypothesis.