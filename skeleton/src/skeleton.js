import Vue from 'vue'
import Skeleton1 from './skeleton.vue'
import Skeleton2 from './skeleton2.vue'
export default new Vue({
    components: {
        Skeleton1,
        Skeleton2
    },
    template: '<div>' +
        '<Skeleton1 id="skeleton1" style="display: none"></Skeleton1>' +
        '<Skeleton2 id="skeleton2" style="display: none"></Skeleton2>' +
        '</div>'
})
