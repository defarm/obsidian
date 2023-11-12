---
tags:
  - definition
id: "202301261516"
subject:
  - "[[Zettelkasten/Subjects/Ordinary Differential Equations]]"
source:
  - "[[Zettelkasten/References/Ordinary Differential Equations#^003b1b|Tenenbaum, Pollard]]"
---
### Definition:
Let $f(x)$ be a function defined on the interval $I: a < x < b$. A solution to $f(x)$ is explicit if an ODE satisfies the equation involving $x$, $f(x)$, and its derivatives for every $x \in I$. If we replace $y^{(n)}$ by $f^{(n)}(x)$ where $n$ is the $n$-th derivative of $f$, then the differential equation will reduce to an identity in $x$.

The function $f(x)$ is a solution of the differential equation:
$$ F \left (x, y, y', y'', ... , y^{(n)} \right) = 0$$
if

$$ F \left [x, f'(x), f''(x), ..., f^{(n)}(x) \right] = 0 $$