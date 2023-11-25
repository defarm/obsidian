---
tags:
  - concept
id: 20231114111110
subject: "[[Logic]]"
reference: "[[null]]"
alias: ""
---
### Explanation:
The [[logic]] tables below are of common [[statements]] and their [[logical equivalence|logical equivalences]], [[DeMorgan's Laws]], and other interesting statements.

### Common:
| $P$ | $Q$ | $\neg P$ | $\neg Q$ | $p \wedge q$ | $p \vee q$ | $p \implies q$ | $\neg q \implies \neg p$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 0 | 1 | 1 | 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 | 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 | 1 | 0 | 0 | 
| 1 | 1 | 0 | 0 | 1 | 1 | 1 | 1 |

^0c30a8

### Negations
| $P$ | $Q$ | $\neg P$ | $\neg Q$ | $\neg (p \wedge q)$ | $\neg(p) \vee \neg (q)$ | $p \implies q$ | $\neg q \implies \neg p$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 0 | 1 | 1 | 0 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 | 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 | 1 | 0 | 0 | 
| 1 | 1 | 0 | 0 | 1 | 1 | 1 | 1 |

### Equivalence:

^15bd28

| $P$ | $Q$ | $R$ | $S$ | $\mathfrak{R}:\ (p \oplus q) \implies r$ | $\mathfrak{S}:\ p \odot q \implies s$ | $\mathfrak{D}_\wedge$ | $\mathfrak{R} \wedge \mathfrak{S}$ | $\mathfrak{R} \iff \mathfrak{S}$|
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 0 | 0 | 0 | 1 | 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 1 | 0 | 1 | 0 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 | 1 | 0 | 0 | 0 | 1 |
| 1 | 1 | 0 | 1 | 0 | 1 | 0 | 0 | 1 |

^f37f7d

where $\mathfrak{D}: \{P, Q, R, S\}$
