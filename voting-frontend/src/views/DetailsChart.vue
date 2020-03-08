<template>
  <div class="outer-wrapper">
    <div class="inner-wrapper bg-lightdient padx-1 pady-1">
      <header>
        <h1>Question TItle {{questionId}}s</h1>
      </header>
      <div class="chart-container">
        <BarChart :chartData="chartDataBar" :options="optionsBar" v-if="chartReady" />
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/chart/BarChart.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    BarChart
  },
  props: {
    questionId: Number
  },
  data() {
    return {
      chartReady: 0,
      chartDataBar: {
        labels: [],
        datasets: [
          {
            label: "Survey Results",
            backgroundColor: ["#009fde", "#31c0f8", "#8ddcfb", "#bae8fb"],
            data: []
          }
        ]
      },
      optionsBar: {
        scales: {
          xAxes: [
            {
              gridLines: {
                offsetGridLines: true
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    ...mapGetters(["question_detail"])
  },
  methods: {
    ...mapActions(["onLoader", "offLoader", "getQuestionDetails"]),
    setChartData(answers) {
      answers
        .map(ans => {
          return {
            title: ans.title,
            votes: ans.votes.length
          };
        })
        .sort((a, b) => b.votes - a.votes)
        .forEach(ans => {
          this.chartDataBar.labels.push(ans.title);
          this.chartDataBar.datasets[0].data.push(ans.votes);
        });
      this.chartDataBar.datasets[0].data.push(0);
      this.chartReady = 1;
    }
  },
  async created() {
    let answers = this.question_detail.answers;
    if (!Object.keys(this.question_detail).length) {
      this.onLoader();
      let question = await this.getQuestionDetails(this.questionId);
      this.offLoader();
      this.setChartData(question.answers);
    } else {
      this.setChartData(answers);
    }
  }
};
</script>

<style scoped>
.outer-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner-wrapper {
  border: 3px solid #1583c7;
  width: 800px;
}
</style>