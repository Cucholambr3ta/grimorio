# 📔 Crónicas de un Código Encantado: El Diario del Desarrollador

## Día 0: La Llamada a la Aventura

Todo comenzó con una idea simple, casi susurrada por las musas del silicio: *"¿Y si programar no se sintiera como trabajar en una hoja de cálculo, sino como jugar un RPG?"*.

Miré mi terminal, esa ventana negra parpadeante que había sido mi única compañera durante años. Estaba cansado de los formularios grises, de los botones "Submit" sin alma. Quería algo más. Quería **magia**.

Así nació **DEVQUEST**. No iba a ser solo una app; iba a ser un portal.

## Día 1: Forjando los Cimientos (y peleando con dragones invisibles)

Decidí usar **React Native** con **Expo**. Es como elegir una espada ligera y versátil: rápida, pero si no tienes cuidado, te puedes cortar.

La primera batalla fue la **Splash Screen**. No quería un logo estático aburrido. Quería que el usuario sintiera que estaba abriendo un libro antiguo, un grimorio prohibido.
*"¡Usaré Reanimated!"*, grité con entusiasmo.
Pobre iluso.

Pasé horas peleando con los hilos de ejecución. La animación se trababa, el libro no se abría, la pantalla se quedaba en blanco como la mente de un estudiante en examen final. Pero entonces, tras litros de café (mi poción de maná), funcionó. El libro se abrió. La aventura había comenzado.

## Día 3: El Contrato Maldito (La Autenticación)

¿Un login? ¿En serio? Nada rompe más la inmersión que un "Ingrese su correo electrónico".
Decidí que no habría login. Habría un **Pacto de Sangre** (bueno, de píxeles).

Diseñé el componente `MagicalContract`. En lugar de un botón "Entrar", creé un sello de cera (`WaxSealButton`). Al presionarlo, debía sentirse pesado, real.
Pero aquí me topé con mi némesis: **Los Assets Perdidos**.

El diseñador (que, sospechosamente, también soy yo) olvidó subir las texturas de madera y papel. La app se veía rosa y negra, gritando errores de "Image not found".
Tuve que improvisar. Usé hechizos de invocación (`placehold.co`) para traer texturas temporales desde el éter de internet. No era la madera de roble ancestral que soñé, pero servía para sostener la ilusión.

## Día 5: El Tablón de Misiones

Necesitaba un lugar donde los aventureros aceptaran sus retos. El `QuestBoard`.
Aquí aprendí que la magia tiene un precio: el rendimiento. Renderizar listas de pergaminos con sombras y texturas pesadas hizo que mi emulador de Android empezara a echar humo.

Tuve que optimizar. "Virtualización", susurró el viento. Aprendí a renderizar solo lo que el ojo ve. El scroll se volvió suave como la seda de araña.

## Día 7: El Gran Despliegue (La Batalla Final)

Llegó el día. El cliente (o sea, yo mismo del futuro) quería ver la app "en vivo". Y no solo en el móvil, sino en la web.
*"¡Pero si esto es React Native!"*, protestó mi cerebro.
*"Expo Web"*, respondió mi corazón valiente.

Intenté el comando prohibido: `npx expo export -p web`.
**ERROR.** Pantalla roja. Sangre en la terminal.
Faltaba `vercel.json`. Faltaba `babel.config.js`. El sistema no sabía cómo hablar el idioma de la web.

Me sentí derrotado. ¿Tanto esfuerzo para morir en la orilla?
Pero recordé las viejas escrituras (la documentación). Creé los archivos de configuración uno a uno, como colocando runas de protección.
1.  `app.json`: La identidad del artefacto.
2.  `vercel.json`: El mapa para la nube.
3.  `package.json`: Los hechizos de invocación.

Corrí el comando de nuevo. La barra de progreso avanzó... 50%... 80%... 100%.
**Done.**

## Epílogo: La Calma

Ahora, veo mi creación desplegada. No es perfecta. A veces las texturas tardan en cargar, y el código tiene algunos parches que espero que nadie vea. Pero funciona.
He convertido líneas de texto en un mundo. He sufrido, he aprendido y, lo más importante, he sobrevivido para contarlo.

Si estás leyendo esto, tú también eres parte de la aventura. Toma tu teclado, Mago del Código. Tu propia historia está a punto de comenzar.

---
*Basado en hechos reales (y algunos bugs dramatizados).*

**— Cucholambreta**

