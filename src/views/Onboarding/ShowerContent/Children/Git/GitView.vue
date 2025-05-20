<template>
    <div class="git-view">
        <Title
            title="Git - Git Hub"
            under
            img_alt="Git"
            image="/src/views/Onboarding/ShowerContent/Src/Github.png"
        />

        <InfoCard3
            emoji="📦"
            text1="Git es un sistema de control de versiones distribuido que permite a los desarrolladores rastrear cambios en el código fuente durante el desarrollo de software. En un caso de uso, es esencial para el trabajo en equipo, ya que permite a los desarrolladores crear un ambiente local de trabajo y no poner en riesgo el código original."
            text2="En nuestro proyecto, utilizamos Git como manejador de versiones junto con GitHub para almacenar nuestro código, y SourceTree como interfaz gráfica para facilitar el uso de los comandos del propio Git. Tranquilo ya que iremos viendo cada cosa poco a poco. "
        />

        <InfoCard2
            emoji="🔧"
            text1="Para comenzar a trabajar en el proyecto, necesitarás clonar los repositorios. Tenemos dos repositorios principales: uno para el backend y otro para el frontend. Es importante mantener ambos actualizados y trabajar en ramas separadas para cada funcionalidad."
            text2="Los repositorios del proyecto son:"
        />

        <ListCard
            title="Repositorios del Proyecto"
            item1="Backend"
            item1_text="Repositorio del servidor y la API"
            item1_img="/src/views/Onboarding/ShowerContent/Src/Backend.png"
            item1_img_alt="Backend Repository"
            item2="Frontend"
            item2_text="Repositorio de la interfaz de usuario"
            item2_img="/src/views/Onboarding/ShowerContent/Src/Frontend.png"
            item2_img_alt="Frontend Repository"
        />

        <LinkCard
            title="Links a los Repositorios"
            :links="[
                {
                    url: 'https://github.com/PracticaProfesionalizante/back_commerce',
                    text: 'Repositorio Backend',
                    icon: '⚙️'
                },
                {
                    url: 'https://github.com/PracticaProfesionalizante/front_commerce',
                    text: 'Repositorio Frontend',
                    icon: '🎨'
                }
            ]"
            color="#F05032"
        />

        <InfoCard1 
            title="Clonar Repositorios con SourceTree"
            emoji="📥"
            text1="Para clonar un repositorio usando SourceTree, sigue estos pasos:"
            text2="1. Abre SourceTree y haz clic en 'Clonar' 2. Pega la URL del repositorio 3. Selecciona la carpeta donde quieres guardarlo 4. Haz clic en 'Clonar'"
        />

        <ImgCard1
            title="Interfaz de SourceTree"
            img="/src/views/Onboarding/ShowerContent/Src/SourceTree.png"
            img_alt="SourceTree Interface"
            text="La interfaz de SourceTree muestra el historial de commits, las ramas y los cambios pendientes de forma visual y fácil de entender."
        />

        <InfoCard2
            emoji="🌿"
            text1="Las ramas son esenciales para el desarrollo. La rama principal es 'main' o 'master', y de ella se crean ramas para nuevas funcionalidades. Para crear una nueva rama en SourceTree:"
            text2="1. Haz clic derecho en la rama base 2. Selecciona 'Crear rama' 3. Dale un nombre descriptivo 4. Haz clic en 'Crear rama'"
        />

        <ListCard
            title="Flujo de Trabajo con Ramas"
            item1="Crear Rama"
            item1_text="Crea una nueva rama para cada funcionalidad"
            item1_img="/src/views/Onboarding/ShowerContent/Src/CreateBranch.png"
            item1_img_alt="Create Branch"
            item2="Desarrollar"
            item2_text="Realiza tus cambios en la rama"
            item2_img="/src/views/Onboarding/ShowerContent/Src/Develop.png"
            item2_img_alt="Develop"
            item3="Commit"
            item3_text="Guarda tus cambios con mensajes descriptivos"
            item3_img="/src/views/Onboarding/ShowerContent/Src/Commit.png"
            item3_img_alt="Commit"
            item4="Push"
            item4_text="Sube tus cambios al repositorio remoto"
            item4_img="/src/views/Onboarding/ShowerContent/Src/Push.png"
            item4_img_alt="Push"
            item5="Pull Request"
            item5_text="Solicita integrar tus cambios a la rama principal"
            item5_img="/src/views/Onboarding/ShowerContent/Src/PR.png"
            item5_img_alt="Pull Request"
        />

        <AlertCard
            title="Buenas Prácticas"
            text1="1. Siempre crea una rama nueva para cada funcionalidad 2. Mantén tus commits pequeños y descriptivos 3. Actualiza tu rama con la principal regularmente 4. Resuelve conflictos antes de hacer merge 5. Revisa tus cambios antes de hacer push"
        />

        <InfoCard3
            emoji="💡"
            text1="Recuerda que Git es una herramienta poderosa que requiere práctica. No te preocupes si al principio cometes errores, es parte del aprendizaje. Lo importante es mantener una buena comunicación con el equipo y seguir las buenas prácticas establecidas."
        />
    </div>
</template>

<script setup>
import Title from '../../Components/Title/Title.vue'
import InfoCard1 from '../../Components/InfoCard1/InfoCard1.vue'
import InfoCard2 from '../../Components/InfoCard2/InfoCard2.vue'
import InfoCard3 from '../../Components/InfoCard3/InfoCard3.vue'
import LinkCard from '../../Components/LinkCard/LinkCard.vue'
import ImgCard1 from '../../Components/ImgCard1/ImgCard1.vue'
import ListCard from '../../Components/ListCard/ListCard.vue'
import AlertCard from '../../Components/AlertCard/AlertCard.vue'
</script>

<style scoped lang="scss">
.git-view {
    min-height: 100vh;
    padding: 0 0 3rem 0;
}
</style> 