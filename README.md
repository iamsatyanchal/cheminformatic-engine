# Cheminformatic Engine

A minimal chemical formula analyzer built with Epoxy language
---

Cheminformatic is a lightweight cheminformatics experiment created to test the parsing power and runtime behavior of the Epoxy programming language. The project analyzes user-provided molecular strings, estimates atomic composition, detects bond types (double and triple), approximates hydrogen counts and evaluates a heuristic stability score based on bond-to-atom ratio.

It generates a styled chemical analysis sheet and serves it through a Node.js HTTP server.

## Examples
```
C2H6
C=C
C#N
CH3C=OOH
CH3C=OOHC6H4C=OOH
```
