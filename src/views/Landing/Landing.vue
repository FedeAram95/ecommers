<template>
  <div class="landing-container" :style="{ backgroundImage: `url(${landingBackgroundImg})` }">
    <LoaderView v-if="isLoading"/>
    <transition
      appear
      enter-active-class="animate__animated animate__fadeIn animate__slow"
    >
      <div v-show="!isLoading" class="social-learning">
        <img :src="socialLearningImg" alt="Social Learning" />
      </div>
    </transition>
    <div v-show="!isLoading" class="options-container">
      <div class="option" @click="goTo('onboarding')">
        <img :src="onboardingImg" class="logo-button" />
        <span>Onboarding</span>
      </div>
      <div class="option" @click="goTo('ecommerce')">
        <img :src="ecommerceImg" class="logo-button" />
        <span>Ecommerce</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LoaderView from '@/generalComponents/Loader/LoaderView.vue'
import socialLearningImg from '@/assets/SocialLearning.jpg'
import onboardingImg from '@/assets/Onboarding.png'
import ecommerceImg from '@/assets/Ecommerce.png'
import landingBackgroundImg from '@/assets/LandingBackground.png'

const router = useRouter()
const isLoading = ref(true)

function goTo(destination) {
  if (destination === 'onboarding') {
    router.push('/onboarding')
  } else {
    router.push('/home')
  }
}

onMounted(async () => {
    try {
        const images = [
            socialLearningImg,
            onboardingImg,
            ecommerceImg,
            landingBackgroundImg
        ]

        await Promise.all(
            images.map(src => {
                return new Promise((resolve, reject) => {
                    const img = new Image()
                    img.onload = resolve
                    img.onerror = () => {
                        console.warn(`Error al cargar la imagen: ${src}`)
                        resolve()
                    }
                    img.src = src
                })
            })
        )
    } catch (error) {
        console.error('Error en la carga de imágenes:', error)
    } finally {
        isLoading.value = false
    }
})
</script>

<style lang="scss" scoped>
$primary-color: #2c3e50;
$shadow-color: rgba(0, 0, 0, 0.1);
$white: white;
$border-radius: 1.5rem;
$transition-duration: 0.3s;

.landing-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-repeat: repeat;
  background-size: auto;
  background-position: center;
  padding: 2rem;
  gap: 2rem;

  .social-learning {
    width: 50%;
    max-width: 800px;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;

    img {
      border-radius: 15px;
      width: 100%;
      height: auto;
      object-fit: contain;
      box-shadow: 0 4px 6px $shadow-color;
    }
  }

  .options-container {
    display: flex;
    gap: 2rem;
    width: 80%;
    max-width: 800px;
    justify-content: center;

    .option {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform $transition-duration;
      padding: 2rem;
      background-color: $white;
      border-radius: $border-radius;
      box-shadow: 0 4px 6px $shadow-color;

      &:hover {
        transform: scale(1.05);
      }

      .logo-button {
        width: 64px;
        height: 64px;
        margin-bottom: 1rem;
      }

      span {
        font-size: 1.2rem;
        font-weight: 500;
        color: $primary-color;
      }
    }
  }
}

@media (max-width: 768px) {
  .landing-container {
    padding: 1rem;

    .social-learning {
      width: 95%;
    }

    .options-container {
      width: 95%;
      flex-direction: column;

      .option {
        width: 100%;
      }
    }
  }
}

.animate__animated {
  animation-duration: 3s;
  animation-fill-mode: both;
}

.animate__fadeIn {
  animation-name: fadeIn;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>