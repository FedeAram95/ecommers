<template>
  <div class="super-table" @click="closeMenu">
    <table>
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.value"
            class="header-cell"
            :class="{ 'text-center': centerText }"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item[itemKey]"
          class="body-row"
        >
          <td
            v-for="header in headers"
            :key="header.value"
            class="body-cell"
            :class="{ 'text-center': centerText, 'actions-cell': header.value === 'actions' }"
          >
            <template v-if="header.value === 'actions'">
              <div class="actions-wrapper" @click.stop>
                <button class="menu-button" @click="openActionsMenu($event, item[itemKey], item)">
                  ⋮
                </button>
              </div>
            </template>
            <template v-else>
              <slot
                v-if="$slots[`cell-${header.value}`]"
                :name="`cell-${header.value}`"
                :item="item"
              />
              <template v-else>
                {{ item[header.value] }}
              </template>
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Teleport para renderizar menú fuera del flujo -->
    <teleport to="body">
      <div
        v-if="openMenuId !== null"
        class="actions-menu"
        :style="{ top: menuPosition.top + 'px', left: menuPosition.left + 'px' }"
        @click.stop
      >
        <slot
          name="cell-actions"
          :item="openMenuItem"
        >
          <button class="action-btn edit" @click="emitEdit(openMenuItem)">
            Editar
          </button>
          <button class="action-btn delete" @click="emitDelete(openMenuItem)">
            Eliminar
          </button>
        </slot>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  headers: { type: Array, required: true },
  items: { type: Array, required: true },
  itemKey: { type: String, required: true },
  centerText: { type: Boolean, default: true },
})

const emit = defineEmits(['edit', 'delete'])

const openMenuId = ref(null)
const openMenuItem = ref(null)
const menuPosition = ref({ top: 0, left: 0 })

function openActionsMenu(event, id, item) {
  event.stopPropagation()

  if (openMenuId.value === id) {
    // Cierra el menú si está abierto en el mismo item
    openMenuId.value = null
    openMenuItem.value = null
  } else {
    openMenuId.value = id
    openMenuItem.value = item

    // Calcula posición para el menú debajo del botón
    const rect = event.currentTarget.getBoundingClientRect()

    // Ajusta un poco el menú para que quede alineado con el botón
    menuPosition.value = {
      top: rect.bottom + window.scrollY + 5, // 5px de margen
      left: rect.left + window.scrollX,
    }
  }
}

function closeMenu() {
  openMenuId.value = null
  openMenuItem.value = null
}

function emitEdit(item) {
  emit('edit', item)
  closeMenu()
}

function emitDelete(item) {
  emit('delete', item)
  closeMenu()
}
</script>

<style scoped>
.super-table {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  background: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2e2e2e;
  user-select: none;
  position: relative;
}

table {
  width: 97%;
  margin-left: 25px;
  border-collapse: separate;
  border-spacing: 0;
}

thead {
  background-color: #f7f9fb;
}

.header-cell {
  padding: 16px 20px;
  font-weight: 600;
  font-size: 1rem;
  color: #555;
  border-bottom: 2px solid #eaecef;
}

.body-row {
  transition: background-color 0.2s ease;
  cursor: default;
}

.body-row:hover {
  background-color: #f5f7fa;
}

.body-cell {
  padding: 16px 20px;
  font-size: 0.95rem;
  border-bottom: 1px solid #eaecef;
  vertical-align: middle;
  color: #444;
}

.text-center {
  text-align: center;
}

.actions-cell {
  width: 50px;
  position: relative;
  padding: 0 8px;
  text-align: center;
}

.menu-button {
  background: transparent;
  border: none;
  font-size: 1.6rem;
  color: #666;
  cursor: pointer;
  line-height: 1;
  padding: 4px;
  border-radius: 6px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.menu-button:hover {
  background-color: #e2e8f0;
  color: #2563eb;
}

/* Menú desplegable renderizado en el body */
.actions-menu {
  position: absolute;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 8px 0;
  min-width: 120px;
  z-index: 10000;
  user-select: none;
  display: flex;
  flex-direction: column;
}

.action-btn {
  background: transparent;
  border: none;
  width: 80%;
  padding: 10px 16px;
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
  color: #555;
  transition: background-color 0.15s ease;
}

.action-btn:hover {
  background-color: #f3f4f6;
}

.action-btn.edit {
  color: #2563eb;
}

.action-btn.delete {
  color: #dc2626;
}

/* Responsive: tabla scroll horizontal en pantallas pequeñas */
@media (max-width: 600px) {
  .super-table {
    overflow-x: auto;
  }

  table {
    min-width: 450px;
  }
}
</style>
