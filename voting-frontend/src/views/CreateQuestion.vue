<template>
  <div class="pady-3">
    <div class="wrapper pady-2 bg-white borad-1" v-if="!edit_answer">
      <section id="question">
        <h1 class="create padx-2 tx-upp blue">Create Survey</h1>
        <div class="create-container pady-1 padx-3">
          <div class="title-container">
            <label for="title" class="pady-1 fs-18 tx-upp">title :</label>
            <input type="text" class="fs-18 pady-1 padx-1 borad-1" v-model="title" id="title" />
            <p class="red" v-show="error.message">Error: {{ error.message }}</p>
          </div>

          <div class="additional-info">
            <label for="description" class="pady-1 fs-13 tx-upp">description (optional):</label>
            <textarea
              class="borad-1 pady-1 padx-1"
              v-model="description"
              id="description"
              cols="30"
              rows="2"
            ></textarea>
            <label for="additional_info" class="pady-1 fs-13 tx-upp">additional info (optional):</label>
            <editor
              class="editor"
              v-model="additional_info"
              :options="editorOptions"
              :html="editorHtml"
              :visible="editorVisible"
              previewStyle="vertical"
              height="300px"
              mode="wysiwyg"
            />
          </div>
          <div class="submit-container">
            <button
              @click="cancel"
              type="button"
              class="cancel blue pady-1 mgy-3 padx-2 borad-1 bg-lightdient fs-20 pointer"
            >Cancel</button>
            <button
              @click="next"
              class="pady-1 mgy-3 padx-2 borad-1 bg-bluedient light fs-20 pointer"
            >continue</button>
          </div>
        </div>
      </section>
    </div>
    <transition name="fade">
      <section v-if="edit_answer">
        <CreateAnswers
          :title="title"
          :description="description"
          :additional_info="additional_info"
          @returnCreateQuestion="edit_answer = 0"
        />
      </section>
    </transition>
  </div>
</template>

<script>
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import { Editor } from "@toast-ui/vue-editor";
import CreateAnswers from "../components/answers/CreateAnswers";
export default {
  name: "CreateQuestion",
  components: {
    CreateAnswers,
    editor: Editor
  },
  data() {
    return {
      title: "",
      description: "",
      additional_info: "",
      error: {
        message: ""
      },
      edit_answer: 0,
      // set editor default options
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
    validate() {
      if (this.title) {
        if (this.title.length < 6) {
          this.error.message = "Title must be atleast 6 character long";
        } else {
          this.error.message = "";
        }
      } else {
        this.error.message = "title must not be empty";
      }
    },
    next() {
      this.validate();
      if (!this.error.message) {
        this.edit_answer = 1;
      }
    },
    cancel() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
label {
  min-width: 100px;
  text-align: left;
}
.editor {
  font-size: 20px;
}
.create {
  text-align: center;
}
.cancel {
  border: 1px solid #1583c7;
}
.wrapper {
  border: 3px solid #1583c7;
  margin-left: auto;
  margin-right: auto;
  width: 85%;
  -webkit-box-shadow: 4px 9px 17px -8px #000000;
  box-shadow: 4px 9px 17px -8px #000000;
}
.title-container {
  display: flex;
  flex-direction: column;
}
.title-container input {
  width: 100%;
  border: 3px solid #1583c7;
}
.title-container p {
  text-align: center;
}
.additional-info {
  display: flex;
  flex-direction: column;
}
.additional-info .editor,
.additional-info textarea {
  width: 100%;
  border: 3px solid #1583c7;
}
.submit-container {
  display: flex;
  justify-content: space-around;
}
.editor {
  background: #ffffff;
}
@media (max-width: 600px) {
  .wrapper {
    width: 100%;
  }
  .create-container {
    padding: 5px;
  }
  .submit-container {
    padding: 20px 0;
  }
}
</style>