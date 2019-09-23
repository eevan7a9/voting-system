<template>
  <div>
    <div class="dark pady-1 padx-2">
      <h2>{{ title }}</h2>
      <p>{{ additional_info }}</p>
    </div>
    <div class="answers-cont mgt-1">
      <div class="answers pady-1 padx-2 bg-bluedient light fw-bold">
        <label for="choices">Add Choices</label>
        <input type="text" name id />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateAnswers",
  props: {
    title: String,
    additional_info: String
  }
};
</script>

<style>
</style>