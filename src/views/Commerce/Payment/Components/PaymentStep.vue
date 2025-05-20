<template>
  <v-card class="payment-step">
    <v-card-title class="step-header">
      <div class="header-content">
        <v-btn
          v-if="currentStep === 0"
          variant="text"
          color="grey"
          class="back-button"
          @click="$emit('goBack')"
        >
          ← Volver
        </v-btn>
        <h2 class="step-title">{{ title }}</h2>
      </div>
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="handleSubmit" class="step-form">
        <v-row class="form-row">
          <v-col
            v-for="(field, index) in fields"
            :key="index"
            cols="12"
            :md="field.type === 'textarea' || field.name === 'telefono' ? 12 : 6"
            class="form-field"
          >
            <v-text-field
              v-if="field.type === 'text' || field.type === 'email' || field.type === 'number'"
              v-model="formData[field.name]"
              :label="field.label"
              :type="field.type"
              :placeholder="field.placeholder"
              :pattern="field.pattern"
              :min="field.min"
              :max="field.max"
              :maxlength="field.maxlength"
              :rules="[field.required ? v => !!v || 'Campo requerido' : true]"
              variant="outlined"
              density="comfortable"
              class="form-input"
            />

            <v-select
              v-if="field.type === 'select'"
              v-model="formData[field.name]"
              :label="field.label"
              :items="field.options"
              variant="outlined"
              density="comfortable"
              class="form-input"
            >
              <template v-slot:prepend-item>
                <v-list-item title="Selecciona una opción" disabled />
              </template>
            </v-select>

            <v-textarea
              v-if="field.type === 'textarea'"
              v-model="formData[field.name]"
              :label="field.label"
              :placeholder="field.placeholder"
              :rules="[field.required ? v => !!v || 'Campo requerido' : true]"
              variant="outlined"
              density="comfortable"
              auto-grow
              class="form-input"
            />
          </v-col>
        </v-row>

        <v-card-actions class="step-actions">
          <v-btn
            v-if="prevStep"
            color="primary"
            variant="elevated"
            :loading="isLoadingPrev"
            @click="handlePrevStep"
            class="action-button"
          >
            <template v-slot:loader>
              <v-progress-circular indeterminate />
            </template>
            Volver
          </v-btn>

          <v-btn
            type="submit"
            color="primary"
            variant="elevated"
            :loading="isLoading"
            class="action-button"
          >
            <template v-slot:loader>
              <v-progress-circular indeterminate />
            </template>
            {{ currentStep === totalSteps - 1 ? "Pagar" : "Siguiente" }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  fields: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  initialData: {
    type: Object,
    default: () => ({})
  },
  onSubmit: {
    type: Function,
    required: true
  },
  prevStep: {
    type: Function,
    default: null
  },
  currentStep: {
    type: Number,
    required: true
  },
  totalSteps: {
    type: Number,
    required: true
  }
});

const formData = ref({ ...props.initialData });
const isLoading = ref(false);
const isLoadingPrev = ref(false);

watch(() => props.initialData, (newData) => {
  formData.value = { ...newData };
}, { immediate: true });

const handleSubmit = async () => {
  if (isLoading.value) return;

  isLoading.value = true;

  try {
    const isValid = props.fields.every(
      (field) => !field.required || formData.value[field.name]
    );

    if (isValid) {
      props.onSubmit(formData.value);
    } else {
      alert('Por favor completa los campos requeridos.');
    }
  } finally {
    isLoading.value = false;
  }
};

const handlePrevStep = async () => {
  if (isLoadingPrev.value) return;

  isLoadingPrev.value = true;

  try {
    if (props.prevStep) {
      props.prevStep();
    }
  } finally {
    isLoadingPrev.value = false;
  }
};
</script>

<style scoped>
.payment-step {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.step-header {
  position: relative;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
}

.back-button {
  position: absolute;
  left: 0;
  color: #4b5563;
  font-weight: 600;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: #9ca3af;
}

.step-title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.step-form {
  padding: 24px;
}

.form-row {
  margin: 0;
}

.form-field {
  padding: 8px 16px;
}

.form-input {
  width: 100%;
}

.step-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  margin-top: 16px;
}

.action-button {
  min-width: 200px;
  height: 48px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: normal;
}

@media (max-width: 600px) {
  .payment-step {
    border-radius: 0;
  }

  .step-header {
    padding: 16px;
  }

  .step-form {
    padding: 16px;
  }

  .form-field {
    padding: 4px 8px;
  }

  .step-actions {
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }

  .action-button {
    width: 100%;
    min-width: unset;
  }
}
</style>
  
  