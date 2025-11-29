# 📔 Crónicas de un Código Encantado: El Diario del Desarrollador

# Capítulo 1: El Génesis

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

## Día 7: El Gran Despliegue (La Batalla Final del Inicio)

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

---

# Capítulo 2: La Larga Noche (Días 8-28)

## Día 8: La Calma Antes de la Tormenta

Creí que lo peor había pasado. El despliegue funcionaba, la interfaz brillaba. Me senté en mi silla, contemplando mi creación con la arrogancia de un dios menor.
*"Solo falta conectar el backend"*, pensé. *"Un par de días, a lo sumo"*.

Si pudiera viajar en el tiempo, me abofetearía.

## Día 12: El Laberinto de Supabase

Entrar en la base de datos fue como descender a una mazmorra sin antorchas. Las tablas se burlaban de mí. Las relaciones de claves foráneas eran trampas mortales.
Intenté conectar el `GrimoireContext`. Fallo.
Intenté autenticar un usuario. Fallo.
Intenté simplemente leer una fila. **Permission Denied (RLS Policy Violation).**

Pasé tres días enteros leyendo pergaminos de Row Level Security. Mis ojos ardían. Soñaba con sentencias SQL. *"¿Por qué el usuario anónimo no puede ver las misiones?"*, le gritaba a la pantalla a las 3 AM.

## Día 18: La Guerra de los Tests

Cuando por fin logré que los datos fluyeran, decidí ser responsable. *"Hagamos pruebas unitarias"*, dije. *"Para que sea robusto"*.

Fue una masacre.
Jest y Expo no se hablaban. Reanimated lanzaba errores crípticos sobre hilos de UI que no existían en el entorno de pruebas.
`SyntaxError: Cannot use import statement outside a module`.
Esa frase... esa maldita frase se grabó en mis pesadillas.

Tuve que mockear todo. Mockeé las fuentes. Mockeé las imágenes. Mockeé hasta mi propia cordura. Al final, logré que las pruebas de lógica pasaran (7 de 7, un número sagrado), pero las pruebas de componentes quedaron marcadas por la guerra, funcionales pero cicatrizadas.

## Día 25: El Silencio

Hubo días en los que no escribí ni una línea de código. Solo miraba la pantalla, paralizado por la complejidad de lo que yo mismo había construido. La duda se instaló. *"¿Vale la pena?"* *"¿A quién le importa un RPG para programadores?"*.

Pero entonces, abrí la app en mi teléfono. Vi el sello de cera romperse. Escuché el (imaginario) sonido de las páginas pasando. Y recordé por qué empecé.

## Día 28: Un Respiro en la Cima

Hoy, 20 días después de iniciar esta segunda etapa, estoy descansando.
El sistema de misiones funciona. La base de datos responde. Los tests (la mayoría) están en verde.
He sobrevivido a la integración.

Estoy sentado junto a la fogata, limpiando mi espada (teclado). El fuego crepita. Me siento fuerte, más sabio que hace un mes.
Pero miro hacia el horizonte y lo veo.
Las montañas de la **Optimización de Audio**. Los picos nevados del **Despliegue en Producción**.
Y más allá, oculto en la niebla... el **Feedback de los Usuarios Reales**.

La aventura no ha terminado. Apenas estamos en el intermedio.
Descansaré esta noche. Pero mañana... mañana marchamos de nuevo.

---
*Continuará...*

**— Cucholambreta**

