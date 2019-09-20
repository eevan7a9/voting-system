<template>
  <div>
    <div class="wrapper mgt-2">
      <div class="question-cont bg-lightdient dark pady-1 padx-2">
        <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum nostrum eaque et vero?</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat assumenda, ipsam vel distinctio temporibus facere delectus eius corrupti consectetur iure!</p>
      </div>
      <hr />
      <div class="answers-cont bg-violetdient">
        <div class="answers pady-2 padx-2 bg-lightdient">
          <p class="fs-18">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, neque.</p>
          <input type="radio" :name="radio_name" id />
        </div>
        <div class="answers pady-2 padx-2 bg-lightdient">
          <p class="fs-18">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, neque.</p>
          <input type="radio" :name="radio_name" id />
        </div>
      </div>
    </div>
    <div class="wrapper mgt-2">
      <div class="question-cont bg-lightdient dark pady-1 padx-2">
        <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum nostrum eaque et vero?</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat assumenda, ipsam vel distinctio temporibus facere delectus eius corrupti consectetur iure!</p>
      </div>
      <hr />
      <div class="answers-cont bg-violetdient">
        <div class="answers pady-2 padx-2 bg-lightdient">
          <p class="fs-18">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, neque.</p>
          <input type="radio" :name="radio_name" id />
        </div>
        <div class="answers pady-2 padx-2 bg-lightdient">
          <p class="fs-18">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, neque.</p>
          <input type="radio" :name="radio_name" id />
        </div>
      </div>
    </div>
    <div class="wrapper mgt-2">
      <div class="question-cont bg-lightdient dark pady-1 padx-2">
        <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum nostrum eaque et vero?</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat assumenda, ipsam vel distinctio temporibus facere delectus eius corrupti consectetur iure!</p>
      </div>
      <hr />
      <div class="answers-cont bg-violetdient">
        <div class="answers pady-2 padx-2 bg-lightdient">
          <p class="fs-18">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, neque.</p>
          <input type="radio" :name="radio_name" id />
        </div>
        <div class="answers pady-2 padx-2 bg-lightdient">
          <p class="fs-18">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, neque.</p>
          <input type="radio" :name="radio_name" id />
        </div>
      </div>
    </div>
    <div class="wrapper mgt-2">
      <div class="question-cont bg-lightdient dark pady-1 padx-2">
        <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum nostrum eaque et vero?</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat assumenda, ipsam vel distinctio temporibus facere delectus eius corrupti consectetur iure!</p>
      </div>
      <hr />
      <div class="answers-cont bg-violetdient">
        <div class="answers pady-2 padx-2 bg-lightdient">
          <p class="fs-18">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, neque.</p>
          <input type="radio" :name="radio_name" id />
        </div>
        <div class="answers pady-2 padx-2 bg-lightdient">
          <p class="fs-18">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, neque.</p>
          <input type="radio" :name="radio_name" id />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionsList",
  data() {
    return {
      radio_name: "this"
    };
  }
};
</script>

<style>
.wrapper {
  border: 3px solid rgb(106, 4, 140);
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.question-cont {
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.answers {
  max-width: 700px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid #333;
  display: flex;
}
</style>