<template>
  <div>
    <div
      class="alert container dark pady-1 padx-2 mgy-1 mgt-2 borad-2"
      :class="alert_user.error ? 'danger':'success'"
      v-show="alert_user.show == 1"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-check-circle"
          v-if="!alert_user.error"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-alert-triangle"
          v-if="alert_user.error"
        >
          <path
            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
          />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12" y2="17" />
        </svg>
      </span>
      <p class="fs-20">{{ alert_user.message }}</p>
      <span class="pointer" @click="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Alert",
  computed: mapGetters(["alert_user"]),
  methods: {
    ...mapActions(["closeUserMessage"]),
    close() {
      this.closeUserMessage();
    }
  }
};
</script>

<style scoped>
.alert {
  text-align: center;
  display: flex;
  justify-content: space-between;
}
.success {
  border: 3px solid #2bb110;
  background: #76e296;
  color: #289c10;
}
.danger {
  border: 3px solid #b13010;
  background: #e2a176;
  color: #b13010;
}
</style>