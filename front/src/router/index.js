import Vue from 'vue'
import Router from 'vue-router'
import CalendarViewPage from '@/components/views/CalendarViewPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: CalendarViewPage
    }
  ]
})
