<script>
export default {
  props: {
    tabList: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      activeTab: 1,
    };
  },
  methods: {
    getIndex(index) {
      if (index >= 1) {
        return "border-r";
      }
    }
  }
};
</script>

<template>
    <div>
      <ul class="tabs-list">
        <li
          v-for="(tab, index) in tabList"
          :key="tab + index"
          class=""
          :class="{
            'tab-item tab-item-active': index + 1 === activeTab,
            'tab-item': index + 1 !== activeTab,
          }"
        >
          <label :for="tab + index" v-text="tab" class="" />
          <input :id="tab + index" type="radio" name="" :value="index + 1" v-model="activeTab" class="" />
        </li>
      </ul>

      <template v-for="(tab, index) in tabList">
        <div :key="tab + index" v-if="index + 1 === activeTab" class="tabs-content" :class="getIndex(index)">
          <slot :name="`tabPanel-${index + 1}`" />
        </div>
      </template>
    </div>
  </template>
  
<style>
  ul.tabs-list {
    list-style: none;
    display: flex;
  }

  ul.tabs-list li.tab-item {
    /* margin-right: 16px; */
    font-size: 20px;
    font-weight: 600;
    color: #8E8E8E;
    border-radius: 16px 16px 0 0;
    cursor: pointer;
  }

  ul.tabs-list li.tab-item-active {
    background-color: #F3F3F3;
    color: var(--text-color);
  }

  ul.tabs-list li.tab-item label {
    padding: 8px 32px 2px;
    cursor: pointer;
  }

  ul.tabs-list input {
    display: none;
  }

  .tabs-content {
    background-color: #F3F3F3;
    height: 100%;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    border-radius: 0 16px 16px;
  }

  .tabs-content.border-r {
    border-radius: 16px;
  }
</style>