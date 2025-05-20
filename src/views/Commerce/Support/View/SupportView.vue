<template> 
  <div class="support-container">
    <HeaderView />
    <SidebarView />

    <div class="content">
      <div class="title-box">
        <h2>
          <span>Dejanos tu consulta 💬</span>
        </h2>
      </div>

      <div class="support-box">
        <v-form @submit.prevent="handleSupport">
          <div class="form-group">
            <label for="name">Nombre completo</label>
            <input
              type="text"
              id="name"
              v-model="name"
              placeholder="Ingresá tu nombre"
              @input="v$.name.$touch()"
              @blur="v$.name.$touch()"
              required
            />
            <span v-if="v$.name.$error" class="error-message">
              El nombre solo puede contener letras.
            </span>
          </div>

          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="ejemplo@correo.com"
              @input="v$.email.$touch()"
              @blur="v$.email.$touch()"
              required
            />
            <span v-if="v$.email.$error" class="error-message">
              Ingrese un correo válido.
            </span>
          </div>

          <div class="form-group">
            <label for="subject">Asunto</label>
            <input
              type="text"
              id="subject"
              v-model="subject"
              placeholder="¿Sobre qué necesitas ayuda?"
              @input="v$.subject.$touch()"
              @blur="v$.subject.$touch()"
              required
            />
            <span v-if="v$.subject.$error" class="error-message">
              El asunto debe tener al menos 10 caracteres.
            </span>
          </div>

          <div class="form-group">
            <label for="message">Mensaje</label>
            <textarea
              id="message"
              v-model="message"
              rows="4"
              placeholder="Contanos tu problema o consulta..."
              @input="v$.message.$touch()"
              @blur="v$.message.$touch()"
              required
            ></textarea>
            <span v-if="v$.message.$error" class="error-message">
              El mensaje debe tener al menos 20 caracteres.
            </span>
          </div>

          <button
            type="submit"
            class="submit-button"
            :class="{ success: formSent }"
          >
            {{ formSent ? "Enviado" : "Enviar solicitud" }}
          </button>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { required, minLength, email as emailRule } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import HeaderView from "@/views/Commerce/ComponentsCommerce/Header/View/HeaderView.vue";
import SidebarView from "@/views/Commerce/ComponentsCommerce/Sidebar/View/SidebarView.vue";

const alphaSpaces = (value) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(value);

export default {
  name: "SupportView",
  components: {
    HeaderView,
    SidebarView,
  },
  setup() {
    const name = ref("");
    const email = ref("");
    const subject = ref("");
    const message = ref("");
    const formSent = ref(false);

    const rules = {
      name: { required, alphaSpaces },
      email: { required, email: emailRule },
      subject: { required, minLength: minLength(10) },
      message: { required, minLength: minLength(20) },
    };

    const v$ = useVuelidate(rules, { name, email, subject, message });

    const handleSupport = async () => {
      const isValid = await v$.value.$validate();
      if (!isValid) return;


      formSent.value = true;

      name.value = "";
      email.value = "";
      subject.value = "";
      message.value = "";
      v$.value.$reset();

      setTimeout(() => {
        formSent.value = false;
      }, 3000);
    };

    return {
      name,
      email,
      subject,
      message,
      formSent,
      v$,
      handleSupport,
    };
  },
};
</script>

<style>
.support-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding-top: 12rem;
  width: 100%;
  max-width: 32rem;
}

.title-box {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.title-box h2 {
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #ff8d3f;
  padding: 1rem;
  text-align: center;
  width: 100%;
  color: white;
}

.support-box {
  width: 100%;
  background: white;
  padding: 2rem;
  border: 1px solid #b3b3b3;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 1.125rem;
  font-weight: 500;
  color: #4a4a4a;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #ccc;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  color: #333;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #888;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submit-button {
  width: 100%;
  background-color: #ff8d3f;
  padding: 0.5rem;
  color: white;
  transition: background-color 0.3s;
  border: none;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #e67e22;
}

.submit-button.success {
  background-color: #09bb59;
}

.submit-button.success:hover {
  background-color: #09bb59;
}
</style>
