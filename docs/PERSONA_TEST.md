# Recorrido sintético por capturas

**Método y límite:** simulación de una persona ficticia, basada en el rol USER. No es entrevista con una residente real ni prueba interactiva. Se inspeccionaron únicamente las cinco capturas indicadas, en el orden siguiente. Las intenciones de pulsación son hipótesis; no se ejecutaron acciones ni se verificó comportamiento.

**Persona:** Gloria, 57 años, coordinadora de edificio sin remuneración. Usa WhatsApp, anota efectivo en una libreta, lee despacio y desconfía de las aplicaciones financieras.

| Captura / tarea | Reacción en primera persona de Gloria | Duda o posible freno |
| --- | --- | --- |
| 01-dashboard.jpg / encontrar el pedido | «Veo los $1,800 y tocaría “Revisar y confirmar”. Para apuntar dinero buscaría “Aportaciones”. Me tranquiliza que diga que no hay pagos reales». | El 62% parece una lectura actual; “SIMULACIÓN” y los textos pequeños requieren atención para no atribuirle una medición real. |
| 04-quotes.jpg / elegir cotización | «La de $1,520 se ve más barata; antes de elegir trataría de leer los litros. Si queremos 10,000, dejaría la primera y tocaría “Confirmar pedido y reparto” después de revisar los $450 de cada quien». | El precio total domina sobre 8,000 frente a 10,000 litros. Podría elegir menos agua creyendo que obtiene lo mismo. |
| 05-contribution-fixed.jpg / registrar transferencia de B | «Escogería Departamento B y Transferencia. Pondría lo que B me acaba de mandar y tocaría “Guardar aportación”. Veo $200 registrados; si ahora da otros $250, no sé de inmediato si debo poner 250 o el total 450». | “Monto recibido” no explicita que sea una nueva aportación. La tabla, el movimiento y el aviso dan evidencia visible de registro, pero esta captura no permite verificar acumulación. |
| 02-delivery-review.jpg / registrar entrega | «Capacidad sí podría buscarla en la cisterna. Pero no sé qué es “calibrada” ni cuántos litros gastaron mientras llenaban. No marcaría que confirmo algo que no sé. Aquí me detendría y llamaría a alguien». | Los campos y la declaración de calibración exigen conocimientos o mediciones que esta coordinadora podría no tener. Los 5,000 litros estimados frente a 10,000 cotizados pueden parecer un faltante comprobado si lee deprisa. |
| 03-summary.jpg / compartir resumen | «Leería el resumen y tocaría “Copiar resumen” para pegarlo en WhatsApp. “Saldo agregado” me cuesta: ¿es lo que falta? Y si dice “Cerrado”, podría pensar que ya quedó pagado». | No se explica en el propio resumen que cerrar el pedido conserva los saldos. Tampoco hay una instrucción breve de pegar lo copiado en el chat elegido. |

## Principal confusión y corrección concreta

**Mayor obstáculo:** registrar una entrega exige confirmar una escala calibrada y anotar consumo durante el llenado sin ofrecer en la captura una salida clara para quien no conoce esos datos. Gloria se detendría; aceptar por compromiso también podría producir una estimación injustificada.

**Corrección propuesta:** antes de calcular, preguntar «¿Tienes una escala de litros verificada para esta cisterna?» con «Sí» y «No / no sé». Para la segunda opción, ofrecer «Guardar entrega pendiente de medición», conservar los datos conocidos y mostrar «Volumen sin estimar: falta verificar la escala». Incluir «No lo sé» para consumo durante el llenado y no tratarlo silenciosamente como cero. Solo mostrar la comparación numérica cuando existan los datos necesarios. Esto es una recomendación de diseño, no una observación de comportamiento probado.

## Cambio implementado por el constructor

Se añadió una alternativa explícita «No tengo medición: registrar recepción». Guarda `liters: null`, conserva la recepción como declaración sin certificar volumen y exige revisión humana antes de cerrar. Se aclaró que cada monto es una nueva aportación y que cerrar no significa haber pagado todo. El cambio se verifica en QA mecánico; no se presenta como una segunda reacción de la persona sintética.

## Retest del rediseño — 2026-10-21

**Misma persona:** Gloria, ficticia, 57 años, coordinadora sin remuneración, usa WhatsApp y libreta, lee despacio y desconfía de aplicaciones financieras. Este es un segundo recorrido sintético visual, no una entrevista ni una prueba interactiva. Se inspeccionaron las siguientes capturas reales del rediseño en este orden; no se pulsaron botones ni se verificaron sus efectos.

### Capturas inspeccionadas y decisiones hipotéticas

1. `evidence/redesign/01-home.jpg` — «Tocaría “Organizar mi pedido”. Si ya está el pedido, abajo veo “Revisar y confirmar”. “Sin pagos reales” me ayuda a entender que esto es una demostración». El porcentaje conserva su rótulo de simulación; no se supone una lectura real.
2. `evidence/redesign/02-order.jpg` — «Ahora veo los 8,000 litros junto al precio menor. Si necesitamos 10,000, dejaría la primera opción; revisaría los $450 y tocaría “Confirmar pedido y reparto”». La cantidad y el costo por 1,000 L tienen más presencia, aunque aún tendría que comparar antes de decidir.
3. `evidence/redesign/03-contributions.jpg` — «B ya tiene $200. Si me acaba de mandar $250, pondría 250: dice “Monto de esta nueva aportación” y que se suma a lo anterior. Después tocaría “Guardar aportación”». La instrucción resuelve mi duda sobre monto nuevo frente a acumulado; no demuestra por sí sola que la suma funcione.
4. `evidence/redesign/04-delivery.jpg` — «Lo primero que veo en el formulario es “¿No conoces los litros?”. Sí, ese es mi caso: tocaría “Registrar recepción sin medición”. Ya no tendría que inventar el consumo ni afirmar que sé calibrar». La alternativa está antes de los campos técnicos y permite identificar una salida clara. Esta captura muestra una entrega con estimación, no el resultado posterior de elegir la alternativa sin medición.
5. `evidence/redesign/05-history.jpg` — «Leo “Entrega cerrada manualmente” y que las aportaciones siguen abiertas. Entiendo que puedo seguir apuntando dinero. Tocaría “Preparar resumen”». El historial diferencia explícitamente cierre de entrega y continuidad del registro de pagos.
6. `evidence/redesign/06-summary.jpg` — «Ahora dice “Saldo por aportar”: faltan $1,350. También dice que cerrar la entrega no significa que todo esté pagado. Revisaría eso y tocaría “Copiar resumen” para pegarlo en el grupo de WhatsApp». El texto compartible conserva esa distinción fuera de la aplicación.

### Antes → corrección visible → resultado del recorrido

| Antes | Corrección visible | Después, según Gloria sintética |
| --- | --- | --- |
| No saber calibración o consumo bloqueaba la decisión de registrar recepción. | “¿No conoces los litros?” y “Registrar recepción sin medición”, antes de los campos. | Identificaría y elegiría la ruta sin medición; el mayor obstáculo de comprensión queda atendido visualmente. No se verificó su ejecución. |
| “Monto recibido” podía interpretarse como total acumulado. | “Monto de esta nueva aportación” y “Escribe solo lo recibido ahora; se sumará a lo anterior”. | Elegiría $250 nuevos, no $450 acumulados, en el ejemplo de B. |
| “Cerrado” y “Saldo agregado” podían parecer cuenta liquidada. | “Entrega cerrada”, “Saldo por aportar” y aclaración explícita en historial y resumen. | Distinguiría entrega terminada de aportaciones pendientes, incluso al compartir. |

**Cuestiones restantes:** la ruta sin medición está claramente ofrecida, pero falta su estado posterior en estas seis capturas para evaluar si Gloria entendería “volumen desconocido”. En el historial las dos aportaciones de B no muestran importes: «Si quiero comprobar cuánto apunté en cada una, tendría que volver a Aportaciones». No apareció un nuevo bloqueo grave en este recorrido. Las conclusiones se limitan a comprensión hipotética de capturas; no constituyen validación con residentes reales ni certifican funcionamiento.
