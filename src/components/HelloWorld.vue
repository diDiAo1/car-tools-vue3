<template>
  <h1>{{ msg }}</h1>
  <button @click="inCrement"> count is: </button>
  <p>{{ count }}</p>
  <el-button type="primary" plain @click="toPath">跳转到about</el-button>
</template>

<script>
  import { defineComponent, computed } from 'vue'
  import { useStore } from 'vuex'
  import { key } from '../store'
  import router from '../router'

  export default defineComponent({
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        default: ''
      }
    },
    setup() {
      const store = useStore(key)

      const count = computed(() => store.state.count)

      const toPath = () => {
        router.push({name:"City"})
      }

      return {
        count,
        inCrement: () => store.commit('increment'),
        toPath,
      }
    }
  })
</script>
