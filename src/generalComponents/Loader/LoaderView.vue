<template>
  <div class="loader-container">
    <div class="text-wrapper">
      <div class="social"><span class="special-s">S</span>OCIAL</div>
      <div class="learning">LEARNING</div>
    </div>
  </div>
</template>

<style scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f5f9;
  z-index: 9999;
}

.text-wrapper {
  position: absolute;
  padding: 17px 450px 10px 450px;
  background: linear-gradient(135deg, #242424 45%, #2968C8 70%);
  mask-image: linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%);
  box-shadow: 10px 3px 550px black;
}

.social, .learning {
  color: white;
}

.social {
  font-size: 1.3rem;
  letter-spacing: 13px;
  animation: socialAnimation 3s infinite;
  font-weight: 900;
  margin-bottom: -10px;
}

.learning {
  font-size: 1rem;
  letter-spacing: 6px;
  animation: learningAnimation 3s infinite;
  margin-left: 40px;
}

.social::before, .learning::before {
  content: '';
  position: absolute;
  width: 70%;
  height: 90%;
  background: linear-gradient(30deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: skewX(-50deg);
  animation: shimmer 1.5s infinite;
}

@keyframes socialAnimation {
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}

@keyframes learningAnimation {
  0% { transform: translateY(0); }
  50% { transform: translateY(5px); }
  100% { transform: translateY(0); }
}

@keyframes shimmer {
  0% { left: -150%; }
  100% { left: 150%; }
}

.social::after {
  display: none;
}

.special-s {
  position: relative;
  display: inline-block;
}

.special-s::before,
.special-s::after {
  content: '•';
  position: absolute;
  color: white;
}

.special-s::before {
  font-size: 1.6rem;
  top: -20px;
  right: -4px;
}

.special-s::after {
  font-size: 1.1rem;
  bottom: -13px;
  left: 0px;
}
</style>