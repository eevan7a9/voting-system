<template>
  <div class="wrapper-edit-question dark pady-1 padx-2">
    <input
      @focus="saved = false"
      class="fs-25 pady-1 padx-1 mgb-1"
      type="text"
      v-model="question_detail.title"
    />
    <textarea
      @focus="saved = false"
      class="pady-1 padx-1 fs-18 mgb-1"
      v-model="question_detail.description"
      cols="10"
      rows="3"
    ></textarea>
    <editor
      class="additional_info pady-1 padx-1 fs-18 mgb-1"
      ref="additionalInfo"
      v-model="question_detail.additional_info"
      :options="editorOptions"
      :html="editorHtml"
      :visible="editorVisible"
      previewStyle="vertical"
      height="500px"
      mode="wysiwyg"
    />
    <div class="save-container">
      <p class="pady-5-px green" v-show="saved">Successfully Saved</p>
      <button
        @click="save"
        class="submit pady-10-px padx-2 mgb-1 fs-18 fw-bold borad-1 light bg-bluedient tx-cap pointer"
      >Save</button>
    </div>
  </div>
</template>

<script>
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import { Editor } from "@toast-ui/vue-editor";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "QuestionEdit",
  components: {
    editor: Editor
  },
  computed: {
    ...mapGetters(["question_detail"])
  },
  data() {
    return {
      saved: false,
      question: {},
      editorOptions: {
        minHeight: "200px",
        language: "en_US",
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: false,
        hideModeSwitch: false,
        toolbarItems: [
          "heading",
          "bold",
          "italic",
          "strike",
          "divider",
          "hr",
          "quote",
          "divider",
          "ul",
          "ol",
          "task",
          "indent",
          "outdent",
          "divider",
          "table",
          // "image",
          "link",
          "divider",
          "code",
          "codeblock"
        ]
      },
      editorHtml: "",
      editorVisible: true
    };
  },
  methods: {
    ...mapActions(["editQuestion", "onLoader", "offLoader", "showAlert"]),
    save() {
      this.onLoader();
      // Save Edits of title and description
      this.question.id = this.question_detail.id;
      this.question.title = this.question_detail.title;
      this.question.description = this.question_detail.description;
      this.question.additional_info = this.question_detail.additional_info;

      this.editQuestion(this.question).then(res => {
        if (!res.error) {
          this.saved = true;
          const content = {
            message: "Question, Updated successfully",
            error: false
          };
          this.showAlert(content).then(() => {
            this.offLoader();
          });
        } else {
          const content = {
            message: res.message,
            error: true
          };

          this.showAlert(content).then(() => {
            this.offLoader();
          });
        }
      });
    }
  }
};
</script>

<style scoped>
input {
  border: 0px solid #1583c7;
  border-bottom: 3px solid #1583c7;
  width: 100%;
  background: #ffffff;
}
textarea,
.additional_info {
  background: #ffffff;
  border: 0px solid #1583c7;
  border-bottom: 3px solid #1583c7;
  width: 100%;
  resize: vertical;
}
.wrapper {
  border: 3px solid #1583c7;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.save-container {
  text-align: right;
}
@media (max-width: 600px) {
  textarea {
    padding: 0;
    font-size: 15px;
  }
  input {
    padding: 0;
    font-size: 15px;
  }
  .edit-mode {
    padding: 0;
  }
  .wrapper-edit-question {
    padding: 0;
  }
}
</style>