<template>
    <div class="scrum-view">
        <Title 
            title="Gestión de Tareas en Scrum - Jira" 
            image="/src/views/Onboarding/ShowerContent/Src/Jira.png" 
            color="#2684FF"
            under
        />
            
        <InfoCard1 
            title="¿Cómo trabaja un desarrollador con Jira?"
            emoji="🔄"
            text1="En Jira, cada desarrollador gestiona sus tareas a través de un tablero visual donde cada tarjeta representa una tarea a realizar. El flujo de trabajo principalmente se basa en mover estas tarjetas dentro del tablero reflejando nuestros estados con las mismas."
            text2="El tablero se divide en 5 columnas o estados: Por hacer, En curso, Bloqueado, Testeo y Listo."
        />
            
        <InfoCard2
            emoji="📝"
            text1="Estas tareas tienen un tiempo determinado para ser completadas, el cual es predefinido por el líder del equipo. En caso de que no se complete a tiempo, éstas se retrasan y quedarán superpuestas con el siguiente sprint, teniendo así el programador más de 1 tarea a realizar, lo cual NO es recomendable. 🙈"
            text2="Por dia semanalmente se debe de hacer una Daily Meeting con el líder del equipo para informar el estado de las tareas y poder reasignar tareas en caso de que sea necesario. También es un lugar para plantear dudas y/o dificultades que se puedan presentar. El horario a acordar es a cargo del líder del equipo."
        />

        <ImgCard2
            title="Tablero de Jira ➡️"
            img1="/src/views/Onboarding/ShowerContent/Src/Tablero.png"
            alt1="Tablero de Jira"
        />

        <LinkCard
            title="Link directo al tablero de Jira"
            :links="[
                {
                    url: 'https://practicas-team.atlassian.net/jira/software/projects/SPT/boards/5',
                    text: 'Link del proyecto',
                    icon: '📝'
                }
            ]"
            color="#2684FF"
        />

        <ListCard
            title="Estados de una tarea en Jira"
            item1="Por hacer"
            item1_img="/src/views/Onboarding/ShowerContent/Src/PorHacer.png"
            item1_img_alt="Por hacer IMG"
            item1_text="Las tareas nuevas o pendientes se colocan en esta columna. Aquí verás todo lo que está asignado para el Sprint pero aún no se ha comenzado. En este punto el desarrollador debe analizar la tarea para que antes de ir al próximo paso se hagan las preguntas necesarias."
            item2="En curso"
            item2_img="/src/views/Onboarding/ShowerContent/Src/EnCurso.png"
            item2_img_alt="En curso IMG"
            item2_text="Cuando empiezas a trabajar en una tarea, la arrastras a esta columna. Así el equipo sabe en qué estás trabajando actualmente."
            item3="Bloqueado"
            item3_img="/src/views/Onboarding/ShowerContent/Src/Bloqueado.png"
            item3_img_alt="Bloqueado IMG"
            item3_text="Si encuentras un impedimento (por ejemplo, dependes de otro equipo o hay un bug crítico), mueve la tarea aquí y deja un comentario explicando el bloqueo si es necesario."
            item4="Testeo"
            item4_img="/src/views/Onboarding/ShowerContent/Src/Testeo.png"
            item4_img_alt="Testeo IMG"
            item4_text="Cuando terminas la tarea, la pasas a testeo y avisas a tu líder para que él mismo revise que todo funcione correctamente. En caso de éxito, tu líder la pasará a Listo. En caso de que no funcione correctamente, el líder la pasará a En curso y el desarrollador deberá volver a trabajar en ella en los errores."
            item5="Listo"
            item5_img="/src/views/Onboarding/ShowerContent/Src/Listo.png"
            item5_img_alt="Listo IMG"
            item5_text="Si la tarea fue aprobada por el líder, él la moverá a 'Listo'. ¡Trabajo terminado!"
        />

        <ImgCard1
            title="Ejemplo de tarjeta de Tarea en Jira"
            img="/src/views/Onboarding/ShowerContent/Src/Tarjeta.png"
            img_alt="Ejemplo de tarjeta Jira"
            text="Si hacemos click en la tarjeta, podemos ver el detalle completo de la tarea, asi como sus secciones como se explica hay una llamada comentarios que es con la que debemos interactuar la mayor parte de las veces, ya que en ésta se debe de colocar como normativa el nombre de la rama en la cual estamos trabajando. ej: feature/SPT-123/nombre-de-la-rama . Como se puede observar parte del nombre de la rama lleva el código de la tarea de Jira."
        />

        <AlertCard
            title="Importante"
            text1="El desarrollador NO debe de modificar la descripción de la tarea, solo debe de agregar en comentarios su rama en la que está trabajando, mas comentarios y/o adjuntar archivos si es necesario."
        />

    </div>
</template>

<script setup>
import AlertCard from '../../Components/AlertCard/AlertCard.vue'
import InfoCard1 from '../../Components/InfoCard1/InfoCard1.vue'
import InfoCard2 from '../../Components/InfoCard2/InfoCard2.vue'
import ImgCard1 from '../../Components/ImgCard1/ImgCard1.vue'
import ImgCard2 from '../../Components/ImgCard2/ImgCard2.vue'
import LinkCard from '../../Components/LinkCard/LinkCard.vue'
import ListCard from '../../Components/ListCard/ListCard.vue'
import Title from '../../Components/Title/Title.vue'
</script>

<style scoped lang="sass">
.scrum-view
    min-height: 100vh
    padding: 0 0 3rem 0


// .tips
//   background: #101c24
//   border-left: 5px solid #00f0ff
//   h2
//     color: #00ff99
//   ul
//     margin-left: 1.5rem
//     li
//       margin-bottom: 0.7rem
//       font-size: 1.1rem
//       .tip-icon
//         margin-right: 0.5rem
//         font-size: 1.3rem

// .section ul
//   list-style: none
//   padding-left: 0
</style>
