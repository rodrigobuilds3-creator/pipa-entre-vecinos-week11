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
