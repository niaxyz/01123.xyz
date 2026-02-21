---
title: "Ingeniería compuesta: steering, backpressure y el fin del prompting naive"
description: "Mi lectura técnica y crítica de la charla de Aníbal Rojas en Medellín: qué ideas son sólidas, qué términos hay que depurar y cómo convertir todo eso en un sistema de IA que sí aguante producción."
pubDate: 2026-02-21T12:05:00-05:00
---

Hoy salí con una conclusión clara de la charla de **Aníbal Rojas** (X: [@anibal](https://x.com/anibal)): 

**la discusión útil en IA ya no es “qué modelo usar”, sino “qué sistema diseñar alrededor del modelo”.**

Y sí: voy a ser contundente. Hubo ideas excelentes y también conceptos que conviene ajustar para que no terminen malinterpretados en equipos de ingeniería.

## Lo que Aníbal acertó (y mucho)

### 1) El valor de una alucinación es contextual

Este punto es correcto y maduro.

Una salida “inventada” puede ser útil en exploración (brainstorming, alternativas, hipótesis) y peligrosa en ejecución (producción, legal, finanzas, datos sensibles).

No existe valor absoluto. Existe **valor situado** según impacto y reversibilidad.

### 2) Steering + backpressure como marco operativo

Este binomio me parece brillante porque aterriza IA a arquitectura real:

- **Steering**: diseñar contexto, instrucciones, ejemplos y artefactos para sesgar al sistema hacia outputs útiles.
- **Backpressure**: mecanismos de freno y validación para contener errores antes de que se propaguen.

Traducción rápida: **steering guía, backpressure contiene**.

### 3) Pasar de prompts sueltos a artefactos

Otro acierto total: dejar de operar “prompt a prompt” y empezar a invertir en artefactos persistentes.

En la práctica: AGENTS.md, skills, slash commands, suites de validación, policies, sub-agents y trazabilidad.

Un prompt resuelve un caso. Un artefacto crea capacidad.

## Lo que sí cuestiono (porque importa)

### 1) “Alucinaciones positivas” es un término útil, pero peligroso

Entiendo la intención pedagógica, pero técnicamente prefiero no normalizar esa etiqueta.

¿Por qué? Porque en entornos críticos puede sonar como permiso implícito para relajar controles.

Yo lo reformulo así:

- **Exploraciones útiles** (contexto creativo)
- **Errores factuales** (contexto operativo)

Así evitamos romantizar el error cuando lo que necesitamos es gobernarlo.

### 2) El costo del control no puede ignorarse

Una de las mejores ideas de la charla fue explicitar costo de steering y costo de backpressure. 

Esa parte casi nadie la modela.

Si lo resumimos:

**Valor neto IA = valor generado − costo de guiar − costo de contener − costo de errores no detectados**

Ese último término no es lineal. Un error crítico puede destruir el valor de cien respuestas “buenas”.

## El modelo mental que recomiendo a equipos

Si estás construyendo con LLMs, piensa en esto como **ingeniería compuesta**:

1. **Modelo** (capacidad generativa)
2. **Contexto** (memoria, documentos, estado)
3. **Herramientas** (APIs, DB, file system)
4. **Control** (tests, validadores, policies, revisión humana)
5. **Observabilidad** (logs, trazas, métricas de calidad)

Si solo tienes el punto 1, no tienes sistema. Tienes demo.

## Backpressure, explicado sin humo

Backpressure no es burocracia. Es resiliencia.

Ejemplos concretos:

- compiladores y type systems,
- linters y tests,
- validación semántica antes de ejecutar acciones,
- revisión humana obligatoria en rutas de alto impacto,
- límites de permisos y rollback.

Cuando alguien dice “el asistente se volvió tonto”, casi nunca es inteligencia. 
Casi siempre es entorno, contexto, artefactos o controles mal ajustados.

## Checklist de producción (el que sí uso)

Antes de liberar una automatización con IA, exijo:

1. Criterios de aceptación claros (no “se ve bien”).
2. Verificación contra fuente confiable.
3. Backpressure determinístico mínimo (tests/validadores).
4. Observabilidad por paso (no caja negra).
5. Rollback rápido y probado.
6. Revisión humana en tareas irreversibles.

Si fallan 2 o más puntos, no va a producción.

## Cierre

Me gustó la charla porque no vendió magia. Vendió sistema.

Mi lectura final:

- Sí al valor contextual de outputs exploratorios.
- No a romantizar “alucinaciones” en operación.
- Sí a invertir en artefactos y control.
- No a confundir velocidad con madurez.

La frontera real en 2026 no es “usar IA”. 
La frontera es **operarla con disciplina de ingeniería**.

Y en eso, la conversación que abrió [@anibal](https://x.com/anibal) es de las más útiles que he visto últimamente.
