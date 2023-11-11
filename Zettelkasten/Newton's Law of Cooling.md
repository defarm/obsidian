---
tags:
  - definition
id: "202301142200"
subject:
  - "[[Zettelkasten/Subjects/Ordinary Differential Equations]]"
source:
  - "[[The Organic Chemistry Tutor#^6c47ce|JG]]"
---
### Definition:
$$ T(t) = T_s + (T_0-T_s) * e^{-kt} $$
where $T$ gives us the temperature at time $t$, $T_s$ is the temperature of the surroundings, $T_0$ is the temperature at time 0, and $k$ is a constant.
### Derivation:
$$ \frac{d T}{d t} = -k(T - T_s)$$
where $T = T(t)$ and is the final temperature and $T_s$ is the temperature of the surroundings.
$$ d T = -k(T-T_s) d t$$
$$ \frac{d T}{T-T_s} = -k d t$$
$$ \int \frac{dT}{T-T_s} = \int -k dt $$
$$ \ln(T-T_s) = -kt + C $$
$$ e^{\ln(T-T_s)} = e^{-kt + C} $$
$$ T-T_s = e^{-kt+C} = e^{-kt}e^C=Ce^{-kt}$$
$$ T(t) = T_s + Ce^{-kt}$$
$$ T(0) - T_s = T_0 - T_s = C$$
$$ T(t) = T_s + (T_0-T_s)e^{-kt}$$