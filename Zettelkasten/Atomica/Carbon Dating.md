---
tags:
  - concept
id: "202311031613"
subject:
  - "[[Zettelkasten/Subjects/Ordinary Differential Equations]]"
  - "[[History of Mathematics]]"
source:
  - "[[Zettelkasten/References/Ordinary Differential Equations#^efe444|Tenenbaum, Pollard]]"
---
### Explanation:
In 1940, a group boys were looking for their dog and found him in a cave. When they went to retrieve him, they found cave paintings and charcoal from a fire. The question is this: when did these people live in this cave (or more specifically, when was the fire burned)?

All living organisms contain $C^{12}$ and $C^{14}$. The latter is radioactive, and after death, begins to decay. Using this information, we can formulate a way to answer the question.

Let $t$ represent the amount of time since the tree died and let $x$ represent the amount of $C^{14}$ present in the dead tree at any time $t$. The [[instantaneous rate of change]] is represented as:

$$\dfrac{dt}{dx}$$
We assume that the carbon-14 decays at a rate of the first power of $x$ and some constant multiple $k$. Therefore, we have the following:

$$ \dfrac{dt}{dx} = -kx$$
To solve this, we use the formula for a [[First Order Linear Differential Equation]]:
$$ y = \frac{1}{I(x)} \left[\int I(x)Q(x)dx +C \right]$$
Since $P(x)=0$ and is a constant, we are left with:

$$\int\dfrac{dx}{x} = -\int k dt \rightarrow \log x = -kt + C \rightarrow e^{\log x} = e^{c}e^{-kt} \rightarrow x = Ae^{-kt}$$
where $A$ is a new constant. To solve this problem, we must obtain data from chemistry. Accordingly, it is found that after 10 years, approximately $0.99876A$ carbon-14 remains. Therefore:

$$ 0.99876A = Ae^{-10k} \rightarrow \log 0.99876 = -10k \rightarrow -0.000124 = k$$
Substituting in $k$, we have:

$$ x = Ae^{-0.000124t} $$
Comparing the carbon-14 in a living tree to that of the sample, we find that around 85.5 percent of the substance had decayed since the tree died. Therefore,

$$ 0.145A = Ae^{-0.000124t} \rightarrow \log 0.145 = -0.000124t \rightarrow \dfrac{-1.9310}{-0.000124} = t = 15573 $$
Thus, the tree lived over 15,500 years ago.