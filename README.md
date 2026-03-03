# Cheminformatic Engine

A minimal chemical formula analyzer built with Epoxy language
---

Cheminformatic is a lightweight cheminformatics experiment created to test the parsing power and runtime behavior of the Epoxy programming language. The project analyzes user-provided molecular strings, estimates atomic composition, detects bond types (double and triple), approximates hydrogen counts and evaluates a heuristic stability score based on bond-to-atom ratio.

It generates a styled chemical analysis sheet and serves it through a Node.js HTTP server.

---

## Installation & Running

### Step 1 — Install Epoxy Language

Install Epoxy globally from the GitHub repository:

```
npm install -g https://github.com/iamsatyanchal/epoxylang/
```

---

### Step 2 — Run the Project

Navigate to the project directory and execute:

```
epoxy main.epx
```

After execution, the Node.js server will start, enter a chemical formula (try this: `CH2=CHOH`):

```
Server running at localhost:3000
```

Open your browser and visit:

```
http://localhost:3000
```

---

## Example Inputs

```
C2H6
C=C
C#N
CH3C=OOH
CH3C=OOHC6H4C=OOH
```
