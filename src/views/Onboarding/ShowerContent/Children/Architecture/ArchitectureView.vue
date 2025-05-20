<template>
    <div class="architecture-view">

        <Title
            title="Arquitectura del Proyecto"
            color="#FF8F6B"
            under
            img_alt="Arquitectura del proyecto"
            image="/src/views/Onboarding/ShowerContent/Src/Architecture.png"
        />

        <ListCard2
            subtitle="Nuestro proyecto sigue una arquitectura moderna y escalable, dividida en capas bien definidas que permiten una clara separación de responsabilidades y un mantenimiento eficiente.La arquitectura está diseñada para ser robusta, segura y fácil de mantener, siguiendo las mejores prácticas de desarrollo."
            :commonSteps="architecture"
            :hasBranches=false
        />

        <ListCard
            title="Frontend (Vue.js)"
            item1="Vue 3"
            item1_img="/src/views/Onboarding/ShowerContent/Src/Vue.png"
            item1_img_alt="Vue.js Logo"
            item1_text="Framework principal con Composition API para una mejor organización del código y reutilización de lógica."
            item2="Vuetify"
            item2_img="/src/views/Onboarding/ShowerContent/Src/Vuetify.png"
            item2_img_alt="Vuetify Logo"
            item2_text="Biblioteca de componentes UI que proporciona una interfaz moderna y responsive."
            item3="Vue Router"
            item3_img="/src/views/Onboarding/ShowerContent/Src/Router.png"
            item3_img_alt="Vue Router Logo"
            item3_text="Gestión de rutas y navegación en la aplicación."
            item4="Vuex/Pinia"
            item4_img="/src/views/Onboarding/ShowerContent/Src/Store.png"
            item4_img_alt="Vuex Logo"
            item4_text="Gestión del estado global de la aplicación."
            item5="Componentes"
            item5_img="/src/views/Onboarding/ShowerContent/Src/Components.png"
            item5_img_alt="Components"
            item5_text="Sistema de componentes reutilizables para mantener la consistencia en la UI."
        />

        <ListCard
            title="Backend (Spring Boot)"
            item1="Spring Boot"
            item1_img="/src/views/Onboarding/ShowerContent/Src/Spring.png"
            item1_img_alt="Spring Boot Logo"
            item1_text="Framework principal para el desarrollo del backend con Java."
            item2="Controllers"
            item2_img="/src/views/Onboarding/ShowerContent/Src/Controller.png"
            item2_img_alt="Controllers"
            item2_text="Endpoints REST para la comunicación con el frontend."
            item3="Services"
            item3_img="/src/views/Onboarding/ShowerContent/Src/Service.png"
            item3_img_alt="Services"
            item3_text="Capa de lógica de negocio y procesamiento de datos."
            item4="Repositories"
            item4_img="/src/views/Onboarding/ShowerContent/Src/Repository.png"
            item4_img_alt="Repositories"
            item4_text="Acceso y gestión de datos con la base de datos."
            item5="Models"
            item5_img="/src/views/Onboarding/ShowerContent/Src/Model.png"
            item5_img_alt="Models"
            item5_text="Entidades y DTOs para la representación de datos."
        />

        <ListCard
            title="Base de Datos"
            item1="PostgreSQL"
            item1_img="/src/views/Onboarding/ShowerContent/Src/Postgres.png"
            item1_img_alt="PostgreSQL Logo"
            item1_text="Sistema de gestión de base de datos relacional robusto y escalable."
            item2="DBeaver"
            item2_img="/src/views/Onboarding/ShowerContent/Src/DBeaver.png"
            item2_img_alt="DBeaver Logo"
            item2_text="Herramienta de gestión y administración de la base de datos."
            item3="Migraciones"
            item3_img="/src/views/Onboarding/ShowerContent/Src/Migration.png"
            item3_img_alt="Migrations"
            item3_text="Sistema de control de versiones para la base de datos."
            item4="Optimización"
            item4_img="/src/views/Onboarding/ShowerContent/Src/Optimization.png"
            item4_img_alt="Optimization"
            item4_text="Índices y consultas optimizadas para mejor rendimiento."
            item5="Backup"
            item5_img="/src/views/Onboarding/ShowerContent/Src/Backup.png"
            item5_img_alt="Backup"
            item5_text="Sistema de respaldo y recuperación de datos."
        />

        <AlertCard
            title="Herramientas de Desarrollo"
            text1="Utilizamos Git/GitHub para control de versiones, Jira para gestión de proyectos, y herramientas específicas para cada capa: VS Code/WebStorm para frontend, IntelliJ IDEA para backend, y DBeaver para base de datos."
        />

        <LinkCard
            title="Recursos y Documentación"
            :links="[
                {
                    url: 'https://vuejs.org/',
                    text: 'Documentación Vue.js',
                    icon: '📚'
                },
                {
                    url: 'https://spring.io/projects/spring-boot',
                    text: 'Documentación Spring Boot',
                    icon: '📚'
                },
            ]"
            color="#FF8F6B"
        />
    </div>
</template>

<script setup>
import Title from '../../Components/Title/Title.vue'
import InfoCard1 from '../../Components/InfoCard1/InfoCard1.vue'
import ListCard from '../../Components/ListCard/ListCard.vue'
import AlertCard from '../../Components/AlertCard/AlertCard.vue'
import LinkCard from '../../Components/LinkCard/LinkCard.vue'
import ListCard2 from '../../Components/ListCard2/ListCard2.vue'

const architecture = [
    {
        title: 'Frontend',
        description: 'Nuestro proyecto sigue una arquitectura moderna y escalable, dividida en capas bien definidas que permiten una clara separación de responsabilidades y un mantenimiento eficiente.',
        image: '/src/views/Onboarding/ShowerContent/Src/Architecture.png',
        image_alt: 'Arquitectura del proyecto',
    },
    {
        title: 'Backend',
        description: 'Framework principal con Composition API para una mejor organización del código y reutilización de lógica.',
        image: '/src/views/Onboarding/ShowerContent/Src/Vue.png',
        image_alt: 'Vue.js Logo',
    },
    {
        title: 'Base de Datos',
        description: 'Sistema de gestión de base de datos relacional robusto y escalable.',
        image: '/src/views/Onboarding/ShowerContent/Src/Postgres.png',
        image_alt: 'PostgreSQL Logo',
    },
    {
        title: 'Herramientas de Desarrollo',
        description: 'Utilizamos Git/GitHub para control de versiones, Jira para gestión de proyectos, y herramientas específicas para cada capa: VS Code/WebStorm para frontend, IntelliJ IDEA para backend, y DBeaver para base de datos.',
        image: '/src/views/Onboarding/ShowerContent/Src/Architecture.png',
        image_alt: 'Arquitectura del proyecto',
    }
]
</script>

<style scoped lang="sass">
.architecture-view
    min-height: 100vh
    padding: 0 0 3rem 0
</style>