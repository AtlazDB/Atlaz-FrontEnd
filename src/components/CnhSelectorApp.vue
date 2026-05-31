<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['update:cnhList'])

const options = ['A', 'B', 'C', 'D', 'E']

function add(opt) {
  if (!selected.value.includes(opt)) {
    selected.value.push(opt)
    emit('update:cnhList', [...selected.value])
  }
}

function remove(opt) {
  selected.value = selected.value.filter((i) => i !== opt)
  emit('update:cnhList', [...selected.value])
}

const props = defineProps({
  cnhList: {
    type: Array,
    default: () => [],
  },
})

const selected = ref([...props.cnhList])

watch(
  () => props.cnhList,
  (novaLista) => {
    selected.value = [...novaLista]
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <div class="options">
      <span
        v-for="opt in options"
        :key="opt"
        class="option"
        :class="{ disabled: selected.includes(opt) }"
        @click="add(opt)"
      >
        {{ opt }}
      </span>
    </div>

    <div class="selected-box">
      <span v-if="!selected.length" class="placeholder">Nenhum item selecionado</span>
      <span v-for="item in selected" :key="item" class="tag" @click="remove(item)">
        {{ item }} ×
      </span>
    </div>
  </div>
</template>

<style scoped>
.tag,
.option {
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  border-radius: 10px;
  transition:
    background 0.15s,
    color 0.15s,
    transform 0.1s;
}

.tag {
  display: inline-flex;
  align-items: center;
  margin: 0 5px;
  gap: 10px;
  background: #003366;
  color: #fff;
  padding: 3px 12px;
}

.tag:hover {
  background: #003366;
  transform: scale(0.96);
}

.option {
  min-width: 42px;
  text-align: center;
  padding: 5px 16px;
  border: 1.5px solid #003366;
  color: #003366;
  background: transparent;
}

.option:hover:not(.disabled) {
  background: #6a5acd15;
}

.option.disabled {
  opacity: 0.25;
  cursor: default;
  border-style: solid;
}

.selected-box {
  width: 100%;
  min-height: 45px;
  border: 1px solid #1a1a2e;
  border-radius: 10px;
  padding: 8px 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.placeholder {
  font-size: 13px;
  color: #aaa;
}
</style>
