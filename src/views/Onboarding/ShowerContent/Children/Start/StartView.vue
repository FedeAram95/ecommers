<template>
    <div class="start-view">
        <Title
            title="Bienvendo/a !!! 👋" 
            image="/src/views/Onboarding/ShowerContent/Src/Televisor.png"
            color="#0082BE" 
        />

        <InfoCard2
            text1="Este Onboarding te guiará en el uso de herramientas y flujos de trabajo del proyecto. Buscamos brindarte una experiencia cercana al ambiente laboral real, apoyándote para que desarrolles tareas de forma independiente. Los desafíos y la ansiedad son normales en este proceso, pero contarás con apoyo constante y además acceso a recursos como Google, IA para tu desarrollo entre otros."
            text2="Si bien no tenemos mucho que ver con la parte Académica, el personal encargado nos solicita informes y entendemos que esta es tu última materia. Por eso, queremos ayudarte a aprobarla mostrándote los puntos clave que debes considerar para lograrlo. 🤔"
            :list="requiredList"
        />

        <ListCard2
            title="Camino del Desarrollador"
            subtitle="A continuación encontrarás un mapa interactivo de tu ruta de aprendizaje. Cada paso es cliqueable y te llevará directamente al módulo correspondiente. Comenzarás con los fundamentos generales y luego, según tu especialidad, seguirás el camino de Frontend o Backend. Este mapa te servirá como guía de referencia durante todo tu proceso de onboarding."
            :commonSteps="firstWay"
            :branches="nextWay"
        />
        
        <InfoCard1
            title="¿Por qué es importante realizar la práctica profesionalizante?"
            emoji="💼"
            text1="Si bien sabemos que esta práctica es un componente esencial de tu formación académica y un paso crucial hacia tu titulación. Según la experiencia de nuestros practicantes anteriores, es en esta etapa donde logran el mayor crecimiento profesional y resultados tangibles."
            text2="Pero más allá de ser un requisito académico, esta experiencia enriquece significativamente tu CV y prepara tu futuro laboral. En el competitivo mercado IT actual, contar con experiencia práctica es fundamental para destacar y acceder a mejores oportunidades laborales."
        />
        
        <AlertCard
            title="¡Una oportunidad de crecimiento profesional! 🚀"
            text1="Este espacio funciona como un semillero de talentos para nuestra empresa. Basándonos en tu desempeño durante la práctica, evaluaremos la posibilidad de integrarte a nuestro equipo. En cualquier caso, esta experiencia será valiosa para tu desarrollo profesional y te ayudará a destacar en el mercado IT."
        />

        <ImgCard2
            title="Y ahora te contamos un poquito de nosotros !! 🙂"
            img1="/src/views/Onboarding/ShowerContent/Src/SocialLearning.png"
            alt1="Social Learning"
        />
        
        <ListCard
            text="Social Learning es una red de instituciones educativas que, desde 2017, promueve el acceso a la educación superior en América Latina. Actualmente, conectamos a IPP (Chile), Teclab (Argentina) y Onmex (México) a través de modelos educativos digitales innovadores, accesibles y alineados con las necesidades del mercado laboral. ¡Y si estás aquí, es muy probable que hayas sido parte de esta gran comunidad! 😉"
            item1_img="/src/views/Onboarding/ShowerContent/Src/Ipp.png"
            item1_img_alt="Social Learning"
            item2_img="/src/views/Onboarding/ShowerContent/Src/Teclab.png"
            item2_img_alt="Social Learning"
            item3_img="/src/views/Onboarding/ShowerContent/Src/Onmex.png"
            item3_img_alt="Social Learning"
        />
        
        <InfoCard3
            text1="¡Es momento de comenzar esta emocionante etapa! Agradecemos tu participación en este proceso de aprendizaje. Este programa es autodidacta, lo que significa que tu compromiso y dedicación serán fundamentales para tu éxito. En el menú lateral encontrarás los módulos específicos que debes seguir, cuidadosamente alineados con tu ruta de aprendizaje personalizada. 😊"
            emoji="⬅️"
        />

        <ImgCard2
            title="¡Comencemos tu viaje de aprendizaje! 🚀"
            img1="/src/views/Onboarding/ShowerContent/Src/Exito.png"
            alt1="Exito"
        />
        

    </div>
</template>

<script setup>
import Title from "@/views/Onboarding/ShowerContent/Components/Title/Title.vue";
import InfoCard1 from "@/views/Onboarding/ShowerContent/Components/InfoCard1/InfoCard1.vue";
import InfoCard2 from "@/views/Onboarding/ShowerContent/Components/InfoCard2/InfoCard2.vue";
import InfoCard3 from "@/views/Onboarding/ShowerContent/Components/InfoCard3/InfoCard3.vue";
import ListCard2 from "@/views/Onboarding/ShowerContent/Components/ListCard2/ListCard2.vue";
import AlertCard from "@/views/Onboarding/ShowerContent/Components/AlertCard/AlertCard.vue";
import ImgCard2 from "@/views/Onboarding/ShowerContent/Components/ImgCard2/ImgCard2.vue";
import ListCard from "@/views/Onboarding/ShowerContent/Components/ListCard/ListCard.vue";
const firstWay = [
    { title: 'Inicio', description: 'Estás aquí 🤗' },
    { title: 'Arquitectura del Proyecto', description: 'Aquí encontrarás la arquitectura del proyecto y cómo interactúan las diferentes capas y tecnologías.' },
    { title: 'Scrum - Jira', description: 'Comprenderás el flujo de trabajo de Scrum y cómo se gestiona con Jira.' },
    { title: 'Git', description: 'Aprenderás el control de versiones con Git, desde GitHub hasta SourceTree. (Recomendamos prestar especial atención a este módulo)' }
]

const nextWay = [
    { title: 'Frontend', steps: [
        { title: 'Node', description: 'Veremos conceptos básicos de Node: qué es, para qué sirve, cómo se utiliza y su instalación.' },
        { title: 'IDE - Frontend', description: 'Conocerás qué es un IDE, sus opciones y cómo utilizarlo para el desarrollo de nuestro proyecto Frontend.' },
        { title: 'Inicio con Vue', description: 'Aprenderás a abrir el proyecto en tu IDE y cómo ejecutarlo para visualizarlo en el navegador.' },
        { title: 'Estructura Frontend', description: 'Te presentaremos la estructura del proyecto, que define el marco de trabajo para la organización de carpetas y archivos.' }
    ]},
    { title: 'Backend', steps: [
        { title: 'Java', description: 'Veremos conceptos básicos de Java: qué es, para qué sirve, cómo se utiliza y su instalación.' },
        { title: 'IDE - Backend', description: 'Conocerás qué es un IDE, sus opciones y cómo utilizarlo para el desarrollo de nuestro proyecto Backend.' },
        { title: 'Inicio con Spring', description: 'Aprenderás a abrir el proyecto en tu IDE y cómo ejecutarlo para visualizarlo en el navegador.' },
        { title: 'Estructura Backend', description: 'Te presentaremos la estructura del proyecto, que define el marco de trabajo para la organización de carpetas y archivos.' },
        { title: 'Base de Datos', description: 'Aprenderás a instalar y configurar el gestor de base de datos, así como su integración con nuestro proyecto Spring.' }
    ]}
]

const requiredList = [
                'Ser compañero de equipo y colaborativo',
                'Mantener una comunicación clara y efectiva',
                'Desarrollar habilidades de autoaprendizaje',
                'Asistir puntualmente a las Daily',
                'Cumplir con los objetivos y deadlines establecidos',
                'Cumplir con tus AE (Auto Evaluaciones) en tu CANVAS'
            ]
</script>

<style scoped lang="scss">
.start-view {
    min-height: 100vh;
    font-family: 'Segoe UI', Arial, sans-serif;
    padding: 0 0 3rem 0;
}
</style>