<template>
  <v-main>
    <p class="body-1 font-weight-regular ma-0 px-0 pt-2">{{ $t('modules.comisiones.dashboard.filters.subtitle') }} {{ userData.name }}!</p>
    <h1 class="display-1 font-weight-bold ma-0 px-0 pt-2 pb-2">{{ $t('modules.comisiones.dashboard.filters.title') }}</h1>

    <!-- Filtros en escritorio -->
    <v-row class="d-none d-md-flex pl-3">
      <v-col cols="12" sm="12" md="6" lg="2" class="pt-0 mr-3 px-0">
        <p class="text-uppercase h-6 font-weight-medium">{{ $t('modules.comisiones.dashboard.filters.selects.over.year') }}</p>
        <v-select
          :items="years"
          v-model="year"
          label="Años"
          prepend-inner-icon="mdi-calendar-text"
          outlined
          full-width
          hide-details
        />
      </v-col>

      <v-col cols="12" sm="12" md="6" lg="2" class="pt-0 mr-3 px-0">
        <p class="text-uppercase h-6 font-weight-medium">{{ $t('modules.comisiones.dashboard.filters.selects.over.period') }}</p>
        <v-select
          :items="termsList"
          v-model="term"
          label="item"
          prepend-inner-icon="mdi-calendar-text"
          outlined
          flat
          full-width
        />
      </v-col>

      <v-col cols="12" sm="12" md="6" lg="2" class="pt-0 mr-3 px-0" v-show="sellers.value.length !== 1">
        <p class="text-uppercase h-6 font-weight-medium">{{ $t('modules.comisiones.dashboard.filters.selects.over.agent') }}</p>
        <v-autocomplete
          :items="sellers"
          item-text="sellerCode"
          :label="$t('modules.comisiones.dashboard.filters.selects.all')"
          v-model="selectedSellers"
          prepend-inner-icon="mdi-map-marker"
          outlined
          full-width
          multiple
          clearable
          return-object
        />
      </v-col>

      <v-col cols="12" sm="12" md="6" lg="2" class="d-flex justify-center align-end pt-0 px-0">
        <v-btn
          @click="filter"
          class="mb-md-2 text-uppercase caption"
          block
          height="44"
          outlined
          color="primary"
        >
          <v-icon left>mdi-filter</v-icon>
          {{ $t('modules.comisiones.dashboard.filters.selects.button') }}
        </v-btn>
      </v-col>

      <v-col cols="12" sm="12" md="6" lg="2" class="d-flex justify-center align-center pt-6">
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn class="mr-5" v-bind="attrs" v-on="on" large icon color="primary" @click="requestConfirmation">
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('modules.comisiones.dashboard.filters.selects.download') }}</span>
        </v-tooltip>
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" large icon color="primary" @click="openDrawer">
              <v-icon>mdi-history</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('modules.comisiones.dashboard.filters.selects.my_reports') }}</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <!-- Filtros mobile -->
    <v-row class="d-md-none">
      <v-col cols="12">
        <v-btn icon class="ma-2" @click="expandFilter.value = !expandFilter.value"><v-icon>mdi-filter</v-icon></v-btn>
      </v-col>
    </v-row>

    <v-expand-transition>
      <div class="mobileFilter" :style="{ visibility: expandFilter.value ? 'visible' : 'hidden' }">
        <v-row class="py-3 px-6">
          <v-col cols="12" class="d-flex align-center">
            <span style="flex: 1">Filtros</span>
            <v-btn icon @click="expandFilter.value = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-col>

          <v-col cols="12">
            <v-select :items="years" v-model="year" label="Años" prepend-inner-icon="mdi-calendar-text" outlined full-width hide-details />
          </v-col>

          <v-col cols="12">
            <v-select :items="termsList" v-model="term" label="item" prepend-inner-icon="mdi-calendar-text" outlined flat full-width />
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              :items="sellers"
              item-text="sellerCode"
              :label="$t('modules.comisiones.dashboard.filters.selects.all')"
              v-model="selectedSellers"
              prepend-inner-icon="mdi-map-marker"
              outlined
              full-width
              multiple
              clearable
              :menu-props="{ closeOnClick: true }"
              return-object
            />
          </v-col>

          <v-col>
            <v-btn @click="filter" class="mt-md-8 text-uppercase caption" block height="44" outlined color="primary">
              <v-icon left>mdi-filter</v-icon>
              {{ $t('modules.comisiones.dashboard.filters.selects.button') }}
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-expand-transition>

    <!-- Tarjetas -->
    <v-row v-if="props.showCard">
      <v-col lg="4" cols="12" class="mt-5">
        <v-card class="pa-2" outlined tile elevation="1">
          <v-card-subtitle class="pa-2 d-flex justify-space-between">
            <p>{{ $t('modules.comisiones.dashboard.filters.cards.charge') }}</p>
            <p>{{ dateTotalToPay.from }} al {{ dateTotalToPay.to }}</p>
          </v-card-subtitle>
          <v-card-title class="pl-2 font-weight-black display-2 pb-2">{{ currency(totalToPay.value) }}</v-card-title>
        </v-card>
      </v-col>

      <v-col lg="4" cols="12" class="mt-5">
        <v-card class="pa-2" outlined tile elevation="1">
          <v-card-subtitle class="pa-2 d-flex justify-space-between">
            <p>{{ $t('modules.comisiones.dashboard.filters.cards.charged') }}</p>
            <p>{{ dateTotalPayed.from }} al {{ dateTotalPayed.to }}</p>
          </v-card-subtitle>
          <v-card-title class="pl-2 font-weight-black display-2 pb-2">{{ currency(totalPayed.value) }}</v-card-title>
        </v-card>
      </v-col>

      <v-col lg="4" cols="12" class="mt-5">
        <v-card class="pa-3 pb-5" outlined tile elevation="1">
          <v-card-subtitle class="pl-2 pt-2 pb-1">
            {{ $t('modules.comisiones.dashboard.filters.cards.variableCommissions.head') }}
          </v-card-subtitle>
          <v-card-title class="pl-2 py-2">
            <h3>
              {{ $t('modules.comisiones.dashboard.filters.cards.variableCommissions.content', {
                salesNeedToPrize: prizesStatus.value.salesNeedToPrize,
                extraPercentagePayment: prizesStatus.value.extraPercentagePayment,
              }) }}
            </h3>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { $terms, $sellers } from '../Services/index';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  showCard: {
    type: Boolean,
    default: true,
  }
});

const store = useStore();
const { t } = useI18n();

const expandFilter = ref(false);
const years = ref([]);
const year = ref(null);
const termsList = ref(['1A', '1B', '2A', '2B']);
const term = ref(null);
const selectedSellers = ref([]);
const sellers = ref([]);

const totalPayed = ref(0);
const totalToPay = ref(0);
const prizesStatus = ref({
  extraPercentagePayment: 0,
  completeSalesAmount: 0,
  salesNeedToPrize: 0,
  completeObjetivePercentage: 0
});

const dateTotalPayed = ref({ from: null, to: null });
const dateTotalToPay = ref({ from: null, to: null });

const userData = computed(() => store.getters['commons/getUserData']);
const userId = computed(() => store.getters['commons/getUserID']);
const roles = computed(() => store.getters['commons/getUserRoles']);
const isAdmin = computed(() => roles.value.some(r => r.rolType.meaning === 'Administrador'));

const selectedSellersId = computed(() => {
  const ids = selectedSellers.value.map(item => item.id);
  return ids.length ? ids : isAdmin.value ? [] : sellers.value.map(item => item.id);
});

const emit = defineEmits(['getCommissionReports']);

function openDrawer() {
  emit('getCommissionReports');
}

function currency(value) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value);
}

async function getSellers() {
  try {
    const res = await $sellers.find('users', null, { params: { user: userId.value } });
    sellers.value = res.data;
  } catch {
    sellers.value = [];
  }
}

async function getTerms() {
  try {
    const res = await $terms.find(null, null, { params: { orderBy: '...' } }); // Completa aquí
    // Agrega lógica de terms si es necesario
  } catch {
    // Maneja error si hace falta
  }
}

function requestConfirmation() {
  // Lógica para descarga
}

function filter() {
  // Lógica para filtrar datos
}

onMounted(async () => {
  await getSellers();
  await getTerms();
  filter();
});
</script>
