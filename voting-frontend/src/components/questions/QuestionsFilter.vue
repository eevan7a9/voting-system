<template>
  <div class="wrapper pady-2 padx-2 bg-lightdient borad-2">
    <div class="sorter">
      <h2 class="tx-upp fs-large">sorter</h2>
      <hr class="mgy-1 mgx-1" />
      <ul>
        <li>
          <p class="pady-8-px tx-cap fs-18">newest</p>
          <input type="radio" name="sorter" id />
        </li>
        <li>
          <p class="pady-8-px tx-cap fs-18">oldest</p>
          <input type="radio" name="sorter" id />
        </li>
      </ul>
    </div>
    <div class="filter">
      <h2 class="tx-upp fs-large">filter</h2>
      <hr class="mgy-1 mgx-1" />
      <ul>
        <li>
          <p class="pady-8-px tx-cap fs-18">all</p>
          <input type="radio" name="sorter" id />
        </li>
        <li>
          <p class="pady-8-px tx-cap fs-18">not voted</p>
          <input type="radio" name="sorter" id />
        </li>
        <li>
          <p class="pady-8-px tx-cap fs-18">voted</p>
          <input type="radio" name="sorter" id />
        </li>
      </ul>
    </div>
    <div class="Options">
      <h2 class="tx-upp fs-large">options</h2>
      <hr class="mgy-1 mgx-1" />
      <button class="pady-1 padx-1 mgt-1 bg-bluedient light fw-bolder pointer">New Question</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionsFilter",
  data() {
    return {
      test: "Hello World"
    };
  }
};
</script>

<style scoped>
.wrapper {
  border: 3px solid #1583c7;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.sorter h2,
.filter h2,
.options h2 {
  width: 100px;
  text-align: right;
}
.sorter ul,
.filter ul {
  list-style: none;
}
.sorter li,
.filter li {
  display: flex;
}
.sorter li p,
.filter li p {
  width: 100px;
  text-align: right;
}
.sorter li input,
.filter li input {
  margin-left: 5px;
}
</style>