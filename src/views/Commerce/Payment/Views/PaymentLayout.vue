<template>
  <HeaderView />
  <div class="payment-container">
    <div class="payment-content">
      <h2 v-if="currentStepIndex === 0" class="payment-title">¿Quien esta por Comprar?</h2>

      <PaymentStep
        v-if="currentStepIndex === 0"
        :title="'Información de contacto'"
        :fields="step1Fields"
        :initialData="stepData.contactInfo"
        :currentStep="currentStepIndex"
        :totalSteps="3"
        @Submit="handleNextStep"
        @goBack="goToCart"
      />
      <PaymentStep
        v-if="currentStepIndex === 1"
        :title="'Dirección de envío'"
        :fields="step2Fields"
        :initialData="stepData.shippingInfo"
        :currentStep="currentStepIndex"
        :totalSteps="3"
        @Submit="handleNextStep"
        :prevStep="handlePrevStep"
      />
      <PaymentStep
        v-if="currentStepIndex === 2"
        :title="'Método de pago'"
        :fields="step3Fields"
        :initialData="stepData.paymentInfo"
        :currentStep="currentStepIndex"
        :totalSteps="3"
        @Submit="pay"
        :prevStep="handlePrevStep"
      />
      <SuccessMessage v-if="isSuccess" :isSuccess="isSuccess" />
    </div>

    <div class="payment-summary">
      <PaymentSummary :cart="cart" :totalAmount="totalAmount" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import PaymentSummary from "../Components/PaymentSummary.vue";
import HeaderView from "../Components/HeaderView.vue";
import PaymentStep from "../Components/PaymentStep.vue";
import SuccessMessage from "@/generalComponents/AlertMessage/SuccessMessage.vue";

const router = useRouter();
const currentStepIndex = ref(0);

const stepData = ref({
  contactInfo: {},
  shippingInfo: {},
  paymentInfo: {},
});

const isSuccess = ref(false);

const step1Fields = [
  { name: "email", label: "Email", type: "email", placeholder: "Ej.juan311@gmail.com", required: true },
  { name: "nombre", label: "Nombre", type: "text", placeholder: "Ej.Juan", required: true, maxlength: 50 },
  { name: "apellido", label: "Apellido", type: "text", placeholder: "Ej.Perez", required: true, maxlength: 50 },
  { name: "dni", label: "DNI", type: "number", placeholder: "Ej.458466682", required: true, min: 1000000, max: 99999999 },
  { name: "telefono", label: "Teléfono", type: "number", placeholder: "Ej.3438-138471", required: true, pattern: "\\d{7,15}" },
];

const step2Fields = [
  { name: "pais", label: "País", type: "text", placeholder: "Ej.Argentina", required: true, maxlength: 50 },
  { name: "provincia", label: "Provincia", type: "text", placeholder: "Ej.Chaco", required: true, maxlength: 50 },
  { name: "localidad", label: "Localidad", type: "text", placeholder: "Ej.Bovril", required: true, maxlength: 50 },
  { name: "direccion", label: "Dirección", type: "text", placeholder: "Ej.Nestor Kirchner 165", required: true, maxlength: 100 },
  { name: "numeroPiso", label: "Número o piso", type: "number", placeholder: "Ej.0", required: true, min: 0 },
  { name: "quienRecibe", label: "¿Quién recibe el pedido?", placeholder: "Ej.Juan Perez", type: "text", maxlength: 50 },
  { name: "infoAdicional", label: "Info adicional", placeholder: "Ej.Casa Amarilla, Rejas Negras", type: "textarea", maxlength: 200 },
];

const step3Fields = [
  {
    name: "metodoPago",
    label: "Método de pago",
    type: "select",
    required: true,
    options: ["Tarjeta de Crédito", "Tarjeta de Débito"],
  },
  { name: "numeroTarjeta", label: "Número de tarjeta", type: "number", placeholder: "Ej.325698523154", required: true, pattern: "\\d{16}" },
  { name: "fechaExpiracion", label: "Fecha de expiración", type: "text", placeholder: "Ej.07/28", required: true, pattern: "(0[1-9]|1[0-2])/\\d{2}", maxlength: 5, },
  { name: "cvc", label: "CVC", type: "number", placeholder: "Ej.557", required: true, pattern: "\\d{3}", maxlength: 3 },
];

const handleNextStep = (formData) => {
  if (currentStepIndex.value === 0) stepData.value.contactInfo = formData;
  if (currentStepIndex.value === 1) stepData.value.shippingInfo = formData;
  if (currentStepIndex.value === 2) stepData.value.paymentInfo = formData;

  if (currentStepIndex.value < 2) {
    currentStepIndex.value++;
  }
};

const handlePrevStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--;
  }
};

const pay = () => {
  localStorage.removeItem("cart");

  setTimeout(() => {
    router.push({
      name: "successPage", 
      query: { success: 'true', message: '¡Pago realizado con éxito!' }
    });
  }, 1000); 
};

const goToCart = () => {
  window.location.href = "/cart";
};

const cart = ref([
  { name: "Producto 1", price: 50 },
  { name: "Producto 2", price: 75 },
]);

const totalAmount = ref(cart.value.reduce((total, item) => total + item.price, 0));
</script>

<style scoped>
.payment-container {
  display: flex;
  padding: 0 2.5rem;
  padding-top: 3rem;
  min-height: 100vh;
  background-color: #D5D6D2;
}

.payment-content {
  flex: 1;
  padding: 1.5rem;
}

.payment-title {
  font-size: 1.5rem;
  padding: 1.25rem;
  color: #4b5563;
  text-align: center;
}

.payment-summary {
  width: 33.333%;
  padding-right: 1rem;
}

@media (max-width: 768px) {
  .payment-container {
    flex-direction: column;
    padding: 0 1rem;
    padding-top: 2rem;
  }

  .payment-summary {
    width: 100%;
    padding-right: 0;
    margin-top: 1rem;
  }
}
</style>

  