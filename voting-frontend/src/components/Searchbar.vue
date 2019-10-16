<template>
  <div class="wrapper bg-lightdient pady-1 padx-1 borad-1" :class="{focuse: focuse}">
    <div class="search-wrapper">
      <input
        type="text"
        class="mgr-1 fs-18 ls-1 dark bg-lightdient borad-1 padx-1"
        @keypress.enter="search"
        @focus="focuse = 1"
        @blur="focuse = 0"
        placeholder="Search..."
      />
      <svg
        id="img"
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-search blue mgl-1 pointer"
        @click="search"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Searchbar",
  data() {
    return {
      focuse: 0
    };
  },
  methods: {
    search() {
      alert("toggled");
    }
  }
};
</script>

<style scoped>
.wrapper {
  border: 3px solid #1583c7;
  width: 350px;
  margin-left: 30px;
  transition: 1s;
}
.focuse {
  flex-grow: 1;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.search-wrapper {
  display: grid;
  grid-template-columns: 1fr auto;
}
.search-wrapper input {
  width: 100%;
  border: 2px solid rgb(153, 159, 163);
}
.search-wrapper input:focus {
  border: 3px solid #1583c7;
}
@media (max-width: 700px) {
  .wrapper {
    flex-grow: 1;
    width: 100%;
    margin: auto 5px;
  }
}
</style>