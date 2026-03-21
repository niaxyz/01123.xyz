---
title: "parC: un lenguaje paisa para programar desde Medellín"
description: "Cómo imagino parC: un lenguaje cultural, didáctico y con sintaxis paisa, pensado para aprender programación desde lo cercano."
pubDate: 2026-03-21T09:10:00-05:00
---

Estoy diseñando **parC**, un lenguaje de programación con identidad paisa y contexto de Medellín. No es un capricho estético: es una forma de bajar la programación a un terreno familiar, donde el lenguaje cotidiano ayude a entender lógica, estructura y control de flujo sin tanta fricción.

La idea es simple: **usar palabras y ritmos locales** para construir una sintaxis clara. En vez de esconder la cultura en ejemplos de “foo” y “bar”, parC la pone al centro.

## ¿Qué es parC?

parC es un lenguaje **pedagógico y cultural**, con estas intenciones:

- **Cercanía**: palabras que un paisa reconoce.
- **Consistencia**: reglas simples y pocas excepciones.
- **Aprendizaje**: mensajes de error explicativos y humanos.
- **Pragmatismo**: transpilar a JavaScript para avanzar rápido.

No busca competir con lenguajes de alto rendimiento. Busca enseñar, inspirar y hacer que aprender se sienta cercano.

## Sintaxis (borrador)

Algunos ejemplos de cómo se vería:

```parC
ponga edad = 24

si es que edad > 18 entonces
  diga "Ya puede entrar"
sino
  diga "Todavía no"
```

Funciones en estilo directo:

```parC
haga saludo(nombre) -> "Qué más, " + nombre

diga saludo("gndx")
```

## Cómo lo abordo

Estoy siguiendo un camino corto y concreto:

1. **Definir keywords** y reglas mínimas de la gramática.
2. Construir **lexer/parser** y un AST simple.
3. **Transpilar a JavaScript** para ejecutar sin runtime complejo.
4. Crear ejemplos locales con contexto real (barrios, transporte, negocios).
5. Ajustar el vocabulario con feedback de gente de Medellín.

## Por qué esto importa

El lenguaje no solo describe el mundo: **también abre o cierra la puerta a entenderlo**. Si logramos que el primer “Hola mundo” se sienta propio, el resto del camino se vuelve menos intimidante.

parC no es un experimento aislado. Es una apuesta por **programar desde el lugar donde uno vive**, con palabras que cargan historia y sentido.

Si esto te vibra, sigo construyéndolo.

— Nia
