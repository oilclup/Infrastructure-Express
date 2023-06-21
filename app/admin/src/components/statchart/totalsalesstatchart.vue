<script>
/**
 * A stat widget to show data with tiny chart visulization
 */
export default {
  props: {
    mainTitle: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: 0,
    },
    subValue: {
      type: String,
      default: '',
    },
    chartColor: {
      type: String,
      default: '#5369f8',
    },
    ios: { type: Number, default: 0 },
    android: { type: Number, default: 0 },
    iosSubsNewsContent: { type: Number, default: 0 },
    iosSubExclusiveTraining: { type: Number, default: 0 },
    iosSubPremiumMembers: { type: Number, default: 0 },
    androidSubsNewsContent: { type: Number, default: 0 },
    androidSubExclusiveTraining: { type: Number, default: 0 },
    androidSubPremiumMembers: { type: Number, default: 0 },
  },
  data() {
    return {
      series: [
        {
          data: [25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54],
        },
      ],
      chartOptions: {
        chart: {
          sparkline: {
            enabled: true,
          },
          parentHeightOffset: 0,
          toolbar: {
            show: false,
          },
        },
        colors: [this.chartColor],
        height: 45,
        width: 90,
        markers: { size: 0 },
        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [45, 100],
          },
        },
        tooltip: {
          theme: 'dark',
          fixed: {
            enabled: false,
          },
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: (seriesName) => {
                return ''
              },
            },
          },
          marker: {
            show: false,
          },
        },
        stroke: { width: 2, curve: 'smooth' },
      },
    }
  },
}
</script>
<template>
  <div>
    <div class="card">
      <div class="card-body p-0">
        <div class="p-3 d-flex justify-content-between">
          <!-- <div class="media-body"> -->
          <div class="media-body mr-5">
            <span
              class="text-muted text-uppercase font-size-12 font-weight-bold"
              >{{ mainTitle }}</span
            >
            <h2 class="mb-0">{{ value }}</h2>
          </div>
          <div class="row">
            <!-- <div class="pt-3 media-body col-md-12 col-xl-6">
              <span
                class="text-muted text-uppercase font-size-12 font-weight-bold"
                >IOS</span
              >
              <h3 class="mb-0">{{ ios + ' usd' }}</h3>
              <p>News content : {{ iosSubsNewsContent + ' usd' }}</p>
              <p>Exclusive training : {{ iosSubExclusiveTraining + ' usd' }}</p>
              <p>Premium members : {{ iosSubPremiumMembers + ' usd' }}</p>
              <p>Other : {{ ios + ' usd' }}</p>
            </div> -->
            <!-- <div class="col-md-12 col-xl-6 pt-0">
              <div class=" media-body">
                <span
                  class="text-muted text-uppercase font-size-12 font-weight-bold"
                ></span>
                <h2 class="mb-0"></h2>
              </div>
              <div class=" media-body">
                <span
                  class="text-muted text-uppercase font-size-12 font-weight-bold"
                  >ANDROID</span
                >
                <h3 class="mb-0">{{ android + ' usd' }}</h3>
                <p>News content : {{ androidSubsNewsContent + ' usd' }}</p>
                <p
                  >Exclusive training :
                  {{ androidSubExclusiveTraining + ' usd' }}</p
                >
                <p>Premium members : {{ androidSubPremiumMembers + ' usd' }}</p>
                <p>Other : {{ android + ' usd' }}</p>
              </div>
              <div class="align-self-center">
          <div>IOS : {{ ios }}</div>
          <hr />
          <div>ANDROID :{{ android }} </div>
         
        </div>
            </div> -->
          </div>
        </div>
        <!-- <div class="align-self-center">
          <div>IOS : {{ ios }}</div>
          <hr />
          <div>ANDROID :{{ android }} </div>
         
        </div> -->
      </div>
    </div>
  </div>
</template>
