<template>
    <div>
        <button class="btn" @click="changeMessage"></button>
        {{text}}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                text: 'vue-text'
            }
        },
        methods: {
            changeMessage() {
                this.text = 'click message'
            }
        }
    }
</script>