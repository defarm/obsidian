---
tags:
  - definition
id: "202301142223"
subject:
  - "[[Zettelkasten/Subjects/Ordinary Differential Equations]]"
source:
  - "[[The Organic Chemistry Tutor#^b2aadb|JG]]"
aliases:
  - First Order Linear Differential Equations
  - FOLDE
---
### Definition:
A first order linear differential equation in standard form is as follows:
$$ \frac{dy}{dx} + P(x) * y = Q(x) $$
We also need an integrating factor, which is generally shown as:

$$ I(x) = e^{\int P(x) dx} $$
The general solution to a FOLDE is:
$$ y = \frac{1}{I(x)} \left[\int I(x)Q(x)dx +C \right]$$
**Note:** Only add the constant on integration $C$ at when solving for $y$ (not while solving for $I(x)$.