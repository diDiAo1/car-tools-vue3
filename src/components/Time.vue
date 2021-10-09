<template>
  <!-- <div class="basePopup" :class="{'show':state.show}"> -->
  <div class="basePopup" :class="{'show':state.show}">
    <div class="mask" @click="cancel"></div>
    <div class="content-pop">
      <!-- <h1>hello</h1> -->
      <van-datetime-picker
        v-model="state.currentDate"
        :min-date="state.minDate"
        :max-date="state.maxDate"
        type="datetime"
        :filter="filter"
        title="请选择用车时间"
        @confirm="handleOk"
        @cancel="cancel"
      />
    </div>
  </div>
</template>


<script>
import { defineComponent, reactive, ref, watch } from 'vue'

export default defineComponent({
  name: 'Time',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["ok", "cancel"],
  data() {
    return {
    }
  },
  setup(props, context) {

    const currentDate = ref(new Date());

    const state = reactive({
      currentDate,
      show: props.visible,
      minDate: new Date(2021, 09, 1),
      maxDate: new Date(2025, 10, 1),
    });

    const filter = (type, options) => {
      if (type === 'minute') {
        return options.filter((option) => Number(option) % 10 === 0);
      }
      return options;
    };

    watch(props, (val, oldVal) => {
      state.show = val.visible;
    });

    const cancel = () => {
      context.emit("cancel", false);
      return false;
    };

    const handleOk = () => {
      context.emit("ok", state.currentDate);
    };
    
    return {
      state,
      filter,
      cancel,
      handleOk,
    }
  }
})
</script>


<style>

</style>