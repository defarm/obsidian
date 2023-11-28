---
tags: [definition]
id: 20231125161116
subject: "[[Abstract Algebra]]"
alias: mat
reference: "[[A Book of Abstract Algebra]]"
---
### Definition:
A **matrix** is a rectangular [[array]] of numbers. There are several types of matrices.

Zero Matrix:
A matrix of any shape composed entirely of zeroes.
$$\bf{}{0} = \begin{pmatrix}
0 & \dots & 0 \\
\vdots & \ddots & \vdots \\
0 & \dots & 0 
\end{pmatrix}$$
[[Identity]] Matrix:
A square matrix with ones along the main diagonal and zeroes everywhere else.
$$\bf{I}=\begin{pmatrix}
1 & \cdots & 0 \\
\vdots & 1 & \vdots \\
0 & \cdots & 1 
\end{pmatrix}$$
Given some matrix $A$, $A \textbf{I} = \textbf{I}A = A$. In the algebra of numbers, $A^2=\textbf{I} \implies A = \pm 1$. This is not true in the algebra of matrices.

The operations performed on a matrix are addition and multiplication. These operations are similar to the [[dot product]] of two [[vector|vectors]]. That is, $(\begin{matrix} a & b\end{matrix})\cdot \begin{matrix}(a' & b')\end{matrix}=\begin{matrix}(aa' + bb')\end{matrix}$.
Addition:
$$\begin{pmatrix}
a & b \\ c & d
\end{pmatrix} + \begin{pmatrix}
a' & b' \\ c' & d'
\end{pmatrix} = \begin{pmatrix}
a + a' & b + b' \\ c + c' & d + d'
\end{pmatrix}$$
Multiplication:
$$\begin{pmatrix}
a & b \\
c & d
\end{pmatrix} \cdot \begin{pmatrix}
a' & b' \\
c' & d'
\end{pmatrix} = \begin{pmatrix}
aa' + bc' & ab' + bd' \\
ca' + dc' & c b' + dd'
\end{pmatrix}$$
Matrices are not universally [[Commutativity]]. Additionally, if $A, B, C$ are three matrices, where $A \neq \bf{0}$, then $AB = AC \centernot \implies B =C$.