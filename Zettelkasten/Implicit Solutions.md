---
tags:
  - definition
id: "202301261526"
subject:
  - "[[Zettelkasten/Subjects/Ordinary Differential Equations]]"
source:
  - "[[Sources/Ordinary Differential Equations#^29027a|Tenenbaum, Pollard]]"
---
### Definition:
A relation $f(x, y)$ is an implicit solution of:
$$ F\left (x, y, y', ..., y^{(n)} \right) = 0$$
on the interval $I: a < x < b$ if:

1. it defines $y$ as an implicit function of $x$ on $I$, ie. if there's a function $g(x)$ such that $f(x, g(x)) = 0 \quad \forall x \in I$ and,
2. $$F \left [ x, g(x), g'(x), ...,g^{(n)}(x) \right] = 0 $$