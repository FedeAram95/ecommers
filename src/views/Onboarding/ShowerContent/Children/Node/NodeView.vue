<template>
    <div class="node-view">
        <Title
            title="Instalando Node.js - NPM"
            color="#83CD28"
            img_alt="Node"
            image="/src/views/Onboarding/ShowerContent/Src/Node.png"
        />

        <InfoCard1
            title="¿Qué es Node.js y por qué lo necesitamos?"
            emoji="🤔"
            text1="Node.js es un entorno de ejecución para JavaScript que nos permite ejecutar código JavaScript fuera del navegador. En nuestro proyecto utilizamos Vue 3 con Vite como bundler, Node.js es fundamental porque nos permite crear una arquitectura sólida y eficiente para nuestra aplicación."
            text2="⚡ Permite ejecutar scripts de desarrollo, compilar nuestro código y servir la aplicación en modo desarrollo, facilitando el proceso de desarrollo y testing de nuestra aplicación."
        />

        <ListCard
            text="Vamos a instalar Node.js 18 en tu computadora para que puedas empezar a desarrollar. 💻 ( Te dejamos los links mas abajo)"
        />

        <AlertCard
            title="¡Importante!"
            text1="Asegúrate de instalar Node.js 18, ya que versiones anteriores y/o posteriores pueden causar problemas de compatibilidad con Vue 3 y sus herramientas de desarrollo."
        />
        
        <InfoCard2
            title="Pasos para la instalación"
            text1="1. Descarga e instala Node.js 18 LTS desde el sitio oficial ( Te dejamos los links más abajo )"
            text2="2. Abre la terminal ( cmd ) y ejecuta los siguientes comandos:"
            text3="3. Verifica la instalación desde la terminal ( cmd ) con los comandos: node -v y npm -v"
        />
        
        
        <LinkCard
            title="Descargas disponibles"
            :links="[
                {
                    url: 'https://nodejs.org/dist/v18.19.1/node-v18.19.1-x64.msi',
                    text: 'Descargar Node.js 18 LTS para Windows',
                    icon: '📥'
                },
                {
                    url: 'https://nodejs.org/dist/v18.19.1/node-v18.19.1.pkg',
                    text: 'Descargar Node.js 18 LTS para MacOS',
                    icon: '📥'
                }
            ]"
            color="#76B95C"
        />
            
        <ImgCard2
            title="Verificación de la instalación con el cmd."
            img1="/src/views/Onboarding/ShowerContent/Src/CmdNode.png"
            alt1="Node Installation"
        />
            
        <InfoCard2
            text1="Esto que instalamos nos proporciona npm (Node Package Manager), que es esencial para instalar y gestionar las dependencias de nuestro proyecto, como Vue 3, Vuetify, Router y otras librerías que necesitamos para el desarrollo. Cosa que veremos en otro Capitulo pero necesitamos tenerlo instalado.."
        />
    </div>
</template>

<script setup>
import InfoCard1 from '../../Components/InfoCard1/InfoCard1.vue'
import Title from '../../Components/Title/Title.vue'
import InfoCard2 from '../../Components/InfoCard2/InfoCard2.vue'
import ListCard from '../../Components/ListCard/ListCard.vue'
import AlertCard from '../../Components/AlertCard/AlertCard.vue'
import ImgCard2 from '../../Components/ImgCard2/ImgCard2.vue'
import LinkCard from '../../Components/LinkCard/LinkCard.vue'
</script>

<style scoped lang="scss">
.node-view {
    padding: 2rem;
}
</style>