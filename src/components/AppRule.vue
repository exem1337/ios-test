<template>
  <div 
    class="rule"
    :class="{ 'active' : active }"
  >
    <div
      v-if="!active" 
      class="icon"
    >
      <q-icon name="text_fields" />
    </div>
    <div v-else>
      <span>ЕСЛИ</span>
      <div
        v-for="(statement, key) in rule.statements"
        :key="key"
      >
        <span>{{ statement.name }}</span>
        <span>{{ statement.value }}</span>
        <span v-if="key !== rule.statements.length - 1">И</span>
      </div>
      <span>ТО {{ rule.result }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IRule } from 'src/models/rules.model';

const props = defineProps<{
  rule: IRule;
  active: boolean;
}>()
</script>

<style lang="scss" scoped>
.rule {
  margin-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #616161;
  margin-left: -4px;
  margin-right: -4px;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  cursor: pointer;

  &:not(.active) {
    .icon {
      width: 100%;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #616161;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
    }

    border-bottom: none;
    background-color: #eeeeee;
    padding-bottom: 0;
    border-radius: 4px;
    max-width: 108px;
    margin-left: auto;
    margin-right: auto;
  }

  &:hover {
    background-color: #fafafa;
  }

  span {
    font-size: 16px;
    color: #616161;
    text-transform: uppercase;

    &:first-child {
      margin-left: 4px;
    }

    &:last-child {
      margin-right: 4px;
    }
  }

  div {
    display: flex;
    align-items: center;
    color: #616161;
    transition: .3s display ease;
    overflow: hidden;

    span {
      white-space: nowrap;
      &:first-child {
        margin-right: 4px;
      }

      &:nth-child(3) {
        margin-left: 8px;
      }
    }
  }
}
</style>
