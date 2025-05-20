<template>
  <div class="carousel-container">
    <v-carousel
      v-model="current"
      cycle
      interval="4000"
      height="300"
      show-arrows="hover"
      hide-delimiters
      class="carousel"
    >
      <v-carousel-item
        v-for="(member, index) in shuffledTeamMembers"
        :key="index"
        :value="index"
        cover
      >
        <v-img
          :src="member.png"
          contain
        />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ad1 from "@/assets/ad1.jpg";
import ad2 from "@/assets/ad2.jpg";
import ad3 from "@/assets/ad3.jpg";
import ad4 from "@/assets/ad4.jpg";

const current = ref(0);

const teamMembers = [
  { png: ad1 },
  { png: ad2 },
  { png: ad3 },
  { png: ad4 },
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const shuffledTeamMembers = ref(shuffleArray(teamMembers));
</script>

<style scoped>
.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1300px;
  overflow: hidden;
  position: relative;
  margin: 142px auto 0;
  z-index: 10;
}

.carousel {
  width: 100%;
  border-radius: 8px;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
