<template>
  <div class="outer-wrapper">
    <div class="inner-wrapper bg-lightdient padx-2 pady-1">
      <header class="pady-1">
        <h1 class="pady-1 dark">{{question_detail.title}}</h1>
        <p>{{question_detail.description}}</p>
        <p class="pady-1">
          <small>Created at: {{question_detail.created_at}}</small>
        </p>
      </header>
      <div class="chart-container">
        <BarChart
          :style="myStyles"
          :chartData="chartDataBar"
          :options="chartOptions"
          v-if="chartReady"
        />
      </div>
      <router-link class="return pady-1" :to="{ name:'details', params:{questionId:questionId}}">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="11 17 6 12 11 7" />
          <polyline points="18 17 13 12 18 7" />
        </svg>
        <span>BACK</span>
      </router-link>
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
      myStyles: {
        // height: "300px",
        width: "100%",
        position: "relative"
      },
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
      chartOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: true
        },
        tooltips: {
          enabled: true,
          mode: "single",
          callbacks: {
            label(tooltipItems, data) {
              const { datasetIndex, index } = tooltipItems;
              const value = data.datasets[datasetIndex].data[index];
              if (parseInt(value, 10) > 999) {
                return ` ${value
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }
              return ` ${value}`;
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        height: 300
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
  max-width: 900px;
  box-shadow: 4px 9px 17px -8px #000000;
}
.inner-wrapper .return {
  display: flex;
  align-items: center;
  color: #1583c7;
  text-decoration: none;
}
.inner-wrapper svg {
  color: #1583c7;
}
.inner-wrapper span {
  font-size: 23px;
  font-weight: 900;
  text-transform: uppercase;
}
@media (max-width: 1200px) {
  .outer-wrapper {
    display: flex;
    justify-content: center;
    align-items: stretch;
    padding: 20px 0px;
  }
  .inner-wrapper {
    max-width: 80%;
  }
}
@media (max-width: 600px) {
  .inner-wrapper {
    border: 3px solid #1583c7;
    max-width: 100%;
  }
}
</style>